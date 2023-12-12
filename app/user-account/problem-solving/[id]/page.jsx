"use client";
import { Paper, Divider, Box, Stack, TextField } from "@mui/material";
import { db } from "./../../../firebase";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import React, { useEffect, useState } from "react";
import { getDoc, doc, addDoc, collection, Timestamp } from "firebase/firestore";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonSpacer from "@/app/components/buttonSpacer";
import { useParams, useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
export default function ProblemSolving() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const { user } = UserAuth();

  const router = useRouter();
  const [problem, setProblem] = useState();
  const [solution, setSolution] = useState();
  const [timer, setTimer] = useState(0);
  const getSingleDoc = async () => {
    const docRef = doc(db, "problems", params.id);
    const docSnap = await getDoc(docRef);

    setProblem(docSnap.data());
    if (problem) {
      setTimer(problem.timeLimit * 60);
    }
  };
  useEffect(() => {
    getSingleDoc();
  });
  const handelSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Want to submit this solution",
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
          await addDoc(collection(db, "exam"), {
            problemId: params.id,
            studentId: user.uid,
            title: problem.problemTitle,
            problemDes: problem.problemDes,
            solution: solution,
            isSolved: false,
            marks: problem.marks,
            outOfMark: 0,
            createdAt: Timestamp.now(),
          });
          setOpen(false);
          Swal.fire(
            "Success",
            "This solution has been submitted successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              e.target.reset();
              router.push("/user-account/problem-solving");
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
        <h3>
          Remaining Time:
          <CountdownCircleTimer
            size={50}
            isPlaying
            strokeWidth={5}
            duration={timer}
            colors="#E65100"
            onComplete={() => router.push("/user-account/problem-solving")}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </h3>
        <Divider />
        <h4>{problem ? problem.problemTitle : null}</h4>
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
        </Box>{" "}
        <br />
        <strong style={{ color: "green" }}>
          Marks: {problem ? problem.marks : null}
        </strong>
        <br /> <p>Solve This Problem: </p>
        <Stack spacing={2} component="form" onSubmit={handelSubmit}>
          <TextField
            fullWidth
            placeholder="Write solution here..."
            multiline
            minRows={7}
            required
            variant="outlined"
            onChange={(e) => {
              setSolution(e.target.value);
            }}
          />
          <ButtonSpacer>
            <Button
              type="button"
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                router.push("/user-account/problem-solving/");
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
