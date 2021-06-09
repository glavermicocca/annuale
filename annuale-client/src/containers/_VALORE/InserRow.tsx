/* eslint-disable no-use-before-define */
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  formInput: {
    marginBottom: theme.spacing(2)
  },
  buttonConfirm: {
    justifyContent: 'flex-end',
    display: 'flex'
  }
}))

export default function InsertRow(props: any) {
  const classes = useStyles()

  const { register, handleSubmit, errors } = useForm({
    defaultValues: props.initialValues
  })

  // const isDescriptionError = errors.description && errors.description.type === 'required'
  // const descriptionErrorText = isDescriptionError ? 'Description is required' : ''

  const onSubmit = handleSubmit(updatedData => {
    props.handleSave({ ...updatedData, prev: props.initialValues })
  })

  return (
    <div>
      <form onSubmit={onSubmit} autoComplete="off">
        <TextField
          fullWidth
          type="text"
          label="Valore"
          name="val"
          variant="outlined"
          helperText={errors.val && errors.val.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.val && errors.val.type === 'required'}
          inputRef={register({ required: true })}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Anno"
          name="anno"
          variant="outlined"
          helperText={errors.anno && errors.anno.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.anno && errors.anno.type === 'required'}
          inputRef={register({ required: true })}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Anno label"
          name="anno_label"
          variant="outlined"
          helperText={errors.anno_label && errors.anno_label.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.anno_label && errors.anno_label.type === 'required'}
          inputRef={register({ required: true })}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Proressivo"
          name="progr"
          variant="outlined"
          helperText={errors.progr && errors.progr.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.progr && errors.progr.type === 'required'}
          inputRef={register({ required: true })}
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
