"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

function AppNavBar() {
  const router = useRouter();
  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "#FFFFFF", py: "8px" }}
      elevation={1}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#D0392C",
              textDecoration: "none",
            }}
          >
            Cybersecurity Challenges
          </Typography>

          <Box sx={{ ml: "auto", color: "wheat" }}>
            <Button
              sx={{ color: "#646782", fontWeight: "bold" }}
              onClick={() => router.push("#home")}
            >
              Home
            </Button>
            <Button
              sx={{ color: "#646782", fontWeight: "bold" }}
              onClick={() => router.push("#what-we-offer")}
            >
              What We Offer
            </Button>{" "}
            <Button
              sx={{ color: "#646782", fontWeight: "bold" }}
              onClick={() => router.push("#about-us")}
            >
              About Us
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppNavBar;
