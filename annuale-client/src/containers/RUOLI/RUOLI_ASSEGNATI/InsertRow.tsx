import React from 'react'
import { connect } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { Controller, useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'

import MuiTextField from '@material-ui/core/TextField'

import { Insert } from '../../../actions/RUOLI_ASSEGNATI'

const useStyles = makeStyles(theme => ({
  formInput: {
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    width: '100%',
    minWidth: '100%'
  },
  buttonConfirm: {
    marginBottom: theme.spacing(1),
    justifyContent: 'flex-end',
    display: 'flex'
  }
}))

const extractValue = (arr: Array<any>) => {
  return arr.map((item, index) => {
    return { option: item.cod_dep, value: item.cod_dep + ' - ' + item.des_dep }
  })
}

export const InsertRow = (props: any) => {
  const classes = useStyles()

  const rows = extractValue(props.is_cliente === 1 ? props.rowsClienti : props.rowsDepositi)

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      cod_dep: null
    }
  })

  const onSubmit = handleSubmit(updatedData => {
    props.Insert({ ...updatedData, id: props.row.id })
  })

  return (
    <form className={classes.formInput} onSubmit={onSubmit} autoComplete="off">
      <Controller
        render={controllerProps => (
          <Autocomplete
            fullWidth={true}
            {...controllerProps}
            options={rows}
            getOptionLabel={option => option.value}
            className={classes.formInput}
            renderOption={option => <span>{option.value}</span>}
            renderInput={params => <MuiTextField error={!!errors.cod_dep} {...params} label={props.is_cliente === 1 ? 'Dipendenti' : 'Depositi'} variant="outlined" />}
            onChange={(_, data) => controllerProps.onChange(data)}
          />
        )}
        name="cod_dep"
        control={control}
        rules={{ required: true }}
      />
      <Box className={classes.buttonConfirm}>
        <Button type="submit" variant="contained" color="primary">
          Conferma
        </Button>
      </Box>
    </form>
  )
}

const mapStateToProps = (state: any, props: any) => {
  const { rowsClienti, rowsDepositi } = state.RUOLI_ASSEGNATI

  return {
    rowsClienti,
    rowsDepositi,
    ...props
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    Insert: (values: any) => {
      dispatch(Insert(values))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertRow)
