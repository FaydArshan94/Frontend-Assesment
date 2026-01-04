"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "./store/authStore";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
} from "@mui/material";
import Link from "next/link";

export default function page() {
  const { user, isLoading, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Top Bar */}
    
      {/* Main Content */}
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome, {user?.firstName}
          </Typography>

          <Typography color="text.secondary">
            This is your admin dashboard. You can place stats, tables, or cards
            here.
          </Typography>
        </Paper>
        <Link href="/products">
        <Button variant="contained" sx={{ mt: 3 }}>
            Go to Products
          </Button>
        </Link>
      </Container>
    </>
  );
}
