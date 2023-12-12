"use client";
import { Paper, Divider, Box, Stack, TextField } from "@mui/material";
import { db } from "./../../../firebase";
import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  updateDoc,
  addDoc,
  collection,
  Timestamp,
  increment,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonSpacer from "@/app/components/buttonSpacer";
import { useParams, useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
export default function CheckStudentAnswer() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [problem, setProblem] = useState();
  const [marks, setMarks] = useState();
  const getSingleDoc = async () => {
    const docRef = doc(db, "exam", params.id);
    const docSnap = await getDoc(docRef);
    setProblem(docSnap.data());
  };
  useEffect(() => {
    getSingleDoc();
  });
  const handelSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Want to submit this marks",
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
          const collRef = doc(db, "exam", params.id);
          await updateDoc(collRef, {
            isSolved: true,
            outOfMark: marks,
          });

          const collRef1 = doc(db, "rank", problem.studentId);
          await updateDoc(collRef1, {
            rank: increment(1),
          });

          setOpen(false);
          Swal.fire(
            "Success",
            "Marks has been submitted successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              e.target.reset();
              router.push("/dashboard/check-exam");
            }
          });
        } catch (error) {
          setOpen(false);
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };
  return (
    <main>
      <Paper sx={{ padding: "12px" }}>
        <h3>Check Student Answer</h3>
        <Divider />
        <h4>{problem ? problem.title : null}</h4>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "12px",
          }}
        >
          <strong>Problem Descriptions</strong>
          <br />
          {problem ? problem.problemDes : null}
        </Box>
        <br />{" "}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "12px",
          }}
        >
          <strong style={{ color: "green" }}>
            Answer submitted by student
          </strong>
          <br />
          {problem ? problem.solution : null}
        </Box>
        <br />
        <strong style={{ color: "green" }}>
          Marks: {problem ? problem.marks : null}
        </strong>
        <br /> <p>Give Marks: </p>
        <Stack spacing={2} component="form" onSubmit={handelSubmit}>
          <TextField
            fullWidth
            type="number"
            placeholder="Give marks"
            required
            variant="outlined"
            onChange={(e) => {
              setMarks(e.target.value);
            }}
          />
          <ButtonSpacer>
            <Button
              type="button"
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                router.push("/dashboard/check-exam");
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </ButtonSpacer>
        </Stack>
      </Paper>{" "}
      <Backdrop open={open}>
        <CircularProgress sx={{ color: "green" }} />
      </Backdrop>
    </main>
  );
}
