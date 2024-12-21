import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, Typography, Box, Link } from '@mui/material';

const ImageUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [expiration, setExpiration] = useState<Date | null>(null);
    const [link, setLink] = useState<string | null>(null);
    const [activeButton, setActiveButton] = useState<number | null>(null);

    const handleUpload = async () => {
        if (!file || !expiration) {
            toast.error('Please select a file and an expiration time.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('expiresAt', expiration.toISOString());

        try {
            const response = await axios.post('http://localhost:5000/v1/images', formData);
            toast.success('Image uploaded successfully!');
            setLink(response.data.url);
        } catch (error) {
            toast.error('Failed to upload image.');
            console.error('Error uploading image:', error);
        }
    };

    const calculateExpiration = (time: number, unit: 'hours' | 'seconds', buttonIndex: number) => {
        const now = new Date();
        if (unit === 'hours') {
            now.setHours(now.getHours() + time);
        } else if (unit === 'seconds') {
            now.setSeconds(now.getSeconds() + time);
        }
        console.log(now);
        setExpiration(now);
        setActiveButton(buttonIndex); // Track the active button
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: '0 auto',
                textAlign: 'center',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Upload Image
            </Typography>
            <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={(e) => {
                    const target = e.target as HTMLInputElement; // Typecast to HTMLInputElement
                    setFile(target.files?.[0] || null);
                }}
                fullWidth
                sx={{ marginBottom: 2 }}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color={activeButton === 1 ? 'primary' : 'inherit'}
                    onClick={() => calculateExpiration(30, 'seconds', 1)}
                >
                    30 seconds
                </Button>
                <Button
                    variant="contained"
                    color={activeButton === 2 ? 'primary' : 'inherit'}
                    onClick={() => calculateExpiration(0.5, 'hours', 2)}
                >
                    1/2 hour
                </Button>
                <Button
                    variant="contained"
                    color={activeButton === 3 ? 'primary' : 'inherit'}
                    onClick={() => calculateExpiration(1, 'hours', 3)}
                >
                    1 hour
                </Button>
                <Button
                    variant="contained"
                    color={activeButton === 4 ? 'primary' : 'inherit'}
                    onClick={() => calculateExpiration(24, 'hours', 4)}
                >
                    24 hours
                </Button>
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!file || !expiration}
                fullWidth
                sx={{ marginBottom: 2 }}
            >
                Upload
            </Button>
            <ToastContainer position="top-right" />
            {link && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">Shareable link:</Typography>
                    <Link href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </Link>
                </Box>
            )}
        </Box>
    );
};

export default ImageUpload;
