/* eslint-disable no-use-before-define */
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { Controller, useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'

export const ARRAY_OF_ROLES = [
  { option: 'ADMIN', value: 'Amministratore' },
  { option: 'CAPO_CANTIERE', value: 'Capo cantiere' }
]

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

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      id: props.initialValues.id,
      email: props.initialValues.email,
      des_ruolo: props.initialValues.des_ruolo,
      tipo_ruolo: ARRAY_OF_ROLES.find(item => item.option === props.initialValues.tipo_ruolo),
      password: props.initialValues.password
    }
  })

  const onSubmit = handleSubmit(updatedData => {
    props.handleSave({ ...updatedData, prev: props.initialValues })
  })

  return (
    <div>
      <form onSubmit={onSubmit} autoComplete="off">
        <TextField
          fullWidth
          type="text"
          label="em@il"
          name="email"
          variant="outlined"
          helperText={errors.email && errors.email.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.email && errors.email.type === 'required'}
          inputRef={register({ required: true })}
          className={classes.formInput}
        />
        <TextField
          fullWidth
          type="text"
          label="Cognome nome"
          name="des_ruolo"
          variant="outlined"
          helperText={errors.des_ruolo && errors.des_ruolo.type === 'required' ? 'Campo obbligatorio' : ''}
          error={errors.des_ruolo && errors.des_ruolo.type === 'required'}
          inputRef={register({ required: true })}
          className={classes.formInput}
        />
        <Controller
          render={controllerProps => (
            <Autocomplete
              {...controllerProps}
              options={ARRAY_OF_ROLES}
              getOptionLabel={option => option.value}
              className={classes.formInput}
              renderOption={option => <span>{option.value}</span>}
              renderInput={params => <TextField error={!!errors.tipo_ruolo} {...params} label="Tipo ruolo" variant="outlined" />}
              onChange={(_, data) => controllerProps.onChange(data)}
            />
          )}
          name="tipo_ruolo"
          control={control}
          rules={{ required: true }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          variant="outlined"
          helperText={(errors.password && errors.password.type === 'required' && 'Campo obbligatorio') || (errors.password && errors.password.type === 'minLength' && 'Password troppo corta')}
          error={(errors.password && errors.password.type === 'required') || (errors.password && errors.password.type === 'minLength')}
          inputRef={register({ required: true, minLength: 8 })}
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
