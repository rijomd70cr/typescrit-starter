import { Box, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
    fullWidth: boolean,
    children: any
    onClick: () => void,
    loading: boolean,
    style: object
}

export const FormButton = (props: Props) => {
    const { fullWidth, children, onClick, loading, style } = props;

    return (
        <Box>
            <LoadingButton loading={loading} loadingIndicator={
                <CircularProgress
                    color="inherit"
                    size={16}
                    sx={{ paddingLeft: '5px', paddingRight: '5px' }}
                />
            }
                variant="contained" size="small" sx={style}
                fullWidth={fullWidth} onClick={onClick}
            >
                {children}
            </LoadingButton>
        </Box>
    )
}