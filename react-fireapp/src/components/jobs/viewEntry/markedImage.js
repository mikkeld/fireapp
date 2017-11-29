import React from 'react';
import Spinner from '../../shared/spinner';
import {Marker} from "./marker";

export const MarkedImage = (props) => {
  return (
    <div style={{position: 'relative'}}>
      <img
        src={props.attachment.url}
        onClick={props.setMarker && props.setMarker}
        onLoad={() => props.handleImageLoaded()}
      />
      {props.imageLoaded
        ? <div>
            {props.markerPosition && <Marker position={props.markerPosition}/>}
          {props.otherMarkedEntries && props.otherMarkedEntries
            .map((entry, index) => <Marker key={entry.id} position={entry.selectedMarkedImage.position} blackMarker/>)}
          </div>
        : <Spinner />
      }
    </div>
  )
};