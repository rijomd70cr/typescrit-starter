import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = () => {
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: "flex",
        },
    }
    return (
        <Box sx={styles.container}>
            <CircularProgress />
        </Box>
    )
}
