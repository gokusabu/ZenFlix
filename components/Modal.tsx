"use client";
import { Genre, Movie, Video } from "@lib/types";
import { AddCircle, CancelRounded, RemoveCircle } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  movie: Movie;
  closeModal: () => void;
}

interface user {
  username: string;
  email: string;
  favorites: number[];
}

const Modal = ({ movie, closeModal }: Props) => {
  const [video, setVideo] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isFavorite,setIsFavorite] = useState(false)

  const { data: session } = useSession();

  console.log("session", session);

  const getUser = async () => {
    try{
      const response = await fetch(`/api/user/${session?.user?.email}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
      setIsFavorite(data.favorites.find((item:number)=> item === movie.id))
    }catch(err){
      console.log("Error fetching data",err);
    }
  };

  useEffect(()=>{
    if(session)
    getUser()
  },[session])

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const getMovieDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${movie.id}?append_to_response=videos`,
        options
      );
      const data = await response.json();
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (video: Video) => video.type === "Trailer"
        );
        setVideo(data.videos.results[index].key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (err) {
      console.log("error fetchinhg movie details", err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [movie]);
  return (
    <div className="modal">
      <button className="modal-close">
        <CancelRounded
          sx={{ color: "white", fontSize: "35px", ":hover": { color: "red" } }}
          onClick={closeModal}
        />
      </button>
      <iframe
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`}
        className="modal-video"
        loading="lazy"
        allowFullScreen
      />
      <div className="modal-content">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <p className="text-base-bold">Name:</p>
            <p className="text-base-light">{movie?.title || movie?.name}</p>
          </div>
          <div className="flex gap-3">
            <p className="text-base-bold">Add to List</p>
            {isFavorite ? (
              <RemoveCircle className="cursor-pointer text-pink-1"/>
            ):(
              <AddCircle className="cursor-pointer text-pink-1" />
            )}
            
          </div>
        </div>
        <div className="flex-gap-2">
          <p className="text-base-bold">Release Date:</p>
          <p className="text-base-light">{movie?.release_date}</p>
        </div>
        <p className="text-base-light">{movie?.overview}</p>
        <div className="flex gap-2">
          <p className="text-base-bold">Rating:</p>
          <p className="text-base-light">{movie?.vote_average}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-base-bold">Genres:</p>
          <p className="text-base-light">
            {genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
