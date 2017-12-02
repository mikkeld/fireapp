import React from 'react';

const markers = {
  marker: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/marker.png?alt=media&token=6311c4d8-58dd-4edf-838e-6b63b96ecb8f",
  blackMarker: "https://firebasestorage.googleapis.com/v0/b/fire-app-9c904.appspot.com/o/black_marker.png?alt=media&token=35d26f5b-66e5-4df7-8083-e286dbf078f8"
};

export const Marker = (props) => {
  const markerStyle = {
    position: 'absolute',
    display: 'block',
    left: props.position.pageX,
    top: props.position.pageY,
    maxHeight: 50,
    maxWidth: 50
  };
  const markerType = props.blackMarker ? markers.blackMarker : markers.marker;
  return (
    <img src={markerType} style={markerStyle}/>
  )
};



