import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Button from "@mui/material/Button";
import { API } from './global';

export default function Get({ list , getData}) {


    const navigate = useNavigate()

    const deleteMovie = async (id) => {
     
            let ask = window.confirm("This Data will delete")
            if (ask){
             
                let resDelete =await fetch(`${API}/delete/${id}`,{
                  method: "DELETE"
                })
                .then(()=> getData())
                console.log(resDelete)        
            }
    };

    return (
        <Card  className="movie-container">
            <img className="movie-poster" src={list.poster} />

          <h5 className='card-name'>{list.name} </h5>
<div className="button">
<IconButton
                  sx={{ marginLeft: "auto" }}
                  aria-label="editMovie"
                  onClick={() => navigate(`/single-get/${list._id}`)}
                >
                  <VisibilityIcon color="primary" />
                </IconButton>

<IconButton
                  sx={{ marginLeft: "auto" }}
                  aria-label="editMovie"
                  onClick={() => navigate(`/update/${list._id}`)}
                >
                  <EditIcon color="secondary" />
                </IconButton>

                <IconButton
                  sx={{ marginLeft: "auto" }}
                  aria-label="delete"
                  onClick={() => deleteMovie(list._id)}>
                  <DeleteIcon color="error" />
                </IconButton>


</div>

        </Card >
    )
}