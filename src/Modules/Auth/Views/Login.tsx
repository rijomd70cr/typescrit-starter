import { useState, memo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, } from '@mui/material';

import { TextInput, FormButton } from '../../../Components/FormElements';
import { useAppDispatch } from '../../../Services/Hook/Hook';

import { loginAction } from '../../../Modules/Auth/Reducer/AuthAction';
import { requestMethod } from '../../../Services/Request';

import { loginUrl } from '../Config/urlConstants';



const Login = () => {
    const [login, setlogin] = useState({ email: "", password: "" });
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleChange = (name: string, value: string) => {
        setlogin({
            ...login,
            [name]: value
        })
    }

    const handleSumbit = async () => {
        setLoading(true);
        if (login.email) {
            await requestMethod(loginUrl, login, "post").then(
                (res) => {
                    console.log(res);
                    dispatch(loginAction(true));
                    navigate('/');
                    setLoading(false);
                },
            )
            // localStorage.setItem("user", JSON.stringify(login));
        }
    }

    return (
        <Box sx={{ display: "contents" }}>
            <Grid container spacing={3} direction={'column'} justifyContent={'center'} alignItems={'center'} minHeight="90vh">
                <Box>
                    <Grid item xs={12} sx={{ mt: "8px" }}>
                        <TextInput label="User Name" placeholder="Email" name="email" type="email" fullWidth={false}
                            onChange={(name, value) => handleChange(name, value)} required={true}
                            error={{ isError: false, errorMsg: "" }} value={login.email}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: "8px" }}>
                        <TextInput label="Password" placeholder="Password" name="password" type="password" fullWidth={false}
                            onChange={(name, value) => handleChange(name, value)} required={true}
                            error={{ isError: false, errorMsg: "" }} value={login.password}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: "8px" }} textAlign="end">
                        <FormButton fullWidth={true} loading={isLoading} onClick={handleSumbit} style={{}} >Save </FormButton>
                        <Link to='/signup'>Sign Up</Link>
                    </Grid>
                </Box>
            </Grid>

        </Box >
    )
}

export default memo(Login);