"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material";
import { db } from "../../firebase";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
export default function CheckExam() {
  const router = useRouter();
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "exam");
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
      <h1>Check Student Answer</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Submited</TableCell>
              <TableCell>Check/Uncheck</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.marks}</TableCell>
                <TableCell>
                  {moment(item.createdAt.toDate()).format("LLL")}
                </TableCell>
                <TableCell sx={{ color: item.isSolved ? "green" : "red" }}>
                  {item.isSolved ? "Checked" : "Unchecked"}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/check-exam/${item.id}`)
                    }
                  >
                    Check Answer
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
