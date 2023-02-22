import React, { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const MovieAverage = ({ selectMovie }: any) => {
  console.log(selectMovie);
  const [starAverage, setStarAverage] = useState([
    <BsStar />,
    <BsStar />,
    <BsStar />,
    <BsStar />,
    <BsStar />,
  ]);

  const star = (average: number | undefined) => {
    const [first, second] = ((average / 10) * 5).toFixed(1).split('.');
    const averageCopy = [...starAverage];

    for (let i = 0; i < Number(first); i++) {
      averageCopy[i] = <BsStarFill size='20' color='#e22232' />;
    }
    if (Number(second) >= 5) {
      averageCopy[Number(first)] = <BsStarHalf size='20' color='#e22232' />;
    }
    setStarAverage(averageCopy);
  };
  return <div>{starAverage}</div>;
};

export default MovieAverage;
