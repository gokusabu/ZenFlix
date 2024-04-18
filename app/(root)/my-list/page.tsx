import { fetchMovieDetails } from '@actions/movieData'
import { fetchMyList } from '@actions/user'
import MovieCard from '@components/MovieCard'
import Navbar from '@components/Navbar'
import { Movie } from '@lib/types'
import React from 'react'

const MyList = async() => {
  const MyList = await fetchMyList()

  const MyListDetails = await Promise.all(
    MyList.map( async(movieId:number)=>{
      const movieDetails = await fetchMovieDetails(movieId)
      return movieDetails
    })
  )
  return (
    <div>
      <Navbar/>
      <div className='list'>
        {MyListDetails.map((movie : Movie)=>(
          <MovieCard key={movie.id} movie={movie}/>
        ))}

      </div>
    </div>
  )
}

export default MyList