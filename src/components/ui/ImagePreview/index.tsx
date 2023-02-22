import { async } from '@firebase/util';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

const ImagePreview = () => {
  type movieImgType = {
    backdrops: Array<{
      aspect_ratio: number;
      file_path: string;
      height: number;
      width: number;
    }>;
    posters: Array<{
      file_path: string;
      height: number;
      width: number;
    }>;
  };

  const MOVIE_IMG = `https://api.themoviedb.org/3/movie/${505642}/images?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

  const [images, setImages] = useState<movieImgType>();

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
