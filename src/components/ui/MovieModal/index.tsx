import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { AiOutlineCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import MovieAverage from '../../MovieAverage';
import { movieDetailType } from '../../../types/movieType';
import { API_KEY } from '../../../api/theMovieAPI';
import { get, ref } from 'firebase/database';
import { currentUser, database, setPickDB } from '../../../api/firebase';

const MovieModal = ({ movieId, closeModal, movieInfo }: movieDetailType | any) => {
  const [detailData, setDetailData] = useState<movieDetailType>();
  const [heart, setHeart] = useState<boolean | undefined>();
  if (detailData != movieInfo) {
    setDetailData(movieInfo);
    setHeart(movieInfo.userMovieState.pick);
  }
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtn = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current == e.target) closeModal();
  };

  //찜목록
  const MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

  // const [movieDetailInfo, setMovieDetailInfo] = useState<movieDetailType | undefined>();
  // console.log(movieDetail);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      const newData = await axios.get(MOVIE_DETAIL);
      const movieRef = ref(database, `admins/${currentUser}/${movieId}`);
      // get(movieRef).then((snapshot) => {
      //   if (!snapshot.exists()) {
      //     axios.get(MOVIE_DETAIL).then((response) => {
      //       console.log(response.data);
      //       setPickDB(movieId, response.data, false);
      //     });
      //     setMovieDetail({ ...snapshot.val(), userMovieState: { pick: false } });
      //     console.log(snapshot.val());
      //   }
      // });
      fetchMovieInfo();
    };

    // // onValue(movieRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     setMovieDetail({ ...data, userMovieState: { pick: false } });
    //     console.log(data.userMovieState.pick);
    //   } else {
    //   }
    // });
    // const fetchMovieDetail = async () => {
    // const { data } = await axios.get(MOVIE_DETAIL);
    // setMovieDetail(data);
    // getPickDB(movieId).then((state) => {
    //   if (state) {
    //     console.log('22');
    //     setPickDB(movieId, data, state);
    //     setMovieDetail({ ...data, userMovieState: { pick: false } });
    //   } else {
    //     setPickDB(movieId, data, state);
    //     setMovieDetail({ ...data, userMovieState: { pick: false } });
    //     console.log({ ...data, userMovieState: { pick: false } });
    //   }
    // });
    // };
    // fetchMovieDetail();
  }, [movieId, heart]);

  // const detailDB = async () => {
  //   const { data } = await axios.get(MOVIE_DETAIL);
  //   const dd = getPickDB(movieId);
  //   console.log(dd);
  //   return data;
  // };
  // const { data: movieDetailInfo } = useQuery<movieDetailType>({
  //   queryKey: [`admins/${movieId}`],
  //   queryFn: detailDB,
  //   // enabled:
  // });

  // const { mutate: setPick } = useMutation({
  //   mutationFn: detailDB,
  //   onMutate: (variables: boolean) => {
  //     // queryClient.setQueryData([`admins/${movieId}`], (oldData: any) => {
  //     //   oldData.userMovieState = {
  //     //     pick: variables,
  //     //   };
  //     // });
  //   },
  //   onSuccess: (data, context) => {
  //     console.log(context);
  //     queryClient.setQueryData([`admins/${movieId}`], (oldData: any) => {
  //       oldData.userMovieState = {
  //         pick: context,
  //       };
  //     });
  //   },
  // });

  // oldData
  // ? {
  //     ...oldData,
  //     pick: variables,
  //   }
  // : console.log(oldData)

  // const { mutate: pickState } = useMutation({
  // mutationFn: detailDB,
  // onMutate: async (variables: boolean) => {
  //query 취소
  // await queryClient.cancelQueries([`admins/${movieId}`]);
  //기존 쿼리 반환
  // const previousValue: movieDetailType | undefined = queryClient.getQueryData([
  //   `admins/${movieId}`,
  // ]);

  // queryClient.setQueryData([`admins/${movieId}`], (oldData: any) =>
  //   oldData
  //     ? {
  //         ...oldData,
  //         wefwef: 'weifiwjef',
  //         pick: variables,
  //       }
  //     : oldData
  // );
  // console.log(previousValue);
  // return { previousValue };
  // },

  //에러시 롤백
  // onError: (error, variables, context) => {
  //   console.log(error);
  //   if (context?.previousValue) {
  //     queryClient.setQueryData([`admins/${movieId}`], context.previousValue);
  //   }
  // },
  // onSuccess: (data, variables, context) => {
  // console.log(data);
  // console.log(context);
  // queryClient.invalidateQueries([`admins/${movieId}`], context?.previousValue);
  // queryClient.invalidateQueries(context);
  // setPickDB(movieId, data, variables);
  // },
  //mutaion이 완료되면 성공 유무 상관없이 쿼리를 무효화 시키고 새로 갱신
  // onSettled: (data, error, variables, context) => {
  //   console.log(data);
  //   queryClient.invalidateQueries([`admins/${movieId}`]);
  // },
  // });
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
    console.log(!heart);
    setPickDB(movieId, detailData, !heart);
    // console.log(!heart);
    // console.log(!detailData?.userMovieState.pick);
    // setPickDB()
    // console.log(movieDetail?.userMovieState.pick);
    // setPickDB();
    // pickMutate.
    //  (!heartState);
    // console.log(!heartState);
    // console.log(movieDetailInfo);
    // setPickDB(movieId, movieDetailInfo, !heartState);
    // setHeartState(!heartState);
    // console.log(mutate());
    // console.log(movieDetailInfo);
    // console.log(!heartState);
    // setPickDB(movieId, movieDetailInfo, !heartState);
  }
  // movieDetail ?
  return (
    <div className='moviePreviewContainer' onClick={closeBtn} ref={modalRef}>
      <div className='previewContent'>
        <div className='previewLeft'>
          <Link to='/MovieDetail'>
            <img src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`} alt='' />
          </Link>
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#a3a3a3' onClick={closeModal} />
          </div>
          <div className='previeTitle'>
            <Link to='/MovieDetail' state={{}}>
              <h1>{detailData?.title}</h1>
            </Link>
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{detailData?.release_date}</span>
              <div>
                <MovieAverage movieAverage={detailData?.vote_average} key={detailData?.id} />
              </div>
            </div>

            <div className='overview'>
              <p>{detailData?.overview}</p>
            </div>
            <div className='metaDataDetail'>
              <div>
                <p className='language'>
                  지원 언어 :
                  {detailData?.spoken_languages.map((language, idx) => (
                    <span key={idx}>{language.iso_639_1}</span>
                  ))}
                </p>
                <p className='genres'>
                  장르 :
                  {detailData?.genres.map((item, idx) => (
                    <span key={idx}>{item.name}</span>
                  ))}
                </p>
              </div>
            </div>
            <div className='myPageInfo'>
              <button className='pickHeart' onClick={pickStateFn}>
                {heart ? <AiFillHeart color='#f91f1f' /> : <AiOutlineHeart color='#e5e5e5' />}
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
