import React from 'react';
import marker from "../../assets/images/marker.png";

export const Marker = (props) => {
  const markerStyle = {
    position: 'absolute',
    display: 'block',
    left: props.position.pageX,
    top: props.position.pageY,
    maxHeight: 50,
    maxWidth: 50
  };

  return (
    <img src={marker} style={markerStyle}/>
  )
};



