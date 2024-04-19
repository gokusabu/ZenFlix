import { fetchGenreMovie } from '@actions/movieData'
import CategoryList from '@components/CategoryList'
import Hero from '@components/Hero'
import Navbar from '@components/Navbar'
import { Genre } from '@lib/types'
import React from 'react'

const Home = async() => {
  const genres = await fetchGenreMovie()

  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='all-movies'>
        {genres.map((genre : Genre)=>(
          <CategoryList key={genre.id} title={genre.name} movies={genre.movies}/>
        ))}

      </div>
    </div>
  )
}

export default Home