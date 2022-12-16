import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
    },
}
export const Loader = () => {
    return (
        <Box sx={styles.container}>
            <CircularProgress />
        </Box>
    )
}
