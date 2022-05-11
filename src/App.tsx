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

}
export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      tenantId: "",
      dealerId: "",
      tekionApiToken: ""
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentDidMount() { }

  componentDidUpdate(pp: AppProps, ps: AppState) { }



  onClickHandler(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const isDealerId = this.state.dealerId;
    const searchRequest: SearchRequestType = {
      filters: [{ "field": "tenantId", "operator": RequestOperator.IN, "values": [this.state.tenantId] },
       {
        "field": "dealerId", operator: RequestOperator.IN, values: [this.state.dealerId]
      }],
      pageInfo: {
        start: 0,
        rows: 200
      }
    };
    const responsePromise = axios.post("https://app.tekioncloud.com/api/printer-mgmt/u/print-jobs/v2/search", searchRequest,
      {
        headers: {
          "tekion-api-token": this.state.tekionApiToken ,
          "dealerId": "4",
          "tenantName": "techmotors",
          "roleId": "4_SuperAdmin",
          "clientId": "console",
          "userId": "-1"
        }
      }
    );
    // const searchResponse:TekionResponseType<SearchResponseType<PrintJobSearchResponeType>> =
    responsePromise.then((res: AxiosResponse<TekionResponseType<PrinterSeachResponseType<PrintJobSearchResponeType>>, any>) => {
      const hits = res.data.data.hits;
      console.log("result from " + res.data.data.extra);
      let resultMap: {
        [key: string]: PrinterStatsTypeByPageCount
      } = {};
      hits.filter(el => el.status === "COMPLETED")
        .forEach((el: PrintJobSearchResponeType, index: number) => {
          const currentPrintTimeTaken = el.timeTaken;
          const currentPageCount = el.totalPages;
          const currentSinglePagePrintAverage = currentPrintTimeTaken / currentPageCount;
          const printerStats = resultMap[el.printerName] || {};
          const printerStatsForPageTotalAndPrinter = printerStats[el.totalPages] || {};
          const computedOverallAverageForPageAndPrinter = printerStatsForPageTotalAndPrinter.averageTimeTaken || 0;
          const sumOfAverage = currentSinglePagePrintAverage + computedOverallAverageForPageAndPrinter;
          const currentCounter = printerStatsForPageTotalAndPrinter.count || 0;
          const counterToUse = currentCounter + 1;
          const newComputedAverage = sumOfAverage / counterToUse;
          const totalPages = (printerStatsForPageTotalAndPrinter.totalPages || 0) + el.totalPages;
          const totalTimeTaken = (printerStatsForPageTotalAndPrinter.totalTimeTaken || 0) + el.timeTaken;
          let newState = {};
          const nestLevel1 = resultMap[el.printerName] || {};
          const nestLevel2 = nestLevel1[el.totalPages] || {};
          newState = {
            ...resultMap,
            [el.printerName]: {
              ...nestLevel1,
              [el.totalPages]: {
                ...nestLevel2,
                pageCount: currentPageCount,
                totalPages: totalPages,
                totalTimeTaken,
                averageTimeTaken: newComputedAverage,
                count: counterToUse,
                displayName: el.displayName
              }
            }
          };
          resultMap = newState;

        });
      console.log(JSON.stringify(resultMap, null, 2))
      // console.log("reuslt:", resultMap)

    })
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
          <FormField name="tenantId" label="Tenant Name:" value={this.state.tenantId}
            onChangeHandler={this.onChangeHandler} />
          <FormField name="tekionApiToken" label="TekionApiToken:" value={this.state.tekionApiToken}
            onChangeHandler={this.onChangeHandler} />
          <FormField name="dealerId" label="DealerId:" value={this.state.dealerId}
            onChangeHandler={this.onChangeHandler} />
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
