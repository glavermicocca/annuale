import { makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(2)
  }
}))

function TextFiledReadOnly({ label, value, helperText }: any) {
  const classes = useStyles()

  return (
    <TextField
      className={classes.field}
      fullWidth
      multiline
      InputProps={{
        readOnly: true
      }}
      size="small"
      variant="outlined"
      label={label}
      value={value}
      helperText={helperText}
    />
  )
}

export default TextFiledReadOnly
