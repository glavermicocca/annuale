import { useForm } from 'react-hook-form'
// MUI Core
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { loginForm } from '../../actions/auth'

interface FormData {
  email: string
  password: string
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3)
  }
}))

function Form() {
  const { handleSubmit, register } = useForm<FormData>()

  const classes = useStyles()

  const onSubmit = handleSubmit(data => {
    console.log(data)
    loginForm(data)
  })

  return (
    <Container className={classes.container} maxWidth="xs">
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth inputRef={register} label="Email" name="email" size="small" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth inputRef={register} label="Password" name="password" size="small" type="password" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Form
