import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import {Marker} from "./marker";

export const MarkedImage = (props) => {
  return (
    <div>
      {props.imageLoaded
        ? null
        : <CircularProgress />
      }
      <div style={{position: 'relative'}}>
        <img
          src={props.attachment.url}
          onClick={props.setMarker && props.setMarker}
          onLoad={() => props.handleImageLoaded()}
        />
        {props.markerPosition && <Marker position={props.markerPosition}/>}
      </div>
    </div>
  )

};