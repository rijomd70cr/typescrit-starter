import * as React from "react";
import { Box, DialogTitle, DialogContent, Button } from "@mui/material";
import {
  Slide,
  AppBar,
  Toolbar,
  Typography,
  DialogContentText,
} from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";
import Draggable from "react-draggable";

import Paper, { PaperProps } from "@mui/material/Paper";
import Dialog, { DialogProps } from "@mui/material/Dialog";

type Props = {
  open: boolean;
  handleClose: () => void;
  title: String;
  children: JSX.Element;
  maxWidth: any;
  fullScreen: boolean;
  handleAction: (data: any) => void;
  draggable: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = (props: Props) => {
  const {
    open,
    handleClose,
    title,
    children,
    maxWidth,
    fullScreen,
    handleAction,
    draggable,
  } = props;

  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  function PaperComponent(props: PaperProps) {
    return draggable ? (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    ) : (
      <Paper {...props} />
    );
  }

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        maxWidth={maxWidth} //eg:md xs sm lg xl
        fullScreen={fullScreen}
        fullWidth={true}
        PaperComponent={PaperComponent}
      >
        {fullScreen && (
          <AppBar sx={{ position: "relative", background: "#fff" }}>
            <Toolbar>
              <Typography
                sx={{ ml: 2, flex: 1, color: "black", fontWeight: "bold" }}
                variant="h6"
                component="div"
              >
                {title}
              </Typography>
              <Button
                autoFocus
                color="primary"
                onClick={() => handleAction("saved")}
              >
                save
              </Button>
              <Button autoFocus color="warning" onClick={() => handleClose()}>
                Cancel
              </Button>
            </Toolbar>
          </AppBar>
        )}

        {!fullScreen && (
          <DialogTitle
            style={{ cursor: draggable ? "move" : "default" }}
            id="draggable-dialog-title"
          >
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "90%" }}>{title}</div>
              <div
                style={{ width: "10%", cursor: "pointer" }}
                onClick={() => handleClose()}
              >
                X
              </div>
            </div>
          </DialogTitle>
        )}
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
