import React from 'react';
import ImageUpload from './components/ImageUpload';
import { Box, Typography, Container, List, ListItem, Link } from '@mui/material';

const App: React.FC = () => {

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Box
                sx={{
                    textAlign: 'center',
                    padding: 3,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Y App
                </Typography>
                <ImageUpload />
            </Box>
        </Container>
    );
};

export default App;
