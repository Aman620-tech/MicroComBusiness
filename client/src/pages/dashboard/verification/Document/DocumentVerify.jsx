


import React, { useState } from 'react';
// import { InboxOutlined } from '@ant-design

import Button from '@mui/material/Button';

// const { Dragger } = Upload;
import './index.css'
import { TextField } from '@mui/material';

const DocumentVerify = () => {

    const [images, setImages] = useState([])
    // const props = {
    //     name: 'file',
    //     multiple: true,
    //     // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     onChange(info) {
    //         // const { status } = info.file;
    //         console.log("info", info);
    //         // if (status !== 'uploading') {
    //         //     console.log(info.file, info.fileList);
    //         // }

    //     },
    //     onDrop(e) {
    //         console.log('Dropped files', e.target.files);
    //     },
    // };
    return (
        <div >

            <div className='file_upload'>

                <h2>New</h2>
                <Button variant="contained" color="secondary">
                    Success
                </Button>
                {/* <InboxOutlined /> */}

            </div>

        </div >

    );
}
export default DocumentVerify
