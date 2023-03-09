import { useState } from "react";
import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type propsSelect = {
  onchangeSelectBox: (data: string) => void;
  dataCompo: [{ label: string; value: string | number }];
};

export const SelectBoxSearch = ({
  onchangeSelectBox,
  dataCompo = [{ label: "", value: "" }],
}: propsSelect) => {
  const [target, setTarget] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setTarget(event.target.value);
    onchangeSelectBox(event.target.value);
  };
  return (
    <div>
      <Select
        sx={{ width: "100%", background: "#fff" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={target}
        size="small"
        onChange={handleChange}
      >
        {dataCompo.map(
          (item: { label: string; value: string | number }, key) => (
            <MenuItem key={key} value={item.value ? item.value : ""}>
              {item.label ? item.label : "No Records Found"}
            </MenuItem>
          )
        )}
      </Select>
    </div>
  );
};
