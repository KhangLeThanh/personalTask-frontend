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

const validationSchema = yup.object({
  age: yup
    .number()
    .min(1, "Age must be at least 1")
    .required("Age is required"),
  bio: yup.string(),
  location: yup.string(),
});

const UserProfile: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<Profile>({
    age: 0,
    bio: "",
    location: "",
  });

  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    getUserProfile(userId)
      .then((data) => {
        setInitialValues({
          age: data?.profile?.age ?? 0,
          bio: data?.profile?.bio ?? "",
          location: data?.profile?.location ?? "",
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage("Failed to fetch user profile");
      });
  }, []);

  const formik = useFormik<Profile>({
    initialValues,
    enableReinitialize: true, // important: update Formik values when initialValues change
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userId = getUserId();
        if (!userId) return;

        const response = await updateUserProfile(userId, values);

        // Navigate after successful update
        if (response.status === 201 || response.status === 200) {
          setErrorMessage(null);
          navigate("/home");
        }
      } catch (error: unknown) {
        if (error instanceof Error) setErrorMessage(error.message);
        else setErrorMessage("Failed to update profile");
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Update Profile
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage} </Alert>}

      <form onSubmit={formik.handleSubmit}>
        <Label text="Age" />
        <TextField
          name="age"
          type="number"
          fullWidth
          margin="normal"
          value={formik.values.age ?? 0} // fallback to 0
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />

        <Label text="Bio" />
        <TextField
          name="bio"
          type="text"
          fullWidth
          margin="normal"
          value={formik.values.bio ?? ""}
          onChange={formik.handleChange}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
        />

        <Label text="Location" />
        <TextField
          name="location"
          type="text"
          fullWidth
          margin="normal"
          value={formik.values.location ?? ""}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />

        <Button
          type="submit"
          variant={UIButtonVariants.CONTAINED}
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default UserProfile;
