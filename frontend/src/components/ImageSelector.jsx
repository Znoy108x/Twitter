import React from 'react'
import { Label , FileInput } from 'flowbite-react'
const ImageSelector = ({helperTxt , banner , image  , isImage }) => {
    return (
    <div id="fileUpload">
        <div className="mb-2 block">
            <Label
                htmlFor="file"
                value="Upload file"
            />
        </div>
        <FileInput
            id="file"
            helperText={helperTxt}
            ref={isImage  ? image : banner}

        />
    </div>
    )
}

export default ImageSelector