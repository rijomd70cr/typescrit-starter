import React from 'react'
import { Box, Grid, Button, } from '@mui/material';
import { HeaderText } from '../../Components/HeaderText';

const styles: { [key: string]: React.CSSProperties } = {
    layout: { width: "100%", background: "#fff", margin: "1.3rem", marginBottom: "0px", padding: "8px" },
    container: { minHeight: "40px" }
}
type typeAction = {
    label: string,
    icon: JSX.Element,
    onClick: (data: Object) => Object,
}
type Props = {
    title: string,
    children: any,
    actions: typeAction[]
}

export const PageLayout = (props: Props) => {
    const { title, children, actions } = props;

    return (
        <Box sx={styles.layout}>
            <Grid container sx={styles.container}>
                <Grid item md={6} xs={12}>
                    <HeaderText title={title} />
                </Grid>
                <Grid item md={6} xs={12} textAlign="end">
                    {actions.length > 0 && actions.map((item, index) => {
                        return <Button sx={{ mr: 2, fontSize: 11 }} key={index} size="small" variant="outlined"
                            onClick={() => item.onClick({})}> {item.label + " "} {item.icon}
                        </Button>
                    })}
                </Grid>
            </Grid>
            <hr style={{ border: "1px solid #f0f1f9" }}></hr>
            <Grid container>
                <Grid item md={12}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
}