import { connect } from 'react-redux'

import { loadIdToken } from '../../utils/apiUtils'

import Camera from './Camera'

import Button from '@material-ui/core/Button'

import Cropper from 'react-easy-crop'

import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone'

import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import Box from '@material-ui/core/Box'

import CircularProgress from '@material-ui/core/CircularProgress'
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone'
import InsertDriveFileTwoToneIcon from '@material-ui/icons/InsertDriveFileTwoTone'

import { useState, useCallback } from 'react'

import axios from 'axios'

import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  buttons: {
    marginBottom: theme.spacing(1)
  },
  cropContainer: {
    position: 'relative',
    width: '80%',
    right: '10%',
    left: '10%',
    height: 200,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400
    }
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center'
  },
  sliderLabel: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 65
    }
  },
  slider: {
    padding: '22px 0px',
    marginLeft: 32,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px'
    }
  }
}))

const MainGroup = props => {
  console.log(props)

  const classes = useStyles()

  const time = new Date().getTime()

  const imagePath = `/IMAGES_VALORE?val=${props.val}&timestamp${time}`

  const [imageSrc, setImageSrc] = useState(imagePath)
  const [loading, setLoading] = useState(false)
  const [camera, setCamera] = useState(false)

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || ''
    sliceSize = sliceSize || 512

    var byteCharacters = atob(b64Data)
    var byteArrays = []

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize)

      var byteNumbers = new Array(slice.length)
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      var byteArray = new Uint8Array(byteNumbers)

      byteArrays.push(byteArray)
    }

    var blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

  function resizeImage(url, width, height, x, y, rotation, callback) {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    var imageObj = new Image()

    // set canvas dimensions

    canvas.width = width
    canvas.height = height

    imageObj.onload = function () {
      context.drawImage(imageObj, x, y, width, height, 0, 0, width, height)

      var canvas2 = document.createElement('canvas')
      var context2 = canvas2.getContext('2d')

      var imgwidth = canvas.width
      var imgheight = canvas.height
      canvas2.width = imgwidth
      canvas2.height = imgheight

      context2.save()
      context2.translate(imgwidth / 2, imgheight / 2)
      context2.rotate((rotation * Math.PI) / 180)
      context2.drawImage(canvas, -(imgwidth / 2), -(imgheight / 2))
      context2.restore()

      callback(canvas2.toDataURL())
    }

    imageObj.src = url
  }

  const handleSave = async () => {
    setLoading(true)

    resizeImage(imageSrc, croppedAreaPixels.width, croppedAreaPixels.height, croppedAreaPixels.x, croppedAreaPixels.y, rotation, async croppedImage => {
      var ImageURL = croppedImage
      // Split the base64 string in data and contentType
      var block = ImageURL.split(';')
      // Get the content type of the image
      var contentType = block[0].split(':')[1] // In this case "image/gif"
      // get the real base64 content of the file
      var realData = block[1].split(',')[1] // In this case "R0lGODlhPQBEAPeoAJosM...."

      // Convert it to a blob to upload
      var blob = b64toBlob(realData, contentType)

      const idToken = loadIdToken()

      const formData = new FormData()

      formData.append('val', props.val)
      formData.append('file', blob)

      const headers = {
        Authorization: `Bearer ${idToken}`,
        'content-type': 'multipart/form-data'
      }

      try {
        const response = await axios({
          method: 'POST',
          url: '/IMAGES_VALORE',
          headers,
          data: formData,
          onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total)
          }
        })
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      } catch (error) {
        alert(error)
        setLoading(false)
      }
    })
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleToggleCamera = e => {
    setCamera(!camera)
  }

  function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  const onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)
      setImageSrc(imageDataUrl)
    }
  }

  return (
    <>
      {camera === false && (
        <>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              cropShape="sqaure"
              rotation={rotation}
              zoom={zoom}
              aspect={3 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
                Zoom
              </Typography>
              <Slider value={zoom} min={1} max={3} step={0.1} aria-labelledby="Zoom" classes={{ root: classes.slider }} onChange={(e, zoom) => setZoom(zoom)} />
            </div>
            <div className={classes.sliderContainer}>
              <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
                Rotation
              </Typography>
              <Slider value={rotation} min={0} max={360} step={1} aria-labelledby="Rotation" classes={{ root: classes.slider }} onChange={(e, rotation) => setRotation(rotation)} />
            </div>
          </div>
          <Box justifyContent="center">
            <input accept="image/*" id="contained-button-file" name="newImage" type="file" onChange={onFileChange} style={{ display: 'none', width: '100%' }} />
            <label htmlFor="contained-button-file">
              <Button className={classes.buttons} fullWidth={true} variant="contained" endIcon={<InsertDriveFileTwoToneIcon />} size="large" color="primary" component="span">
                Carica...
              </Button>
            </label>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button className={classes.buttons} size="large" fullWidth={true} endIcon={<AddAPhotoTwoToneIcon />} variant="contained" onClick={handleToggleCamera} color="primary">
              Camera
            </Button>
          </Box>
        </>
      )}
      {camera === true && (
        <Camera
          onTaken={image => {
            setImageSrc(image)
            setCamera(false)
          }}
        />
      )}
      {camera === false && (
        <Box display="flex" justifyContent="center">
          {/* {state.error && <Alert severity="success">{state.error}</Alert>} */}
          <Button
            className={classes.buttons}
            size="large"
            disabled={loading}
            onClick={handleSave}
            endIcon={loading === true ? <CircularProgress /> : null}
            startIcon={<SaveTwoToneIcon />}
            variant="contained"
            color="secondary">
            Salva
          </Button>
        </Box>
      )}
    </>
  )
}

const mapStateToProps = (state, props) => {
  console.log(props)
  return {
    ...props
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MainGroup)
