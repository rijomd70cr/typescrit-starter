import { Box, CircularProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  fullWidth: boolean;
  children: any;
  onClick: () => void;
  loading: boolean;
  style: object;
  color: any;
  [x: string]: any;
};

export const FormButton = (props: Props) => {
  const {
    fullWidth,
    children,
    onClick,
    loading,
    color,
    style = { fontSize: "11px" },
    ...x
  } = props;

  return (
    <Box>
      <LoadingButton
        loading={loading}
        loadingIndicator={
          <CircularProgress
            color="inherit"
            size="small"
            sx={{ paddingLeft: "5px", paddingRight: "5px" }}
          />
        }
        size="small"
        sx={style}
        color={color}
        fullWidth={fullWidth}
        onClick={onClick}
        {...x}
      >
        {children}
      </LoadingButton>
    </Box>
  );
};
