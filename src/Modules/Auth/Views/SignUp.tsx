import { useState, memo, useEffect, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { TextInput, FormButton } from "../../../Components/FormElements";
import { SnackBar } from "../../../Components/AlertBoxes/SnackBar";

import { signUpAction } from "../Reducer/AuthAction";
import { signInUrl } from "../Config/urlConstants";

import { getRequestHeaders } from "../../../Services/Methods/Authmethods";
import { useAppDispatch, useFetchWithAbort } from "../../../Services/Hook/Hook";

type Props = {};
const SignUp = (props: Props) => {
  const [signin, setsignin] = useState({ email: "", password: "" });
  const [isopenAlert, setOpenAlert] = useState<boolean>(false);
  const [typeOfAlert, setTypeOfAlert] = useState("");

  const [alertMessege, setAlertMessege] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [url, setMyUrl] = useState<string>("");
  const [requestOptions, setRequestOptions] = useState<any>({});

  const dispatch = useAppDispatch();
  const signinRequest = useFetchWithAbort(url, requestOptions);

  const handleChange = (name: string, value: string) => {
    setsignin({
      ...signin,
      [name]: value,
    });
  };

  const handleSumbit = async () => {
    setLoading(true);
    let options = await getRequestHeaders("POST", signin);
    setRequestOptions(options);
    setMyUrl(signInUrl);
  };

  useEffect(() => {
    if (signinRequest?.fetchedData) {
      let fetchedData: any = signinRequest?.fetchedData;
      if (Object.keys(fetchedData).length !== 0) {
        setLoading(false);
        setAlertMessege(fetchedData.message);
        if (fetchedData.error_code === 200) {
          setTypeOfAlert("success");
          setOpenAlert(true);
          dispatch(signUpAction(fetchedData.data));
        } else {
          setTypeOfAlert("error");
          setOpenAlert(true);
        }
      }
    }
  }, [signinRequest?.fetchedData]);

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
              onKeyPress={() => {}}
              error={{ isError: false, errorMsg: "" }}
              value={signin.email}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "8px" }}>
            <TextInput
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              onKeyPress={() => {}}
              fullWidth={false}
              onChange={(name, value) => handleChange(name, value)}
              required={true}
              error={{ isError: false, errorMsg: "" }}
              value={signin.password}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "8px" }} textAlign="end">
            <FormButton
              fullWidth={true}
              color="primary"
              loading={isLoading}
              onClick={handleSumbit}
              style={{}}
            >
              Save{" "}
            </FormButton>
            <Link to="/login">Login</Link>
          </Grid>
        </Box>
        {snacksbar}
      </Grid>
    </Box>
  );
};

export default memo(SignUp);
