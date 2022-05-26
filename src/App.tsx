import React, { ChangeEvent, MouseEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import axios, { AxiosResponse } from "axios";
import { RequestOperator, SearchRequestType } from "./types/request_type"
import { FormField } from './form_label_field';
import { PrinterSeachResponseType, PrintJobSearchResponeType, TekionResponseType } from './types/repsonse_types';

interface AppProps {

}

type PrinterStatsTypeByPageCount = {
  [pageCount: number]: PrinterStatsType
}
type PrinterStatsType = {
  pageCount: number,
  totalPages: number,
  totalTimeTaken: number,
  averageTimeTaken: number,
  count: number,
  displayName: string
}


interface AppState {
  tenantId: string,
  tekionApiToken: string,
  dealerId: string,
  filePath:string,
  uploadurl:string,

}
export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tenantId: "",
      dealerId: "",
      tekionApiToken: "",
      filePath:"",
      uploadurl:""
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onFileHandler = this.onFileHandler.bind(this);
  }
  componentDidMount() { }

  componentDidUpdate(pp: AppProps, ps: AppState) { }



  onClickHandler(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const fileSelect = document.getElementById("filePath") as HTMLInputElement;
    let file:File | null = null;
    if(fileSelect.files && fileSelect.files.length ===1){
      file= fileSelect.files.item(0);
      const fileNotNull:File = file as File;
      fileNotNull.arrayBuffer()
      .then(value=>{
        axios.put(this.state.uploadurl,value,{headers:{
          "content-type":"video/mp4"
        }}).then((res: AxiosResponse<any, any>) => {
      console.log("upload done",res.status)
        }).catch(error=>console.log(error))
      }).catch(error=>console.log(error))
    
    }
  }

  onFileHandler(event:ChangeEvent<HTMLInputElement>){
event.preventDefault();
const name = event.target.name as keyof AppState;
const filePath=event.target.value;
this.setState({
  ...this.state,
  [name]: filePath
});
  }

  onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const currentValue = event.target.value;
    const name = event.target.name as keyof AppState;
    this.setState({
      ...this.state,
      [name]: currentValue
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
          <FormField name="uploadurl" label="Tenant Name:" value={this.state.uploadurl}
            onChangeHandler={this.onChangeHandler} />
         
               <input type="file"
       id="filePath" name="filePath" onChange={this.onFileHandler}></input>
          <button onClick={this.onClickHandler}>Make Api Call</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React


          </a>

        </header>
      </div>
    );
  }
}
