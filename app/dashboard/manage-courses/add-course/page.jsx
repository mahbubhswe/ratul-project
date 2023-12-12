"use client";
import React, { useState, useMemo } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import FileBase64 from "react-file-base64";
import Stack from "@mui/material/Stack";
import { TextField, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonSpacer from "@/app/components/buttonSpacer";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { collection, addDoc } from "firebase/firestore";
import Image from "next/image";
export default function AddCourse() {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          ["link", "image", "video"],
          ["clean"],
        ],

        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
    }),
    []
  );
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [courseTitle, setCourseTitle] = React.useState();
  const [coverPhoto, setCoverPhoto] = React.useState();
  const [coursePrice, setCoursePrice] = React.useState(0);
  const [courseDes, setCourseDes] = React.useState();
  const [courseModule, setCourseModule] = React.useState();
  const handelSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Want to add this course",
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
          await addDoc(collection(db, "courses"), {
            courseTitle: courseTitle,
            coverPhoto: coverPhoto,
            courseModule: courseModule,
            coursePrice: Number(coursePrice.toString()),
            courseDes: courseDes,
          });
          setOpen(false);
          Swal.fire(
            "Success",
            "This course added successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              setCoverPhoto();
              setCourseModule();
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
        {coverPhoto ? (
          <Image src={coverPhoto} height={200} width={200} quality={1} />
        ) : (
          <p
            style={{
              height: "200px",
              width: "200px",
              border: "1px dashed grey",
              borderRadius: "4px",
              display: "grid",
              placeContent: "center",
              color: "grey",
            }}
          >
            Select cover photo
          </p>
        )}
        <FileBase64 onDone={(data) => setCoverPhoto(data.base64)} />
        <TextField
          label="Enter title"
          type="text"
          placeholder="Enter course title"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setCourseTitle(e.target.value);
          }}
        />{" "}
        <TextField
          label="Enter price"
          type="number"
          placeholder="Enter course price"
          size="small"
          required
          fullWidth
          name="name"
          color="secondary"
          onChange={(e) => {
            setCoursePrice(e.target.value);
          }}
        />
        <TextField
          label="Write description"
          type="text"
          placeholder="Write description"
          size="small"
          required
          fullWidth
          multiline
          minRows={4}
          name="name"
          color="secondary"
          onChange={(e) => {
            setCourseDes(e.target.value);
          }}
        />{" "}
        <Typography>Course module</Typography>
        <ReactQuill
          value={courseModule}
          modules={modules}
          onChange={setCourseModule}
        />
        <ButtonSpacer>
          <Button
            type="button"
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              router.push("/dashboard/manage-courses/");
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
