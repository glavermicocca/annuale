import React from 'react'
import Webcam from "react-webcam"
import Button from '@material-ui/core/Button'
import PhotoCameraTwoTone from '@material-ui/icons/PhotoCameraTwoTone'
import Box from '@material-ui/core/Box'
import CameraFrontTwoToneIcon from '@material-ui/icons/CameraFrontTwoTone'
import CameraRearTwoToneIcon from '@material-ui/icons/CameraRearTwoTone'

import { makeStyles } from '@material-ui/core/styles'

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT,
    // width: 1280,
    // heigth: 720
};

const FACING_MODE = 'FACING_MODE'

const WebcamCapture = (props) => {

    const useStyles = makeStyles(theme => ({
        spacing: {
            margin: theme.spacing(1)
        }
    }))

    const classes = useStyles()

    const webcamRef = React.useRef(null);

    React.useEffect(() => {
        return () => {
            console.log('byebye')
        }
    })

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            props.onTaken(imageSrc)
            let stream = webcamRef.current.video.srcObject;
            if (stream) {
                webcamRef.current.video.srcObject = null;
                stream.getTracks().forEach((track) => {
                    stream.removeTrack(track);
                    track.stop();
                });
                stream = null; // this is probably redundant, but it fixes it so I'm happy.
            }
        },
        [webcamRef]
    )

    const [facingMode, setFacingMode] = React.useState(localStorage.getItem(FACING_MODE));

    const handleClick = React.useCallback(() => {
        setFacingMode(
            (prevState) => {
                const state = prevState === FACING_MODE_USER
                    ? FACING_MODE_ENVIRONMENT
                    : FACING_MODE_USER
                localStorage.setItem(FACING_MODE, state)
                return state
            }
        );



        //fix switch camera - invalidate
        let stream = webcamRef.current.video.srcObject;
        if (stream) {
            webcamRef.current.video.srcObject = null;
            stream.getTracks().forEach((track) => {
                stream.removeTrack(track);
                track.stop();
            });
            stream = null; // this is probably redundant, but it fixes it so I'm happy.
        }
    }, []);

    const currentWidth = window.innerWidth < 600 ? window.innerWidth - 100 : 565

    return (
        <>
            <Webcam onUserMediaError={(error) => { alert(error); }} audio={false}
                onClick={capture}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored={facingMode === FACING_MODE_USER}
                imageSmoothing={false}
                width={currentWidth}
                videoConstraints={{
                    ...videoConstraints,
                    facingMode
                }} />
            <Box display="flex">
                <Button className={classes.spacing} size="large" fullWidth={true} justifyContent="center" variant="contained" endIcon={<PhotoCameraTwoTone />} onClick={capture} color="primary" aria-label="upload picture">
                    Cattura
                </Button>
                <Button className={classes.spacing} size="large" variant="contained" onClick={handleClick} color="primary" aria-label="upload picture" component="span">
                    {facingMode === FACING_MODE_ENVIRONMENT ? <CameraRearTwoToneIcon /> : <CameraFrontTwoToneIcon />}
                </Button>
            </Box>
        </>
    );
};

export default WebcamCapture


// {devices.map((device, key) => (
//     <div key={key}>
//         <Webcam audio={false}
//             height={320}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width={480} videoConstraints={{ deviceId: device.deviceId }} />
//         {device.label || `Device ${key + 1}`}
//         <button onClick={capture}>Capture photo</button>
//     </div>

// ))}