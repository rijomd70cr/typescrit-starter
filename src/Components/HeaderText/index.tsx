import { Typography } from '@mui/material';

type Props = { title: string }
export const HeaderText = (props: Props) => {
    const { title: title } = props;
    return (
        <div>
            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: "18px",fontWeight:"bold" }} >{title}</Typography>
        </div>
    )
}