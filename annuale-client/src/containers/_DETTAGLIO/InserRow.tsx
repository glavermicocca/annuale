import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'

import { UpdateProgressivoDettaglio, Delete } from '../../actions/PROGRESSIVO'

const useStyles = makeStyles(theme => ({
  formInput: {
    marginBottom: theme.spacing(2)
  },
  buttonConfirm: {
    justifyContent: 'flex-end',
    display: 'flex'
  }
}))

const InserRow = (props: any) => {
  const classes = useStyles()

  const { register, handleSubmit, errors } = useForm({
    defaultValues: props.rows[0]
  })

  // const isDescriptionError = errors.description && errors.description.type === 'required'
  // const descriptionErrorText = isDescriptionError ? 'Description is required' : ''

  const onSubmit = handleSubmit(updatedData => {
    props.UpdateProgressivoDettaglio({ ...updatedData, prev: props.rows[0] })
  })

  return (
    <div>
      <form onSubmit={onSubmit} autoComplete="off">
        <TextField
          fullWidth
          type="text"
          label="Descrizione errore"
          name="descrizione_errore"
          variant="outlined"
          helperText={errors.descrizione_errore && errors.descrizione_errore.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.descrizione_errore && errors.descrizione_errore.type === 'required'}
          inputRef={register({})}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Tipo errore"
          name="tipo_errore"
          variant="outlined"
          helperText={errors.tipo_errore && errors.tipo_errore.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.tipo_errore && errors.tipo_errore.type === 'required'}
          inputRef={register({})}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Metallo"
          name="metallo"
          variant="outlined"
          helperText={errors.metallo && errors.metallo.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.metallo && errors.metallo.type === 'required'}
          inputRef={register({})}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Contorno"
          name="contorno"
          variant="outlined"
          helperText={errors.contorno && errors.contorno.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.contorno && errors.contorno.type === 'required'}
          inputRef={register({})}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Diametro"
          name="diametro"
          variant="outlined"
          helperText={errors.diametro && errors.diametro.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.diametro && errors.diametro.type === 'required'}
          inputRef={register({})}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Link"
          name="link"
          variant="outlined"
          helperText={errors.link && errors.link.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.link && errors.link.type === 'required'}
          inputRef={register({})}
          className={classes.formInput}
        />
        <Box className={classes.buttonConfirm}>
          <Button type="submit" variant="contained" color="primary">
            Conferma
          </Button>
        </Box>
      </form>
    </div>
  )
}

const mapStateToProps = (state: any, props: any) => {
  const { auth } = state
  const { open, result, rows } = state.PROGRESSIVO

  return {
    user: auth ? auth.user : null,
    role: auth ? auth.role : null,
    open,
    result,
    rows
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateProgressivoDettaglio: (initialValues: any) => {
      dispatch(UpdateProgressivoDettaglio(initialValues))
    },
    Delete: (selection: any) => {
      dispatch(Delete(selection))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InserRow)
