import React, { useState } from "react";
import { Button, Container, Typography, TextField, Alert } from "@mui/material";
import { UIButtonVariants } from "../../utils/enum";
import { useFormik } from "formik";
import * as yup from "yup";
import { createUser } from "../../api/userApi";
import { loginUser } from "../../api/loginApi";

import { useNavigate } from "react-router-dom";

// Define form values type
interface RegisterFormValues {
  userName: string;
  password: string;
}

// Form initial values
const initialValues: RegisterFormValues = {
  userName: "",
  password: "",
};

// Validation schema
const validationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Register: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik<RegisterFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createUser(values);

        if (response.status === 201) {
          const loginResponse = await loginUser(values);
          const data = loginResponse.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);

          setErrorMessage(null);

          navigate("/home");
        }
      } catch (error: unknown) {
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage("Failed to create user");
      }
    },
  });

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Register
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
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          type="submit"
          variant={UIButtonVariants.CONTAINED}
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Create Account
        </Button>
      </form>
    </Container>
  );
};

export default Register;
