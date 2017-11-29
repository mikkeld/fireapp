import React from 'react';
import marker from "../../assets/images/marker.png";
import black_marker from "../../assets/images/black_marker.png";

export const Marker = (props) => {
  const markerStyle = {
    position: 'absolute',
    display: 'block',
    left: props.position.pageX,
    top: props.position.pageY,
    maxHeight: 50,
    maxWidth: 50
  };
  const markerType = props.blackMarker ? black_marker : marker;
  return (
    <img src={markerType} style={markerStyle}/>
  )
};



