import React from "react";
import { Box, Grid, Button } from "@mui/material";

import { useMobile } from "../../Services/Hook/Hook";
import { HeaderText } from "../../Components/HeaderText";
import { FormButton } from "../../Components/FormElements/FormButton";

type typeAction = {
  label: string;
  icon: JSX.Element;
  color: any;
  onClick: (data: Object) => Object;
};
type Props = {
  title: string;
  children: any;
  actions: typeAction[];
};

export const PageLayout = (props: Props) => {
  const { title, children, actions } = props;
  const styles: { [key: string]: React.CSSProperties } = {
    layout: {
      width: "100%",
      background: "#fff",
      margin: useMobile() ? "0px" : "1.3rem",
      marginBottom: "0px",
      padding: "8px",
    },
    container: { minHeight: "40px", width: "100%" },
  };

  return (
    <Box sx={styles.layout}>
      <Grid container sx={styles.container}>
        <Grid item md={6} xs={12}>
          <HeaderText title={title} />
        </Grid>
        <Grid item md={6} xs={12} textAlign="end">
          {actions.length > 0 &&
            actions.map((item, index) => {
              return (
                <div key={index}>
                  <FormButton
                    style={{ mr: 2, fontSize: 13 }}
                    fullWidth={false}
                    loading={false}
                    onClick={() => item.onClick({})}
                    color={item.color}
                    variant="contained"
                  >
                    {item.label + " "} {item.icon}
                  </FormButton>
                </div>
              );
            })}
        </Grid>
      </Grid>
      <hr style={{ border: "1px solid #f0f1f9" }}></hr>
      <Grid container sx={styles.container}>
        <Grid item lg={12} md={12} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
