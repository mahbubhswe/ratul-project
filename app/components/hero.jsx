"use client";
import React from "react";
import { Stack, Container, Box, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: "550px",
        backgroundColor: "#EEF3EF",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between">
          <Box
            sx={{
              height: "550px",
              width: "50%",
              display: "grid",
              placeContent: "center",
            }}
          >
            <div>
              <h1>Grow Your Knowledge With Us.</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Sapiente repudiandae adipisci iusto deleniti reprehenderit
                tempore necessitatibus velit voluptas, excepturi alias aliquid
                eos expedita cum ea ullam debitis vero maxime explicabo.
              </p>
              <Button
                variant="outlined"
                color="warning"
                size="large"
                onClick={() => router.push("/user-account")}
              >
                Start Now
              </Button>
            </div>
          </Box>
          <Box
            sx={{
              height: "550px",
              width: "50%",
              display: "grid",
              placeContent: "center",
            }}
          >
            {" "}
            <Image src="/hero.png" width={300} height={300} quality={100} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
