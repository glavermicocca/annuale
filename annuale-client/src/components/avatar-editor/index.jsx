import { connect } from 'react-redux'

import { loadIdToken } from '../../utils/apiUtils'

import Camera from './Camera'

import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'

import Cropper from 'react-easy-crop'

import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';

import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import Box from '@material-ui/core/Box'

import CircularProgress from '@material-ui/core/CircularProgress';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone'
import InsertDriveFileTwoToneIcon from '@material-ui/icons/InsertDriveFileTwoTone';

import { useState, useCallback } from 'react'

import { styles } from './styles'

import { getCroppedImg, getRotatedImage } from './CanvasUtils'
import { getOrientation } from 'get-orientation/browser'

import axios from 'axios'

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

const CONTAINER_HEIGHT = 300

export const Index = ({ classes, props }) => {
    const currentWidth = window.innerWidth < 600 ? window.innerWidth - 150 : 515
    const squareWidth = 1280

    const time = (new Date()).getTime()

    const imagePath = (props.cod_art !== undefined && `/IMAGES?cod_art=${props.cod_art}&timestamp${time}`) || (props.cod_dep !== undefined && `/IMAGES?cod_dep=${props.cod_dep}&timestamp${time}`)

    const [imageSrc, setImageSrc] = useState(imagePath)
    const [loading, setLoading] = useState(false)
    const [camera, setCamera] = useState(false)

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    function resizeImage(url, width, height, x, y, rotation, callback) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');
        var imageObj = new Image();

        // set canvas dimensions

        canvas.width = width;
        canvas.height = height;

        imageObj.onload = function () {

            context.drawImage(imageObj, x, y, width, height, 0, 0, width, height);

            var canvas2 = document.createElement("canvas");
            var context2 = canvas2.getContext('2d');

            var imgwidth = canvas.width;
            var imgheight = canvas.height;
            canvas2.width = imgwidth;
            canvas2.height = imgheight;

            context2.save();
            context2.translate(imgwidth / 2, imgheight / 2);
            context2.rotate(rotation * Math.PI / 180);
            context2.drawImage(canvas, -(imgwidth / 2), -(imgheight / 2));
            context2.restore();

            callback(canvas2.toDataURL());
        };

        imageObj.src = url;
    }

    const handleSave = async () => {
        setLoading(true)

        resizeImage(imageSrc, croppedAreaPixels.width, croppedAreaPixels.height, croppedAreaPixels.x, croppedAreaPixels.y, rotation, async (croppedImage) => {
            var ImageURL = croppedImage
            // Split the base64 string in data and contentType
            var block = ImageURL.split(";");
            // Get the content type of the image
            var contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

            // Convert it to a blob to upload
            var blob = b64toBlob(realData, contentType);

            const idToken = loadIdToken()

            const formData = new FormData()

            if (props.cod_art !== undefined) {
                formData.append('cod_art', props.cod_art)
            } else if (props.cod_dep !== undefined) {
                formData.append('cod_dep', props.cod_dep)
            }
            formData.append("file", blob)

            const headers = {
                Authorization: `Bearer ${idToken}`,
                "content-type": "multipart/form-data"
            }

            try {
                const response = await axios({
                    method: 'POST',
                    url: '/IMAGES',
                    headers,
                    data: formData,
                    onUploadProgress: progressEvent => {
                        console.log(progressEvent.loaded / progressEvent.total)
                    }
                });
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            } catch (error) {
                alert(error);
                setLoading(false)
            }
        })
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleToggleCamera = (e) => {
        setCamera(!camera)
    }

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            // // apply rotation if needed
            // const orientation = await getOrientation(file)
            // const rotation = ORIENTATION_TO_ANGLE[orientation]
            // if (rotation) {
            //     imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            // }

            setImageSrc(imageDataUrl)
        }
    }

    return (
        <>
            {camera === false && <>
                <div className={classes.cropContainer}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        cropShape="sqaure"
                        rotation={rotation}
                        zoom={zoom}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className={classes.controls}>
                    <div className={classes.sliderContainer}>
                        <Typography
                            variant="overline"
                            classes={{ root: classes.sliderLabel }}
                        >
                            Zoom
                    </Typography>
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            classes={{ root: classes.slider }}
                            onChange={(e, zoom) => setZoom(zoom)}
                        />
                    </div>
                    <div className={classes.sliderContainer}>
                        <Typography
                            variant="overline"
                            classes={{ root: classes.sliderLabel }}
                        >
                            Rotation
                    </Typography>
                        <Slider
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="Rotation"
                            classes={{ root: classes.slider }}
                            onChange={(e, rotation) => setRotation(rotation)}
                        />
                    </div>
                </div>
                <Box justifyContent="center">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        name="newImage"
                        type="file"
                        onChange={onFileChange}
                        style={{ display: 'none', width: '100%' }}
                    />
                    <label htmlFor="contained-button-file">
                        <Button className={classes.buttons} fullWidth={true} variant="contained" endIcon={<InsertDriveFileTwoToneIcon />} size="large" color="primary" component="span">
                            Carica...
                                </Button>
                    </label>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Button className={classes.buttons} size="large" fullWidth={true} endIcon={<AddAPhotoTwoToneIcon />} variant="contained" onClick={handleToggleCamera} color="primary">Camera</Button>
                </Box></>}
            {camera === true && <Camera onTaken={(image) => {
                setImageSrc(image)
                setCamera(false)
            }} />}
            {camera === false &&
                <Box display="flex" justifyContent="center">
                    {/* {state.error && <Alert severity="success">{state.error}</Alert>} */}
                    <Button
                        className={classes.buttons}
                        size="large"
                        disabled={loading}
                        onClick={handleSave}
                        endIcon={loading === true ? <CircularProgress /> : null}
                        startIcon={<SaveTwoToneIcon />}
                        variant="contained"
                        color="secondary"
                    >
                        Salva
                </Button>
                </Box>
            }
        </>
    )
}

const mapStateToProps = (state, props) => {

    return {
        props
    }
}

const mapDispatchToProps = {

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Index))
