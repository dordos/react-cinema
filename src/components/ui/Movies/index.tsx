import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../api/theMovieAPI';
import MovieModal from '../MovieModal';
import './style.scss';

const Movies = () => {
  const [movieModalState, setMovieModalState] = useState(false);
  const [movieId, setMovieId] = useState<number | undefined>();
  const [movieInfo, setMovieInfo] = useState([]);
  // const { isLoading, error, data } = useQuery(['movies'], MoviesInfo);

  const onMovieDetail = (selectId: undefined | number) => {
    setMovieModalState(!movieModalState);
    setMovieId(selectId);
  };

  const closeModal = () => setMovieModalState(false);
  useEffect(() => {
    async function movieData() {
      const response = await axios.get(API_URL);
      setMovieInfo(response.data.results);
    }
    movieData();
  }, []);

  return (
    <>
      <ul className='moviesContainer'>
        {movieInfo.map((movie: any) => (
          <li
            key={movie.id}
            onClick={() => {
              onMovieDetail(movie.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
          </li>
        ))}
      </ul>
      {movieModalState && (
        <MovieModal movieId={movieId} closeModal={closeModal} movieInfo={movieInfo} />
      )}
    </>
  );
};

export default Movies;
