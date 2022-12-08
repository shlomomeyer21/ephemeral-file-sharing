import { useState } from 'react';
import React from 'react';
import './ImageUpload.css'
import Modal from '../Modal/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function ImageUpload() {
    const [ttl, setTtl] = useState<string | number>(60);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState<string>();
    const [image, setImage] = useState<File>()
    
    const imageFilehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length) {
            const image = e.target.files[0];
            setImage(image);
        }
    }

    const sumbit = () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('ttl', ttl.toString());
            const requestOptions = {
                method: 'POST',
                body: formData
            };
            fetch('http://localhost:3001/v1/file', requestOptions)
                .then(async response => {
                    const { file_url } = (await response.json());
                    setFileUrl(file_url);
                    setImage(undefined);
                    setIsSuccessModalOpen(true);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    };

    return (
        <div className="image-upload">
            <h1 className='image-upload-title'>Share an awesome meme with your co-workers!</h1>

            <div className='image-input-row'>
                <label htmlFor='image-upload-file' className='App-button'>
                    Choose image
                    <input type="file" id="image-upload-file" name="image" accept="image/*" onChange={(e) => imageFilehandler(e)} />
                </label>

                <FormControl className='ttl-select'>
                    <InputLabel id="ttl-select-label">TTL</InputLabel>
                    <Select
                        labelId="ttl-select-label"
                        id="ttl-select"
                        label="TTL"
                        value={ttl}
                        onChange={(e) => setTtl(e.target.value)}
                    >
                        <MenuItem value={60}>1 minute</MenuItem>
                        <MenuItem value={600}>10 minutes</MenuItem>
                        <MenuItem value={3600}>1 hour</MenuItem>
                    </Select>
                </FormControl>

                <button
                    className={`App-button image-submit ${!image || !ttl ? 'disabled' : ''}`}
                    onClick={sumbit}>
                    Submit
                </button>
            </div>

            {image && ttl && <>
                <hr />
                <h2>Preview image</h2>
                <span key={image.name}>
                    <img src={URL.createObjectURL(image)} height="300" width="300" alt="golang_meme" />
                </span></>
            }

            {isSuccessModalOpen &&
                <Modal setIsOpen={setIsSuccessModalOpen}>
                    <p>Here is your <a href={fileUrl}>sharebale link</a>
                        <br></br>
                        <br></br>
                        <button onClick={() => { navigator.clipboard.writeText(fileUrl!) }}
                        >Copy link</button></p>
                </Modal>}
        </div >
    );
}
export default ImageUpload;