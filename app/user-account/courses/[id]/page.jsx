"use client";
import { Paper, Divider, Box } from "@mui/material";
import { db } from "./../../../firebase";
import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function ReadCourse() {
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
          <Box
            sx={{
              borderRadius: "4px",
              padding: "12px",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: course.courseModule,
              }}
            />
          </Box>
        </Paper>
      </main>
    );
  }
}
