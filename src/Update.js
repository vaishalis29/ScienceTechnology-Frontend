import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";


export default function Update() {
 
  const navigate = useNavigate();

  const { id } = useParams()

  const [editMovie, setEditMovie] = useState()

  useEffect(() => {
    fetch(`${API}/get/${id}`, {
      method: "GET"
    })
      .then((data) => data.json())
      .then((mv) => setEditMovie(mv))
  }, [])

  return (
    <div>

      {editMovie ? <UpdateForm movie={editMovie} setMovie={setEditMovie} /> : "Loading....."}

    </div>

  );
}


function UpdateForm({ movie, setMovie }) {

  const editMovieValidationSchema = yup.object({
    name: yup.string().required(),
    trailer: yup.string().required(),
    poster: yup.string().required(),
    rating: yup.string().required(),
    summary: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: movie.name,
      trailer: movie.trailer,
      poster: movie.poster,
      rating: movie.rating,
      summary: movie.summary,
    },

    validationSchema: editMovieValidationSchema,

    onSubmit: (values) => {
      console.log(" EditMovie :", values);
      editMoviePut(values)
    },
  });

  const navigate = useNavigate()

  const editMoviePut = (values) => {
    fetch(`${API}/update/${movie._id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((data) => data.json())
      .then(() => navigate("/get"))
  }

  return (
    <form className="updateform-container" onSubmit={formik.handleSubmit}>
      <TextField
        value={formik.values.name}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={formik.handleChange}
        name="name"
        error={formik.touched.name && formik.errors.name}
        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
        onBlur={formik.handleBlur}
      />


      <TextField
        value={formik.values.poster}
        id="outlined-basic"
        label="Image"
        variant="outlined"
        onChange={formik.handleChange}
        name="poster"
        error={formik.touched.poster && formik.errors.poster}
        helperText={formik.touched.poster && formik.errors.poster ? formik.errors.poster : null}
        onBlur={formik.handleBlur}
      />

      <TextField
        value={formik.values.trailer}
        id="outlined-basic"
        label="News"
        variant="outlined"
        onChange={formik.handleChange}
        name="trailer"
        error={formik.touched.trailer && formik.errors.trailer}
        helperText={formik.touched.trailer && formik.errors.trailer ? formik.errors.trailer : null}
        onBlur={formik.handleBlur}
      />

      <TextField
        value={formik.values.rating}
        id="outlined-basic"
        label="Technology"
        variant="outlined"
        onChange={formik.handleChange}
        name="rating"
        error={formik.touched.rating && formik.errors.rating}
        helperText={formik.touched.rating && formik.errors.rating ? formik.errors.rating : null}
        onBlur={formik.handleBlur}
      />


      <TextField
        value={formik.values.summary}
        id="outlined-basic"
        label="Contact"
        variant="outlined"
        onChange={formik.handleChange}
        name="summary"
        error={formik.touched.summary && formik.errors.summary}
        helperText={formik.touched.summary && formik.errors.summary ? formik.errors.summary : null}
        onBlur={formik.handleBlur}
      />


      <Button variant="contained" type="submit">
        Update
      </Button>
    </form>
  )
}
