import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileInput from './components/fileInput';

class App extends Component {
  state = {
    data: null,
    thumbnail: null
  };

  updateThumbnail(newThumbnail) {
    this.setState({
      thumbnail: newThumbnail
    })
  }

  componentDidMount() {
    // this.callBackendAPI()
    //   .then(res => this.setState({ data: res.express }))
    //   .catch(err => console.log(err));
  }
  // fetching the GET route from the Express server which matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return body;
  // };

  render() {
    return (
      <div className="App">
        <FileInput updateThumbnail={this.updateThumbnail.bind(this)} />
        <img src={this.state.thumbnail} />
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;