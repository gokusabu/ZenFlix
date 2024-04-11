import { baseImgUrl } from '@lib/constsnts'
import { Movie } from '@lib/types'
import React from 'react'

const MovieCard = ({movie} : {movie:Movie}) => {
  return (
    <div className='movie-card'>
      <img src={`${baseImgUrl}${
            movie?.backdrop_path || movie?.poster_path
          }`} className='thumpnail' alt={movie?.title || movie?.name}/>
          <div className='border'></div>
    </div>
  )
}

export default MovieCard