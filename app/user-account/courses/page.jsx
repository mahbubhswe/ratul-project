"use client";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { Typography, Grid, Paper, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function CoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "courses");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setCourses(postsArray);
    });
  });

  return (
    <main>
      <h1>All Courses</h1>
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
              {item.coursePrice == 0 ? (
                <span
                  style={{
                    background: "green",
                    color: "white",
                    borderRadius: "4px",
                    padding: "3px",
                  }}
                >
                  Free
                </span>
              ) : (
                <span
                  style={{
                    background: "green",
                    color: "white",
                    borderRadius: "4px",
                    padding: "3px",
                  }}
                >
                  Price: {item.coursePrice} tk
                </span>
              )}
              <br />
              <br />
              {item.coursePrice == 0 ? (
                <Button
                  onClick={() =>
                    router.push(`/user-account/courses/${item.id}`)
                  }
                  variant="contained"
                >
                  Read
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    router.push(`/user-account/courses/module/${item.id}`)
                  }
                  variant="contained"
                >
                  Course Description
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
