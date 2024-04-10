import { baseImgUrl } from '@lib/constsnts'
import { Movie } from '@lib/types'
import React from 'react'

const HeroCard = ({ trendingMovie }: { trendingMovie : Movie }) => {
  return (
    <div className='hero'>
      <div className='hero-bg'>
        <img src={`${baseImgUrl}${trendingMovie?.backdrop_path || trendingMovie?.poster_path}`}/>
      </div>
    </div>
  )
}

export default HeroCard