import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { userName: "", password: "" },
    validationSchema: yup.object({
      userName: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await loginUser(values);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        setErrorMessage(null);
        navigate("/home");
      } catch (error: unknown) {
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage("Login failed");
      } finally {
        setIsLoading(false); // Stop loading
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="userName"
          label="Username"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />

        <TextField
          fullWidth
          margin="normal"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Box sx={{ position: "relative", mt: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading} // Disable button while loading
          >
            Login
          </Button>

          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary.main",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </Container>
  );
};

export default Login;
