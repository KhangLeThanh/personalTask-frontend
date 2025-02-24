import React, { useState, useEffect } from "react";
import { Button, Container, Typography, TextField, Alert } from "@mui/material";
import { getUserId } from "../../utils/auth";
import { Profile } from "../../utils/types";
import { UIButtonVariants } from "../../utils/enum";
import Label from "../../components/Label/Label";
import { useFormik } from "formik";
import { getUserProfile, updateUserProfile } from "../../api/userProfileApi";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  age: yup.number().min(1).required("Age is required"),
});
const UserProfile: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<Profile>({
    age: null,
    bio: "",
    location: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getUserProfile(getUserId())
      .then((data) => {
        setInitialValues({
          age: data.profile?.age || null,
          bio: data.profile?.bio || "",
          location: data.profile?.location || "",
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []);
  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await updateUserProfile(getUserId(), values);
        if (response.status === 201) {
          setErrorMessage(null);
          setTimeout(() => navigate("/home"), 2000); // Redirect after 2s
        }
      } catch (error: any) {
        console.log("test errors", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to update user profile"
        );
      }
    },
  });

  return (
    <Container maxWidth="sm" style={{ textAlign: "left", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Update Profile
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <form onSubmit={formik.handleSubmit}>
        <Label text="Age" />
        <TextField
          name="age"
          type="number"
          fullWidth
          margin="normal"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <Label text="Bio" />

        <TextField
          name="bio"
          type="bio"
          fullWidth
          margin="normal"
          value={formik.values.bio}
          onChange={formik.handleChange}
        />
        <Label text="Location" />

        <TextField
          name="location"
          type="location"
          fullWidth
          margin="normal"
          value={formik.values.location}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          variant={UIButtonVariants.CONTAINED}
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Update a profile
        </Button>
      </form>
    </Container>
  );
};

export default UserProfile;
