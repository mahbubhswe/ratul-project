"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material";
import { db } from "../../firebase";
import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
export default function ProblemSolving() {
  const router = useRouter();
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "problems");
    const q = query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setProblems(postsArray);
    });
  });

  return (
    <main>
      <h1>Problem Solving</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Time</TableCell> <TableCell>Marks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.problemTitle}</TableCell>
                <TableCell>{item.problemDes}</TableCell>
                <TableCell>{item.timeLimit}m</TableCell>
                <TableCell>{item.marks}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      router.push(`/user-account/problem-solving/${item.id}`)
                    }
                  >
                    Start Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
