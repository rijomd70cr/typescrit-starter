import { useState, memo, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { TextInput, FormButton } from "../../../Components/FormElements";
import { SnackBar } from "../../../Components/AlertBoxes/SnackBar";

import { loginUrl } from "../Config/urlConstants";
import { useAppDispatch, useFetchWithAbort } from "../../../Services/Hook/Hook";

import { getRequestHeaders } from "../../../Services/Methods/Authmethods";
import { loginAction } from "../../../Modules/Auth/Reducer/AuthAction";

const Login = () => {
  const [login, setlogin] = useState({ username: "", password: "" });
  const [isLoading, setLoading] = useState(false);
  const [isopenAlert, setOpenAlert] = useState(false);
  const [typeOfAlert, setTypeOfAlert] = useState("");
  const [alertMessege, setAlertMessege] = useState("");

  const [url, setMyUrl] = useState<string>("");
  const [requestOptions, setRequestOptions] = useState<any>({});

  const loginRequest = useFetchWithAbort(url, requestOptions);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (name: string, value: string) => {
    setlogin({
      ...login,
      [name]: value,
    });
  };

  const handleSumbit = async () => {
    setLoading(true);
    let options = await getRequestHeaders("POST", login);
    setRequestOptions(options);
    setMyUrl(loginUrl);
  };

  useEffect(() => {
    (async () => {
      if (loginRequest?.fetchedData) {
        let fetchedData: any = loginRequest?.fetchedData;
        if (Object.keys(fetchedData).length !== 0) {
          let data = {
            access_token: fetchedData?.data?.token,
            user: fetchedData?.data?.user,
          };
          setLoading(false);
          setOpenAlert(true);
          setAlertMessege(fetchedData.message);
          if (fetchedData.error_code === 200) {
            setTypeOfAlert("success");
            dispatch(loginAction(data, true));
            navigate("/");
            window.location.reload();
          } else {
            setTypeOfAlert("error");
          }
        }
      }
    })();
  }, [loginRequest?.fetchedData]);

  const snacksbar = useMemo(() => {
    if (isopenAlert) {
      return (
        <SnackBar
          open={isopenAlert}
          handleClose={() => setOpenAlert(false)}
          message={alertMessege}
          typeOfAlert={typeOfAlert}
          vertical="top"
          horizontal="center"
          transitionElement={{
            element: "SlideTransition",
            direction: "down",
          }}
        />
      );
    }
  }, [isopenAlert]);

  return (
    <Box sx={{ display: "contents" }}>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight="90vh"
      >
        <Box>
          <Grid item xs={12} sx={{ mt: "8px" }}>
            <TextInput
              label="User Name"
              placeholder="Email"
              name="username"
              type="email"
              onKeyPress={() => {}}
              fullWidth={false}
              onChange={(name, value) => handleChange(name, value)}
              required={true}
              error={{ isError: false, errorMsg: "" }}
              value={login.username}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "8px" }}>
            <TextInput
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              fullWidth={false}
              onKeyPress={handleSumbit}
              onChange={(name, value) => handleChange(name, value)}
              required={true}
              error={{ isError: false, errorMsg: "" }}
              value={login.password}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "8px" }} textAlign="end">
            <FormButton
              fullWidth={true}
              loading={isLoading}
              onClick={handleSumbit}
              style={{}}
              color="primary"
            >
              Save{" "}
            </FormButton>
            <Link to="/signup">Sign Up</Link>
          </Grid>
        </Box>
      </Grid>

      {snacksbar}
    </Box>
  );
};

export default memo(Login);
