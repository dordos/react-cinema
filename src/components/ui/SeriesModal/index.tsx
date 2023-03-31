import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { AiOutlineCloseCircle, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import MovieAverage from '../../MovieAverage';
import { seriesDetailType } from '../../../types/seriesType';
import { currentUser, database, setCart, setPickDB } from '../../../api/firebase';
import ModalCartAlert from '../../ModalCartAlert';
import { get, ref } from 'firebase/database';

const SeriesModal = ({ seriesId, closeModal, modalDetail }: seriesDetailType | any) => {
  const [detailData, setDetailData] = useState<seriesDetailType>();
  const [heart, setHeart] = useState<boolean | undefined>();
  const [cartAlert, setCartAlert] = useState(false);

  if (detailData != modalDetail) {
    setDetailData(modalDetail);
    setHeart(modalDetail.userseriesState.pick);
  }

  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtn = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current == e.target) closeModal();
  };

  function pickStateFn() {
    setHeart(!heart);
    setPickDB(seriesId, detailData, !heart);
  }

  function addCart() {
    setCartAlert(true);
    setTimeout(() => {
      setCartAlert(false);
    }, 2000);

    get(ref(database, `admins/${currentUser}/${seriesId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setCart(seriesId, detailData, snapshot.val().userseriesState);
      }
    });
  }

  useEffect(() => {}, [heart]);
  return (
    <div className='seriesPreviewContainer' onClick={closeBtn} ref={modalRef}>
      <div className='previewContent'>
        <div className='previewLeft'>
          <Link to='/seriesDetail' state={{ seriesId, modalDetail, setseriesDB: detailData }}>
            <img src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`} alt='' />
          </Link>
        </div>
        <div className='previewRight'>
          <div className='closeBtn'>
            <AiOutlineCloseCircle size='36' color='#a3a3a3' onClick={closeModal} />
          </div>
          <div className='previeTitle'>
            <Link to='/seriesDetail' state={{ seriesId, modalDetail, setseriesDB: detailData }}>
              <h1>{detailData?.title}</h1>
            </Link>
          </div>
          <div className='previewInfo'>
            <div className='metaData'>
              <span>{detailData?.release_date}</span>
              <div>
                <MovieAverage MovieAverage={detailData?.vote_average} key={detailData?.id} />
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
              {cartAlert && <ModalCartAlert />}
              <button className='cartBtn' onClick={addCart}>
                <BsCartPlus className='addcart' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesModal;
