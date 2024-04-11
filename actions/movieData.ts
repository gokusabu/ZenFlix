import { getApiResponse } from "@lib/requests";

export const fetchTrending = async () => {
  const data = await getApiResponse("/trending/movie/week");
  const trending = data.results;

  return trending;
};

export const fetchGenreMovie = async () => {
  //first we fetch the genre list using the '/genre/movie/list' which have 2 properties 
//   id and genre number then we fetch all movies from main database and add the array of 
//   that movie list to the result of fetching '/genre/movie/list' by creating a new property to 
//   movies among id and genre number using for of loop

  const data = await getApiResponse("/genre/movie/list");
  const genres = data.genres;

  for (const genre of genres) {
    const data = await getApiResponse(
      `/discover/movie?with_genres=${genre.id}`
    );

    genre.movies = data.results; 
  }
  return genres
};
