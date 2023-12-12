import React from "react";
import { Box, Container, Stack } from "@mui/material";
export default function AfterNav() {
  return (
    <div
      style={{
        height: "350px",
        background: "#FFFAF9",
        padding: "50px",
      }}
    >
      <Container maxWidth="md">
        <h1 style={{ color: "#14142B" }}>What We Offer</h1>
        <Stack direction="row" spacing={5} justifyContent="space-between">
          <div
            style={{
              height: "250px",
              width: "500px",
              border: "1px solid white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
            }}
          >
            <h2>Courses</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Cupiditate excepturi impedit animi vero fugiat sunt quibusdam
              eaque rerum, molestiae quaerat, officiis quo repudiandae dolorem
              eligendi modi optio sapiente hic libero.
            </p>
          </div>
          <div
            style={{
              height: "250px",
              width: "500px",
              border: "1px solid white",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
            }}
          >
            <h2>Problem Solving</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Cupiditate excepturi impedit animi vero fugiat sunt quibusdam
              eaque rerum, molestiae quaerat, officiis quo repudiandae dolorem
              eligendi modi optio sapiente hic libero.
            </p>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
