export const styles = theme => ({
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
})
