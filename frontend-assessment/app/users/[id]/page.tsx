"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../lib/api";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import Grid from "@mui/material/Grid";


export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>User not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => router.push("/users")}>
        ← Back to Users
      </Button>

      <Paper sx={{ mt: 3, p: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Avatar */}
          <Grid item xs={12} md={3} textAlign="center">
            <Avatar
              src={user.image}
              alt={user.firstName}
              sx={{ width: 120, height: 120, mx: "auto" }}
            />
            <Typography variant="h6" mt={2}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color="text.secondary">
              @{user.username}
            </Typography>
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={9}>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Email:</strong> {user.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Phone:</strong> {user.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Gender:</strong> {user.gender}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Age:</strong> {user.age}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Company:</strong> {user.company?.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Address:</strong>{" "}
                  {user.address?.address}, {user.address?.city}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
