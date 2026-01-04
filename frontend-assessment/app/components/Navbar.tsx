"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Link,
} from "@mui/material";

export default function DashboardPage() {
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
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6"> Dashboard</Typography>
          </Link>

          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography>Hello, {user.firstName}</Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
