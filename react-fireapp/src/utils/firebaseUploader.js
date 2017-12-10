import React, { Component }  from 'react';
import FileUploader from 'react-firebase-file-uploader';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { CircularProgress } from 'material-ui/Progress';
import {generateFilename} from "./utils";

export class FirebaseUploader extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  handleUploadStart = () => this.setState({loading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({loading: false});
    console.error(error);
  };
  handleUploadSuccess = (filename) => {
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
      const getNameString = (f) => f.substring(0,f.lastIndexOf("_"))+f.substring(f.lastIndexOf("."));
      const uploadedFile = {"name": getNameString(filename), "url": url};
      this.props.onFileUploadSuccess(uploadedFile);
      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <div>
        <FileUploader
          accept="image/*"
          name="image"
          filename={file => generateFilename(file)}
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
        {
          this.state.loading
            ? <CircularProgress/>
            : null
        }
      </div>
    )
  }
}

FirebaseUploader.propTypes = {
  onFileUploadSuccess: PropTypes.func.isRequired
};