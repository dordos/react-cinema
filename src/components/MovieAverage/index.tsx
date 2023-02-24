import React, { useEffect, useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const MovieAverage = ({ movieAverage }: any): JSX.Element => {
  const [starAverage, setStarAverage] = useState([
    <BsStar />,
    <BsStar />,
    <BsStar />,
    <BsStar />,
    <BsStar />,
  ]);

  const star = (average: number) => {
    // console.log(average);
    const [first, second] = ((average / 10) * 5).toFixed(1).split('.');
    const averageCopy = [...starAverage];
    for (let i = 0; i < Number(first); i++) {
      averageCopy[i] = <BsStarFill size='20' color='#e22232' />;
    }
    if (Number(second) >= 5) {
      averageCopy[Number(first)] = <BsStarHalf size='20' color='#e22232' />;
    }
    return setStarAverage(averageCopy);
  };

  useEffect(() => {
    star(movieAverage);
  }, [movieAverage]);

  return (
    <React.Fragment>
      {starAverage.map((item, idx) => (
        <React.Fragment key={idx}>{item}</React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default MovieAverage;
