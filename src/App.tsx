import React, { ChangeEvent, MouseEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import Hls from 'hls.js';

interface AppProps {

}

interface UrlAndParams {
  url: string,
  params: string
}
interface AppState {
  url: string,
  urlToPlay: string
}
export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: "",
      urlToPlay: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onPlayHandler = this.onPlayHandler.bind(this);
  }
  componentDidMount() {}

  componentDidUpdate(pp: AppProps, ps: AppState) {}


  private computeUrlAndParams(videoUrl: string): UrlAndParams {
    let index = videoUrl.indexOf('?');
    let url = videoUrl.substring(0, index);
    let params = videoUrl.substring(index);
    return { url, params };
  }
  private playVideo(params: string, url: string) {
    let videoRef = document.getElementById('videotest') as HTMLMediaElement;
    if (Hls.isSupported()) {
      var hls = new Hls({
        debug: true, xhrSetup: (xhr: XMLHttpRequest, url: string) => {
          url = `${url}${params}`;
          xhr.open('GET', url);
        }
      });
      hls.loadSource(url);
      hls.attachMedia(videoRef);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        videoRef.muted = false;
        videoRef.play();
      });
    }
  }
  onPlayHandler(event: MouseEvent<HTMLButtonElement>) {
    let { url, params } = this.computeUrlAndParams(this.state.url);
    this.playVideo(params, url);
  }

  onChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      url: event.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <input type="text" value={this.state.url} onChange={this.onChange} />
          <button onClick={this.onPlayHandler} >
            Play Video
          </button>
          <label>{this.state.url}</label>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            <video id="videotest">

            </video>

          </a>

        </header>
      </div>
    );
  }
}
