import React, { useMemo } from 'react';
import Card from '../style/card.module.scss';

const Stars = ({index, card}) => {

  const fillStars = useMemo(()=>{
    if(card?.star >= index) {
      return "#156015"
    }
    return "#dbdbdb"
  },[card, index])

  return(
    <div className={Card.starrate}>
      <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={fillStars}>
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
				</svg>
    </div>   
  )}

export default Stars;