import React, { useState } from "react";
import { Button, Container, Typography, TextField, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../../utils/auth";
import { Profile } from "../../utils/types";
import { UIButtonVariants } from "../../utils/enum";
import Label from "../../components/Label/Label";
import { useFormik } from "formik";
import { getUserProfile, updateUserProfile } from "../../api/userProfileApi";
import userProfileSchema from "../../schema/userProfileSchema";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const userId = getUserId();

  const { data } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId!),
    enabled: !!userId,
  });

  const formik = useFormik<Profile>({
    initialValues: {
      age: data?.profile?.age ?? 0,
      bio: data?.profile?.bio ?? "",
      location: data?.profile?.location ?? "",
    },
    enableReinitialize: true,
    validationSchema: userProfileSchema,
    onSubmit: async (values) => {
      try {
        const userId = getUserId();
        if (!userId) return;

        await updateUserProfile(userId, values);

        setErrorMessage(null);
        navigate("/home");
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
