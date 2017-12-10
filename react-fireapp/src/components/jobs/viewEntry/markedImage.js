import React, { Component } from 'react';
import Spinner from '../../shared/spinner';
import {Marker} from "./marker";
import PropTypes from 'prop-types';

export class MarkedImage extends Component {
  constructor() {
    super();
    this.state = {
      imageLoaded: false
    };
    this.setMarker = this.setMarker.bind(this);
  }

  setMarker(e) {
    const dim = e.target.getBoundingClientRect();
    const position = {
      'pageX': e.pageX - dim.left -25,
      'pageY': e.pageY - dim.top - 50
    };
    this.props.onMarkedPositionUpdate(position);
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <img
          src={this.props.attachment.url}
          onClick={this.props.isEditing ? this.setMarker : null}
          onLoad={() => this.setState({imageLoaded: true})}
        />
        {this.state.imageLoaded
          ? <div>
            {this.props.otherMarkedEntries && this.props.otherMarkedEntries
              .map(entry => {
                return entry.hasOwnProperty("selectedMarkedImage")
                  ? <Marker key={entry.id} position={entry.selectedMarkedImage.position} blackMarker/>
                  : null
              })
            }
            {this.props.markerPosition && <Marker position={this.props.markerPosition}/>}
          </div>
          : <Spinner/>
        }
      </div>
    )
  }
}

MarkedImage.propTypes = {
  attachment: PropTypes.object.isRequired,
  markerPosition: PropTypes.object,
  otherMarkedEntries: PropTypes.array,
  setMarker: PropTypes.func
};