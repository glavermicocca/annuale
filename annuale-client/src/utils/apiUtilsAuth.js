import 'isomorphic-fetch'
import jwt_decode from 'jwt-decode'

import { auth, providerGoogle, providerMicrosoft } from '../firebase'

export function checkStatus(response) {
  if (!response.ok) {
    // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
  return response
}

export function parseJSON(response) {
  return response.json()
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callApiAuth(type, url, request, onRequestSuccess, onRequestFailure) {
  return async dispatch => {
    dispatch(request)

    let idToken
    try {
      const userCredential = await auth.signInWithPopup(type === 'Google' ? providerGoogle : providerMicrosoft)
      idToken = await userCredential.user.getIdToken()
      //console.log(idToken)
    } catch (error) {
      console.log(error)
    }

    const config = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idToken })
    }

    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(onRequestSuccess(json, dispatch))
      })
      .catch(error => {
        const response = error.response
        if (response === undefined) {
          dispatch(onRequestFailure(error))
        } else {
          error.status = response.status
          error.statusText = response.statusText
          response.text().then(text => {
            try {
              const json = JSON.parse(text)
              error.message = json.message
            } catch (ex) {
              error.message = text
            }
            dispatch(onRequestFailure(error))
          })
        }
      })
  }
}

export const ID_TOKEN = 'id_token'

export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN, idToken)
}

export function removeIdToken() {
  localStorage.removeItem(ID_TOKEN)
}

export function loadIdToken() {
  return localStorage.getItem(ID_TOKEN)
}

export function decodeUserProfile(idToken) {
  try {
    return jwt_decode(idToken)
  } catch (err) {
    return null
  }
}

export function loadUserProfile() {
  try {
    const idToken = localStorage.getItem(ID_TOKEN)
    const userProfile = jwt_decode(idToken)
    const now = new Date().getTime() / 1000 // Date().getTime() returns milliseconds.
    // So divide by 1000 to get seconds
    if (now > userProfile.exp) {
      // user profile has expired.
      removeIdToken()
      return null
    }
    return userProfile
  } catch (err) {
    return null
  }
}
