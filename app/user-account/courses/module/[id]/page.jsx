"use client";
import { Paper, Divider, Box, Button } from "@mui/material";
import { db } from "./../../../../firebase";
import React, { useEffect, useState } from "react";
import { getDoc, doc, addDoc, collection } from "firebase/firestore";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { UserAuth } from "@/app/context/AuthContext";
export default function ReadModule() {
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [course, setCourse] = useState();
  const getSingleDoc = async () => {
    const docRef = doc(db, "courses", params.id);
    const docSnap = await getDoc(docRef);

    setCourse(docSnap.data());
  };
  useEffect(() => {
    getSingleDoc();
  });
  if (course) {
    return (
      <main>
        <Paper sx={{ padding: "12px" }}>
          <Image
            src={course.coverPhoto}
            height={300}
            width={500}
            quality={100}
          />
          <h4>{course.courseTitle}</h4>
          <Divider />
          <h2>Course Description</h2>
          <Box
            sx={{
              borderRadius: "4px",
              padding: "12px",
            }}
          >
            {course.courseDes}
          </Box>
          <h4>Price: {course.coursePrice} tk</h4>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                text: "Want to enroll now",
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
                    await addDoc(collection(db, "studentCourses"), {
                      courseId: params.id,
                      studentId: user.uid,
                    });
                    setOpen(false);
                    Swal.fire(
                      "Success",
                      "You have Enrolled successfully!",
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
            Enroll Now
          </Button>
        </Paper>
        <Backdrop open={open}>
          <CircularProgress sx={{ color: "green" }} />
        </Backdrop>
      </main>
    );
  }
}
