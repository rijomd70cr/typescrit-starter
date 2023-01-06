import { useState, memo } from 'react';
import { Box, Grid, } from '@mui/material';
import { TextInput, FormButton } from '../../../Components/FormElements'
import { Link } from "react-router-dom";


type Props = {}

const SignUp = (props: Props) => {
    const [signin, setsignin] = useState({ email: "", password: "" });
    const [isLoading, setLoading] = useState(false);

    const handleChange = (name: string, value: string) => {
        setsignin({
            ...signin,
            [name]: value
        })
    }

    const handleSumbit = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    return (
        <Box sx={{ display: "contents" }}>
            <Grid container spacing={3} direction={'column'} justifyContent={'center'} alignItems={'center'} minHeight="110vh">
                <Box>
                    <Grid item xs={12} sx={{ mt: "8px" }}>
                        <TextInput label="User Name" placeholder="Email" name="email" type="email" fullWidth={false}
                            onChange={(name, value) => handleChange(name, value)} required={true}
                            error={{ isError: false, errorMsg: "" }} value={signin.email}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: "8px" }}>
                        <TextInput label="Password" placeholder="Password" name="password" type="password" fullWidth={false}
                            onChange={(name, value) => handleChange(name, value)} required={true}
                            error={{ isError: false, errorMsg: "" }} value={signin.password}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: "8px" }} textAlign="end">
                        <FormButton fullWidth={true} loading={isLoading} onClick={handleSumbit} style={{}} >Save </FormButton>
                        <Link to='/login'>Login</Link>
                    </Grid>
                </Box>
            </Grid>

        </Box >
    )
}

export default memo(SignUp);