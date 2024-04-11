"use client"
import { baseImgUrl } from "@lib/constsnts";
import { Movie } from "@lib/types";
import { InfoOutlined, PlayCircleOutline, PlayCircleOutlineOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import Modal from "./Modal";

const HeroCard = ({ trendingMovie }: { trendingMovie: Movie }) => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
    <div className="hero">
      <div className="hero-bg">
        <img
          src={`${baseImgUrl}${
            trendingMovie?.backdrop_path || trendingMovie?.poster_path
          }`}
          className="hero-bg-image"
          alt="movie poster"
        />
        <div className="overlay"></div>
      </div>
      <h2 className="hero-title">{trendingMovie?.title || trendingMovie.name}</h2>
      <p className="hero-overview">{trendingMovie?.overview}</p>

      <div className="hero-btns">
        <button className="hero-btn" onClick={openModal}><PlayCircleOutlineOutlined/>Play Now</button>
        <button className="hero-btn" onClick={openModal}><InfoOutlined/>More Info</button>
      </div>
    </div>

    {showModal && <Modal movie={trendingMovie} closeModal={closeModal}/>}
    </>
  );
};

export default HeroCard;
