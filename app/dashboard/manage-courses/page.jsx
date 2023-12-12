"use client";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  query,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Stack,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function ManageCoursePage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [courseTite, setCourseTite] = useState();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "courses");
    const q = courseTite
      ? query(collectionRef, where("courseTite", "<=", courseTite))
      : query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setCourses(postsArray);
    });
  }, [courseTite]);

  return (
    <main>
      <h1>Course List</h1>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={1}
        mb={1}
      >
        <TextField
          type="search"
          size="small"
          placeholder="Search by title..."
          fullWidth
          onChange={(e) => setCourseTite(e.target.value)}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ width: "200px" }}
          onClick={() => router.push("/dashboard/manage-courses/add-course")}
        >
          Add new course
        </Button>
      </Stack>

      <Grid container mt={5} justifyContent="center" alignItems="center">
        {courses.map((item) => (
          <Grid item key={item.id} sx={{ m: "5px" }}>
            <Paper sx={{ p: "10px" }}>
              <Typography align="center">
                <Image
                  alt="Photo"
                  src={item.coverPhoto}
                  height={200}
                  width={200}
                  quality={100}
                />
              </Typography>
              <Typography>{item.courseTitle}</Typography>
              <span
                style={{
                  background: "green",
                  color: "white",
                  borderRadius: "4px",
                  padding: "3px",
                }}
              >
                {item.coursePrice} tk
              </span>
              <br />
              <br />
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() =>
                  Swal.fire({
                    title: "Are you sure?",
                    text: "Want to add this course",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                    reverseButtons: true,
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        setOpen(true);
                        await deleteDoc(doc(db, "courses", item.id));
                        setOpen(false);
                        Swal.fire(
                          "Success",
                          "This course deleted successfully!",
                          "success"
                        );
                      } catch (error) {
                        setOpen(false);
                        Swal.fire("Error", error.message, "error");
                      }
                    }
                  })
                }
              >
                Delete
              </Button>{" "}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Backdrop open={open}>
        <CircularProgress sx={{ color: "green" }} />
      </Backdrop>
    </main>
  );
}
