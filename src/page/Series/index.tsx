import axios from 'axios';
import { get, ref } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import { addSeriesDetailDefault, currentUser, database } from '../../api/firebase';
import MenuBar from '../../components/ui/MenuBar';
import SeriesModal from '../../components/ui/SeriesModal';
import { seriesType } from '../../types/seriesType';
import './style.scss';

const Series = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const [seriesModalState, setSeriesModalState] = useState(false);
  const closeModal = () => setSeriesModalState(false);

  const [seriesId, setSeriesId] = useState<number | undefined>();
  const [modalDetail, setModalDetail] = useState<seriesType | undefined>();

  //page reload
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState<seriesType[]>([]);
  const observer = useRef<IntersectionObserver>();
  const nowDateFn = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    return `${todayYear}-${todayMonth}-${todayDate}`;
  };

  const onSeriesDetail = (selectId: number) => {
    const MOVIE_DETAIL = `https://api.themoviedb.org/3/tv/${selectId}?api_key=${API_KEY}&language=en-US`;
    setSeriesModalState(!seriesModalState);
    setSeriesId(selectId);

    const seriesRef = ref(database, `admins/${currentUser}/${selectId}`);
    get(seriesRef).then((snapshot) => {
      if (snapshot.exists()) {
        //데이터가 있으면
        setModalDetail(snapshot.val());
      } else {
        //없으면

        axios.get(MOVIE_DETAIL).then((response) => {
          const obj = {
            ...response.data,
            userSeriesState: {
              pick: false,
              cartState: false,
              count: 0,
              startDate: nowDateFn(),
              endDate: nowDateFn(),
            },
          };
          setModalDetail(obj);
          addSeriesDetailDefault(selectId, obj);
        });
      }
    });
  };

  const getSeries = async (page: number) => {
    const SERIES_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;

    const getData = await axios.get(SERIES_URL);
    const fillterData = getData.data.results.filter((el: seriesType) => el.poster_path !== null);
    setSeries((prev) => [...prev, ...fillterData]);
  };

  const pageCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getSeries(page);
  }, [page]);

  useEffect(() => {
    observer.current = new IntersectionObserver(pageCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    return () => {
      observer.current?.disconnect();
    };
  });

  useEffect(() => {
    if (observer.current) {
      const pageRef = document.querySelector('#pageLoading');
      pageRef && observer.current.observe(pageRef);
    }
  }, [series]);
  return (
    <>
      <MenuBar />
      <ul className='seriesContainer'>
        {series?.map((series: any) => (
          <li
            key={series.id}
            onClick={() => {
              onSeriesDetail(series.id);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} alt='' />
          </li>
        ))}
      </ul>
      {seriesModalState && (
        <SeriesModal seriesId={seriesId} modalDetail={modalDetail} closeModal={closeModal} />
      )}
      <div id='pageLoading'></div>
    </>
  );
};

export default Series;
