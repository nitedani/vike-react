import React, { useTransition } from 'react'
import { MovieDetails } from './types'
import { suspense, useSuspenseQuery } from 'vike-react-query'
import { navigate } from 'vike/client/router'

export { Movies }

const Movies = suspense(
  () => {
    const result = useSuspenseQuery({
      queryKey: ['key'],
      queryFn: getStarWarsMovies,
      retry: false
    })

    const movies = result.data

    const onNavigate = (id: string) => {
      navigate(`/${id}`)
    }

    return (
      <>
        <h1>Star Wars Movies</h1>
        <ol>
          {movies.map(({ id, title, release_date }) => (
            <li key={id}>
              <button onClick={() => onNavigate(id)}>{title}</button> ({release_date})
            </li>
          ))}
        </ol>
        <p>
          Source: <a href="https://star-wars.brillout.com">star-wars.brillout.com</a>.
        </p>
      </>
    )
  },
  () => 'Loading'
)

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
