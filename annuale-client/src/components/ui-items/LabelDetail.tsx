import { Typography } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margins: {
      marginLeft: theme.spacing(1),
      wordBreak: 'break-all'
    }
  })
)

function LabelDetail({ className, label, descrizione, onRowClick }: Props) {
  const classes = useStyles()
  return (
    <div className={className} onClick={onRowClick}>
      <Typography variant="subtitle2" color="textSecondary">
        {label}
      </Typography>
      <Typography className={classes.margins} variant="h6" color="textPrimary">
        {descrizione}
      </Typography>
    </div>
  )
}

export interface Props {
  label: string
  descrizione: string
  onRowClick?: any | null
  className?: any | null
}

export default LabelDetail
