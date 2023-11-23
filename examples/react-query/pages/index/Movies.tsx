import React from 'react'
import { MovieDetails } from './types'
import { useSuspenseQuery } from 'vike-react-query'
export { Movies }

function Movies() {
  const result = useSuspenseQuery({
    queryKey: ['key'],
    queryFn: getStarWarsMovies
  })

  const movies = result.data

  return (
    <>
      <h1>Star Wars Movies</h1>
      <ol>
        {movies.map(({ id, title, release_date }) => (
          <li key={id}>
            <a href={`/star-wars/${id}`}>{title}</a> ({release_date})
          </li>
        ))}
      </ol>
      <p>
        Source: <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
      </p>
    </>
  )
}
async function getStarWarsMovies(): Promise<MovieDetails[]> {
  await new Promise((r) => setTimeout(r, 1000))

  const response = await fetch('https://star-wars.brillout.com/api/films.json')
  let movies: MovieDetails[] = ((await response.json()) as any).results
  movies = movies.map((movie: MovieDetails, i: number) => ({
    ...movie,
    id: String(i + 1)
  }))
  return movies
}
