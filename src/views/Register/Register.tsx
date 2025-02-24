import React, { useState } from "react";
import { Button, Container, Typography, TextField, Alert } from "@mui/material";
import { UIButtonVariants } from "../../utils/enum";
import { useFormik } from "formik";
import * as yup from "yup";
import { createUser } from "../../api/userApi"; // Import the API functions
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
const Regiser: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Log the form data to the console
      try {
        const response = await createUser(values);
        if (response.status === 201) {
          setErrorMessage(null);
          setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
        }
      } catch (error: any) {
        console.log("test errors", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to create user"
        );
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
          label="password"
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
          Create a new user
        </Button>
      </form>
    </Container>
  );
};

export default Regiser;
