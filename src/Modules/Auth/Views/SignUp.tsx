import { useState, memo } from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { TextInput, FormButton } from "../../../Components/FormElements";
import { SnackBar } from "../../../Components/AlertBoxes/SnackBar";

import { useAppDispatch } from "../../../Services/Hook/Hook";
import { signUpAction } from "../Reducer/AuthAction";
import { requestMethod } from "../../../Services/Request";

import { signInUrl } from "../Config/urlConstants";

type Props = {};
const SignUp = (props: Props) => {
  const [signin, setsignin] = useState({ email: "", password: "" });
  const [isopenAlert, setOpenAlert] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [alertMessege, setAlertMessege] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    setsignin({
      ...signin,
      [name]: value,
    });
  };

  const handleSumbit = async () => {
    setLoading(true);
    await requestMethod(signInUrl, signin, "post").then((res) => {
      console.log(res);
      dispatch(signUpAction(res?.data));
      setLoading(false);
      setAlertMessege(res.message);
      setOpenAlert(true);
    });
  };

  return (
    <Box sx={{ display: "contents" }}>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight="110vh"
      >
        <Box>
          <Grid item xs={12} sx={{ mt: "8px" }}>
            <TextInput
              label="User Name"
              placeholder="Email"
              name="email"
              type="email"
              fullWidth={false}
              onChange={(name, value) => handleChange(name, value)}
              required={true}
              error={{ isError: false, errorMsg: "" }}
              value={signin.email}
              onKeyPress={() => {}}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "8px" }}>
            <TextInput
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              fullWidth={false}
              onChange={(name, value) => handleChange(name, value)}
              required={true}
              error={{ isError: false, errorMsg: "" }}
              value={signin.password}
              onKeyPress={() => {}}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "8px" }} textAlign="end">
            <FormButton
              fullWidth={true}
              loading={isLoading}
              onClick={handleSumbit}
              style={{}}
            >
              Save{" "}
            </FormButton>
            <Link to="/login">Login</Link>
          </Grid>
        </Box>

        {isopenAlert && (
          <SnackBar
            open={isopenAlert}
            handleClose={() => setOpenAlert(false)}
            message={alertMessege}
            typeOfAlert="success"
            vertical="top"
            horizontal="center"
            transitionElement={{
              element: "SlideTransition",
              direction: "down",
            }}
          />
        )}
      </Grid>
    </Box>
  );
};

export default memo(SignUp);
