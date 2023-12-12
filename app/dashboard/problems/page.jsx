"use client";
import { db } from "../../firebase";
import Swal from "sweetalert2";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  query,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Stack,
  ButtonGroup,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
export default function Problems() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [problemTitle, setProblemTitle] = useState();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "problems");
    const q = problemTitle
      ? query(collectionRef, where("problemTitle", "<=", problemTitle))
      : query(collectionRef);
    onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setProblems(postsArray);
    });
  }, [problemTitle]);
  const columns = [
    {
      field: "problemTitle",
      headerName: "Title",
      width: 100,
    },
    {
      field: "timeLimit",
      headerName: "Time(m)",
      width: 20,
    },
    {
      field: "marks",
      headerName: "Marks",
      width: 50,
    },
    {
      field: "problemDes",
      headerName: "Descriptions",
      width: 500,
    },
    {
      field: "id",
      headerName: "Action",
      width: "100",
      renderCell: (params) => {
        return (
          <ButtonGroup>
            <IconButton
              variant="contained"
              color="secondary"
              onClick={() =>
                Swal.fire({
                  title: "Information",
                  text: "Sorry, this service not available",
                  icon: "info",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                })
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              variant="contained"
              color="error"
              onClick={() =>
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
                      await deleteDoc(doc(db, "problems", params.id));
                      setOpen(false);
                      Swal.fire(
                        "Success",
                        "This problem deleted successfully!",
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
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];
  return (
    <main>
      <h1>Problems List</h1>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={1}
        mb={1}
      >
        <TextField
          type="search"
          size="small"
          placeholder="Search by title..."
          fullWidth
          onChange={(e) => setProblemTitle(e.target.value)}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ width: "200px" }}
          onClick={() => router.push("/dashboard/problems/add-problem")}
        >
          Add new problem
        </Button>
      </Stack>

      <DataGrid
        rows={problems}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <Backdrop open={open}>
        <CircularProgress sx={{ color: "green" }} />
      </Backdrop>
    </main>
  );
}
