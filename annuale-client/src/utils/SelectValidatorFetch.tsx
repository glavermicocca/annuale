import React, { useState, useEffect } from 'react'

import { TextValidator } from 'react-material-ui-form-validator'
import Autocomplete from '@material-ui/lab/Autocomplete'

function SelectValidatorFetch(props: any) {
  const [auto, setAuto] = useState(<div>Loading...</div>)

  useEffect(() => {
    setTimeout(() => {
      let arr = [] as any
      for (let index = 0; index < 20; index++) {
        arr.push({ label: `PIPPO {index}` })
      }

      setAuto(
        <Autocomplete
          multiple
          freeSolo
          onChange={props.handleChange}
          id="combo-box-demo"
          options={arr}
          getOptionLabel={(option: any) => option.label}
          style={{ width: 300 }}
          renderInput={params => {
            return (
              <TextValidator {...params} label="Codice" onChange={props.handleChange} name="COD_CAT" value={props.value} validators={['required']} errorMessages={['Questo campo è obbligatorio']} />
            )
          }}
        />
      )
    }, 4000)
  }, [])

  return auto
}

export default SelectValidatorFetch
