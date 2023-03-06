import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { Grid } from "@mui/material";

type actionProps = {
  handleEdit: () => void;
  handleView: () => void;
  handleDelete: () => void;
};

export const ExtraActions = ({
  handleEdit,
  handleDelete,
  handleView,
}: actionProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={4} xs={4} lg={4}>
        <BorderColorIcon
          onClick={handleEdit}
          sx={{ color: "#90df68", cursor: "pointer" }}
        />
      </Grid>
      <Grid item md={4} xs={4} lg={4}>
        <VisibilityIcon
          onClick={handleView}
          sx={{ color: "#1976d2", cursor: "pointer" }}
        />
      </Grid>
      <Grid item md={4} xs={4} lg={4}>
        <DeleteIcon
          onClick={handleDelete}
          sx={{ color: "red", cursor: "pointer" }}
        />
      </Grid>
    </Grid>
  );
};
