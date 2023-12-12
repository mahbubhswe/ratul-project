"use client";
import { db } from "./../firebase";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
export default function DashboardPage() {
  const [freeCourses, setFreeCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    //free course
    const collectionRef = collection(db, "courses");
    const q = query(collectionRef, where("coursePrice", "==", 0));
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setFreeCourses(postsArray);
    });
    //paid course
    const collectionRef1 = collection(db, "courses");
    const q1 = query(collectionRef1, where("coursePrice", "!=", 0));
    onSnapshot(q1, (querySnapshot) => {
      let postsArray1 = [];
      querySnapshot.forEach((doc) => {
        postsArray1.push({ ...doc.data(), id: doc.id });
      });
      setPaidCourses(postsArray1);
    });
    //problem
    const collectionRef2 = collection(db, "problems");
    const q2 = query(collectionRef2);
    onSnapshot(q2, (querySnapshot) => {
      let postsArray2 = [];
      querySnapshot.forEach((doc) => {
        postsArray2.push({ ...doc.data(), id: doc.id });
      });
      setProblems(postsArray2);
    });
    //problem solve
    const collectionRef3 = collection(db, "studentSolution");
    const q3 = query(collectionRef3);
    onSnapshot(q3, (querySnapshot) => {
      let postsArray3 = [];
      querySnapshot.forEach((doc) => {
        postsArray3.push({ ...doc.data(), id: doc.id });
      });
      setSolvedProblems(postsArray3);
    });
  });
  return (
    <React.Fragment>
      <Grid container justifyContent={"center"}>
        <Grid
          item
          style={{
            margin: "10px",
            height: "200px",
            width: "350px",
            border: "1px solid white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
          }}
        >
          <h2>Paid Course</h2>
          <h1 style={{ textAlign: "center" }}>{paidCourses.length}</h1>
        </Grid>{" "}
        <Grid
          item
          style={{
            margin: "10px",
            height: "200px",
            width: "350px",
            border: "1px solid white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
          }}
        >
          <h2>Free Course</h2>
          <h1 style={{ textAlign: "center" }}>{freeCourses.length}</h1>
        </Grid>{" "}
        <Grid
          item
          style={{
            margin: "10px",
            height: "200px",
            width: "350px",
            border: "1px solid white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
          }}
        >
          <h2>Total Problems</h2>
          <h1 style={{ textAlign: "center" }}>{problems.length}</h1>
        </Grid>
        <Grid
          item
          style={{
            margin: "10px",
            height: "200px",
            width: "350px",
            border: "1px solid white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
          }}
        >
          <h2>Problems Solved</h2>
          <h1 style={{ textAlign: "center" }}>{solvedProblems.length}</h1>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
