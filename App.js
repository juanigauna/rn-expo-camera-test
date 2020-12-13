import React, { useState } from 'react'
import Camera from './screens/camera'
import Preview from './screens/preview'

export default () => {
    const [previewPhoto, setPreviewPhoto] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    if (previewPhoto) {
        return (
            <Preview
                photo={capturedImage}
                setPreviewPhoto={setPreviewPhoto}
            />
        )
    }
    return (
        <Camera
            setPreviewPhoto={setPreviewPhoto}
            setCapturedImage={setCapturedImage}
        />
    )
}