"use client";
import { db } from "./../firebase";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
export default function UserAccountPage() {
  const { user } = UserAuth();
  const [courses, setCourses] = useState([]);
  const [rank, setRank] = useState(0);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    //course
    const collectionRef = collection(db, "studentCourses");
    const q = query(collectionRef, where("studentId", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setCourses(postsArray);
    });
    //problem solve
    const collectionRef2 = collection(db, "exam");
    const q2 = query(
      collectionRef2,
      where("isSolved", "==", true),
      where("studentId", "==", user.uid)
    );
    onSnapshot(q2, (querySnapshot) => {
      let postsArray2 = [];
      querySnapshot.forEach((doc) => {
        postsArray2.push({ ...doc.data(), id: doc.id });
      });
      setProblems(postsArray2);
    });
    //find rank
    const collectionRef3 = collection(db, "rank");
    const q3 = query(collectionRef3, orderBy("rank"));
    onSnapshot(q3, (querySnapshot) => {
      var count = 0;
      querySnapshot.forEach((doc) => {
        count++;
        if (doc.id == user.uid) {
          setRank(count);
        }
      });
    });
  });
  return (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          style={{
            margin: "10px",
            height: "200px",
            width: "300px",
            border: "1px solid white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
          }}
        >
          <h2>Your Rank</h2>
          <h1 style={{ textAlign: "center" }}>{rank}</h1>
        </Grid>{" "}
        <Grid
          item
          style={{
            margin: "10px",
            height: "200px",
            width: "300px",
            border: "1px solid white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
          }}
        >
          <h2>Problem Solved</h2>
          <h1 style={{ textAlign: "center" }}>{problems.length}</h1>
        </Grid>{" "}
        <Grid
          item
          style={{
            margin: "10px",
            height: "200px",
            width: "300px",
            border: "1px solid white",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 -4px 17px rgba(78,75,102,.15)",
          }}
        >
          <h2>Paid Courses</h2>
          <h1 style={{ textAlign: "center" }}>{courses.length}</h1>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
