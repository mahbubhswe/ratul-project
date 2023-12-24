import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
export default function Sidebar() {
  const router = useRouter();
  const { user, logOut } = UserAuth();
  return (
    <React.Fragment>
      <Stack direction="column" height={"100vh"} justifyContent="space-between">
        <div>
          <Box
            sx={{
              height: "200px",
              display: "grid",
              placeContent: "center",
            }}
          >
            <Typography component="div" variant="bold" align="center">
              <Image
                src={user.photoURL}
                height={120}
                width={120}
                quality={100}
                style={{ borderRadius: "100px" }}
              />
            </Typography>
            <Typography component="h4" mt={1} variant="bold" align="center">
              {user.email}
            </Typography>
            <Typography
              component="h3"
              mt={1}
              align="center"
              sx={{ color: "grey" }}
            >
              Admin Dashboard
            </Typography>
          </Box>
          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/dashboard")}>
                <ListItemIcon>
                  <Image
                    src="/d.png"
                    height={25}
                    width={25}
                    quality={100}
                    alt="icon"
                  />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => router.push("/dashboard/problems")}
              >
                <ListItemIcon>
                  <Image
                    src="/p.png"
                    height={25}
                    width={25}
                    quality={100}
                    alt="icon"
                  />
                </ListItemIcon>
                <ListItemText>Manage Problems</ListItemText>
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => router.push("/dashboard/manage-courses")}
              >
                <ListItemIcon>
                  <Image
                    src="/c.png"
                    height={25}
                    width={25}
                    quality={100}
                    alt="icon"
                  />
                </ListItemIcon>
                <ListItemText>Manage Courses</ListItemText>
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => router.push("/dashboard/check-exam")}
              >
                <ListItemIcon>
                  <Image
                    src="/exam.png"
                    height={25}
                    width={25}
                    quality={100}
                    alt="icon"
                  />
                </ListItemIcon>
                <ListItemText>Check Exam</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <Button
          onClick={() => logOut()}
          sx={{ m: "10px" }}
          variant="contained"
          color="warning"
        >
          Logout
        </Button>
      </Stack>
    </React.Fragment>
  );
}
