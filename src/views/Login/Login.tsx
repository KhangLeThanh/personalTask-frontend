import React, { useState } from "react";
import { Button, Container, Typography, TextField, Alert } from "@mui/material";
import { UIButtonVariants } from "../../utils/enum";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";

// Form initial values
const initialValues = {
  userName: "",
  password: "",
};
const validationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user.id);

          setTimeout(() => navigate("/home"), 2000);
        }
      } catch (error: unknown) {
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage("Failed to login");
      }
    },
  });
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="userName"
          label="Username"
          fullWidth
          margin="normal"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          name="password"
          label="password"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />{" "}
        <Button
          variant={UIButtonVariants.TEXT}
          color="primary"
          fullWidth
          sx={{ fontSize: "0.7rem" }}
          onClick={handleRegister}
        >
          Create a new user
        </Button>
        <Button
          type="submit"
          variant={UIButtonVariants.CONTAINED}
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
