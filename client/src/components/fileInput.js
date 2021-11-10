import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this);
  }

  API_ENDPOINT = 'http://localhost:5000/thumbnail';

  blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      // debugger;
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.onabort = () => reject(new Error("Read aborted"));
      reader.readAsDataURL(blob);
    });
  }

  uploadFile(event) {
    let file = event.target.files[0];
    console.log(file);

    if (file) {
      let data = new FormData();
      data.append('video', file);
      const res = fetch(this.API_ENDPOINT, { // res is a promise of the API response
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          // 'Content-Type': 'multipart/form-data'
        },
        body: data
      })
        .then((res) => {
          console.log(`Success: ${res}`)
          return res.blob();
        })
        .then((thumbnailBlob) => {
          return this.blobToDataURL(thumbnailBlob);
        })
        .then((thumbnail) => {
          this.props.updateThumbnail(thumbnail);
        })
        .catch((res) => {
          console.log(`Error: ${res}`)
          // debugger;
        });
    }
  }

  render() {
    return (
      <form>
        <label>Upload file:</label><br />
        <input type="file" onChange={this.uploadFile} />
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);

export default FileInput;