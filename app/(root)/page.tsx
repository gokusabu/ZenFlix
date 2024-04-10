import { fetchGenreMovie } from '@actions/movieData'
import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import React from 'react'

const Home = async() => {
  const genres = await fetchGenreMovie()
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='all-movies'>
        {/* {genres.map((genre)=>(
          
        ))} */}

      </div>
    </div>
  )
}

export default Home