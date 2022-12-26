import { Dialog, Box, DialogTitle, DialogContent } from '@mui/material';

type Props = {
    open: boolean,
    handleClose: () => void,
    title: String,
    children: JSX.Element,
    maxWidth: any,
    fullWidth: boolean,
    fullScreen: boolean
}

export const Modal = (props: Props) => {
    const { open, handleClose, title, children, maxWidth, fullWidth, fullScreen } = props;

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                fullScreen={fullScreen}
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </Box>
    )

}