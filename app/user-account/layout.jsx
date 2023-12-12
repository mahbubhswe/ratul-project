"use client";
import React from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import Login from "./components/login";
import Sidebar from "./components/sidebar";
export default function UserAccount({ children }) {
  const { user } = UserAuth();
  if (user) {
    return (
      <Stack direction={{ xs: "column", sm: "row", md: "row" }}>
        <Paper
          elevation={1}
          sx={{
            width: "250px",
            display: { xs: "none", sm: "none", md: "block" },
            minHeight: "100vh",
            background: "#FAFAFA",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              width: "250px",
              scrollBehavior: "smooth",
              position: "fixed",
            }}
          >
            <Sidebar />
          </Box>
        </Paper>
        <Container
          sx={{
            flex: 1,
            p: { xs: "5px", sm: "10px", md: "30px" },
          }}
        >
          {children}
        </Container>
      </Stack>
    );
  }
  return <Login />;
}
