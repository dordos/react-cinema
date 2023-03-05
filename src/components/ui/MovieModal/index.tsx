import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { AiOutlineCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getPickDB, setPickDB } from '../../../api/firebase';
import MovieAverage from '../../MovieAverage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { movieDetailType } from '../../../types/movieType';
import { API_KEY } from '../../../api/theMovieAPI';
import { async } from '@firebase/util';

const MovieModal = ({ movieId, closeModal }: any) => {
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtn = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current == e.target) closeModal();
  };

  //찜목록
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
  // const [movieDetailInfo, setMovieDetailInfo] = useState<movieDetailType | undefined>();
  const [heartState, setHeartState] = useState(false);

  const detailDB = async () => {
    const { data } = await axios.get(MOVIE_DETAIL);
    return data;
  };
  const { data: movieDetailInfo } = useQuery<movieDetailType>([`admins/${movieId}`], detailDB);

  const { mutate } = useMutation([`admins/${movieId}`], detailDB, {
    onMutate: (variables: boolean) => {
      console.log('onMutate', variables);
    },
    onError: (error, variables, context) => {
      // error
    },
    //업데이트 되면 get요청을 자동으로 진행 할 수 있음
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([`admins/${movieId}`]);
      console.log('success', data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      // end
    },
  });
  // mutate
  // console.log(movieDetailInfo);
  // const movieDetailFn = async (): Promise<movieDetailType> => {
  //   const { data } = await axios.get(MOVIE_DETAIL);
  //   return data.data;
  // };

  // const pickData = useMutation(heartState);
  // console.log(movieDetailInfo?.pick);
  // const { data: pick } = useQuery([`admins/${movieId}`], async () => {
  //   return await getPickDB(movieId);
  // },);
  // mutate(variables);
  function pickStateFn() {
    mutate(heartState);
    setHeartState(!heartState);
    // console.log(mutate());
    // console.log(movieDetailInfo);
    // console.log(!heartState);
    // setPickDB(movieId, movieDetailInfo, !heartState);
  }
  useEffect(() => {
    async function movieData() {
      // const response = await axios.get(MOVIE_DETAIL);
      // setMovieDetailInfo(response.data);
    }
    movieData();
  }, [heartState]);

  return (
    <div className='moviePreviewContainer' onClick={closeBtn} ref={modalRef}>
      <div className='previewContent'>
        <div className='previewLeft'>
          <Link to='/MovieDetail'>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetailInfo?.poster_path}`} alt='' />
          </Link>
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#a3a3a3' onClick={closeModal} />
          </div>
          <div className='previeTitle'>
            <Link to='/MovieDetail' state={{ movieDetailInfo }}>
              <h1>{movieDetailInfo?.title}</h1>
            </Link>
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{movieDetailInfo?.release_date}</span>
              <div>
                <MovieAverage
                  movieAverage={movieDetailInfo?.vote_average}
                  key={movieDetailInfo?.id}
                />
              </div>
            </div>

            <div className='overview'>
              <p>{movieDetailInfo?.overview}</p>
            </div>
            <div className='metaDataDetail'>
              <div>
                <p className='language'>
                  지원 언어 :
                  {movieDetailInfo?.spoken_languages.map((language, idx) => (
                    <span key={idx}>{language.iso_639_1}</span>
                  ))}
                </p>
                <p className='genres'>
                  장르 :
                  {movieDetailInfo?.genres.map((item, idx) => (
                    <span key={idx}>{item.name}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className='myPageInfo'>
              <button className='pickHeart' onClick={pickStateFn}>
                {heartState ? <AiFillHeart color='#f91f1f' /> : <AiOutlineHeart color='#e5e5e5' />}
              </button>

              <button>
                <BsCartPlus className='addcart' color='#e5e5e5' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
