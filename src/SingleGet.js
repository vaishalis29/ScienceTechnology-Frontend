import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { API } from "./global";

export default function SingleGet() {
  const { id } = useParams();

  const [data, setData] = useState([])

  useEffect(()=>{
    fetch(`${API}/get/${id}`,{
      method:"GET"
    })
    .then((data)=> data.json())
    .then((mvs)=> setData(mvs))
  })


  const navigate = useNavigate()

  return (
    <div className="single-container">
      <img className="single-img" src={data.poster}/>

      <div className="movie-detail-container">
        <div className="movie-spec">
          <h2 className="movie-name">{data.name}</h2>
          <h3 className="movie-name">{data.trailer}</h3>
          <h4  className="movie-rating">  {data.rating}</h4>
        </div>

        <p className="movie-description">{data.summary}</p>

        <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={()=> navigate(-1)}>Back</Button>
      </div>

     

    </div>
  );
}
