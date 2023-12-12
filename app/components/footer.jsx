import React from "react";
import { SocialIcon } from "react-social-icons";
import { Divider, Button, Container, Stack, Box } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
export default function Footer() {
  return (
    <div
      style={{
        height: "350px",
        background: "#FFFAF9",
        borderTopLeftRadius: "120px",
        borderTopRightRadius: "120px",
        padding: "50px",
        textAlign: "center",
        boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
      }}
    >
      <SocialIcon url="www.youtube.com" style={{ margin: "6px" }} />
      <SocialIcon url="www.facebook.com" style={{ margin: "6px" }} />
      <SocialIcon url="www.linkedin.com" style={{ margin: "6px" }} />
      <SocialIcon url="www.vimeo.com" style={{ margin: "6px" }} />
      <br /> <br />
      <Divider />
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between">
          <Box
            sx={{
              height: "300px",
              width: "50%",
              display: "grid",
              placeContent: "center",
              justifyContent: "space-between",
            }}
          >
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="abc@gmail.com"
                  secondary="Email Address"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="+8801234567890" secondary="Phone" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Dhaka, Bangladesh" secondary="Address" />
              </ListItem>
            </List>
          </Box>
          <Box
            sx={{
              height: "300px",
              width: "50%",
              display: "grid",
              placeContent: "center",
            }}
          >
            <div>
              <h1>Our Mobile App</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Sapiente repudiandae adipisci iusto deleniti reprehenderit
              </p>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: "#D0392C" }}
              >
                Download Now
              </Button>
            </div>
          </Box>
        </Stack>{" "}
        <p style={{ padding: "20px", background: "#FFFAF9" }}>
          © 2023 Cyber All rights reserved
        </p>
      </Container>
    </div>
  );
}
