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
  componentDidMount() {


  }

  componentDidUpdate(pp: AppProps, ps: AppState) {
    let url = "https://dclxh76xq5daf.cloudfront.net/cacargroup_5/index.m3u8?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZGNseGg3NnhxNWRhZi5jbG91ZGZyb250Lm5ldC9jYWNhcmdyb3VwXzUvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTY4NTk4NzAwOX19fV19&Signature=b3iehOJVaSmCL2MpxUI2CdSeyzNtcPupXa96aqen091eydChhr6XAfdJIOrjaqGCLaYGa8JrKK5~v3fwWiTqI4vFY7yoijjECaw48n5o5ZTP7uGtlMehSX0RowVA5HzZ6pgS2RHma8BI0gNg0IT5xpR6S7HCOsEpnPvKjKgmiHnH3uO7q7aYWP3Vq6YX6ZJZtoA58EHePrvO21Eq3y9A5grAtEIRROM54Jl1Jtke8JsY8GFgjgMq8XA6yPHbe-yo9eI3vr6FvOEZHgwGOv2Slc~cz~4prTRYmBYAYPPGAIkNcVBTBLS4QUS7~3flJ310dKAvZ0ubaT1fMhhx2wsnCw__&Key-Pair-Id=K2L6HYL3JA1IDE";
    if (ps.urlToPlay !== this.state.urlToPlay) {
      let { url, params } = this.computeUrlAndParams(this.state.urlToPlay);
      // console.log(`${url} and ${params}`)
      this.playVideo(params, url);
    }
  }


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
    this.setState((ps: AppState) => {
      return {
        ...ps,
        urlToPlay: ps.url
      }
    })
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
