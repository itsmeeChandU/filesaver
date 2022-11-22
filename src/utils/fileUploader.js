// Use dropzone to upload files to the server and send the location to the server


import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

const baseURL = "http://127.0.0.1:8000/api";

const FileUploader = (props) => {
    const [statusDrop, setStat] = useState('Drag File Here and submit');
    const getUploadParams = ({ meta }) => {
        const url = baseURL + '/uploadFiles/'
        return {url, meta: {fileUrl: `${url}`}}
    }
    const handleChangeStatus = ({meta}, status) => {
        console.log(status, meta)
    }
    const sendLocation = () => {
        const formData = new FormData();
        formData.append("lat", props.lat);
        formData.append("lon", props.lon);
        fetch(
            baseURL + '/location/',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                alert("Uploaded Successfully");
            })
            .catch((error) => {
                setStat("Error in File uploading")
                console.error('Error:', error);
            }
        );
    }
    const onUpload = (files, allFiles) => {
        fetch(
            baseURL + '/uploadFiles/',
            {
                method: 'POST',
                body: files.map(f => f.meta),
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setStat("File uploaded : " + result)
                console.log('Success:', result);
            })
            .catch((error) => {
                setStat("Error in File uploading")
                console.error('Error:', error);
            });
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={sendLocation}
            accept="*"
            maxFiles={1}
            multiple={false}
            inputContent={(files, extra) => (extra.reject ? 'Image files only' : statusDrop)}
            styles={{
                dropzone: {width: 400, height: 200},
                dropzoneReject: {borderColor: 'red', backgroundColor: '#DAA'}
            }}
        />
    )
}

export default FileUploader;
