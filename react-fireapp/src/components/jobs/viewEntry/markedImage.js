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
            {props.otherMarkedEntries && props.otherMarkedEntries
              .map(entry => {
                return entry.hasOwnProperty("selectedMarkedImage")
                  ? <Marker key={entry.id} position={entry.selectedMarkedImage.position} blackMarker/>
                  : null
              })
            }
            {props.markerPosition && <Marker position={props.markerPosition}/>}
        </div>
        : <Spinner />
      }
    </div>
  )
};