import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserAuth } from "@/app/context/AuthContext";
import Image from "next/image";

export default function Login() {
  const { googleSignIn } = UserAuth();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "grid",
        placeContent: "center",
        p: "25px",
      }}
    >
      <Typography align="center">
        <Image src="/login.jpg" width={300} height={300} quality={100} />
      </Typography>
      <Typography p={5}>
        It's look like you are not loged in.You need to login to access this
        page.Please, login first.
      </Typography>
      <Button
        size="large"
        sx={{ textTransform: "none" }}
        variant="outlined"
        onClick={googleSignIn}
      >
        Start With Google
      </Button>
    </Container>
  );
}
