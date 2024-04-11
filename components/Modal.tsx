"use client"
import { Movie, Video } from '@lib/types'
import React, { useEffect, useState } from 'react'

interface Props{
    movie:Movie;
    closeModal:() => void
}

const Modal = ({movie ,  closeModal}: Props) => {

  const [video,setVideo] = useState("")

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
        }
      };

      const getMovieDetails = async()=>{
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,options)
            const data = await response.json()
            if(data?.videos){
              const index = data.videos.results.findIndex((video : Video)=>video.type === "Trailer")
              setVideo(data.videos.results[index].key)
            }
        }catch(err){
            console.log("error fetchinhg movie details" , (err))
        }
      }
      
      useEffect(()=>{
        getMovieDetails()
      },[movie])
  return (
    <div>Modal</div>
  )
}

export default Modal