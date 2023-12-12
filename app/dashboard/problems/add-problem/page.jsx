"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonSpacer from "@/app/components/buttonSpacer";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
export default function AddProblem() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [problemTitle, setProblemTitle] = React.useState();
  const [timeLimit, setTimeLimit] = React.useState(0);
  const [marks, setmarks] = React.useState(0);
  const [problemDes, setProblemDes] = React.useState();
  const handelSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Want to add this problem",
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
          await addDoc(collection(db, "problems"), {
            problemTitle: problemTitle,
            marks: marks,
            timeLimit: Number(timeLimit.toString()),
            problemDes: problemDes,
          });
          setOpen(false);
          Swal.fire(
            "Success",
            "This problem added successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              e.target.reset();
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
    <React.Fragment>
      <Stack spacing={2} component="form" onSubmit={handelSubmit}>
        <TextField
          label="Enter title"
          type="text"
          placeholder="Enter problem's title"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setProblemTitle(e.target.value);
          }}
        />{" "}
        <TextField
          label="Enter time limit"
          type="number"
          placeholder="Give solving time limit in minutes"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setTimeLimit(e.target.value);
          }}
        />{" "}
        <TextField
          label="Enter marks"
          type="number"
          placeholder="How much"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setmarks(e.target.value);
          }}
        />
        <TextField
          label="Write description"
          type="text"
          placeholder="Write problem's description"
          size="small"
          required
          fullWidth
          multiline
          minRows={4}
          name="name"
          color="secondary"
          onChange={(e) => {
            setProblemDes(e.target.value);
          }}
        />
        <ButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              router.push("/dashboard/problems/");
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </ButtonSpacer>
      </Stack>
      <Backdrop open={open}>
        <CircularProgress sx={{ color: "green" }} />
      </Backdrop>
    </React.Fragment>
  );
}
