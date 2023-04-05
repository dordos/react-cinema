import axios from 'axios';
import { useEffect, useState } from 'react';
import { movieImg } from '../../../types/movieType';

const ImagePreview = ({ movieId }: any) => {
  const MOVIE_IMG = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  const [images, setImages] = useState<movieImg>();

  useEffect(() => {
    async function movieImage() {
      const response = await axios.get(MOVIE_IMG);
      setImages(response.data);
    }
    movieImage();
  }, []);

  return (
    <ul>
      {images?.backdrops.map((item: any, idx) => (
        <li key={idx}>
          <img src={`https://image.tmdb.org/t/p/w500/${item?.file_path}`} alt='' />
        </li>
      ))}
    </ul>
  );
};

export default ImagePreview;
