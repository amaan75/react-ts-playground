// {
//     "sort": [],
//     "filters": [
//         {
//             "field": "tenantId",
//             "operator": "IN",
//             "values": [
//                 "quirkautogroup"
//             ],
//             "key": "tenantId"
//         }
//     ],
//     "searchText": "",
//     "groupBy": [],
//     "includeFields": [],
//     "searchableFields": [],
//     "pageInfo": {
//         "start": 0,
//         "rows": 200
//     }
// }

export enum RequestOperator {
    IN = "IN", BTW = "BTW"
}

export enum OrderEnum {
    ASC, DESC
}
export type PageInfo = {
    start?: Number,
    rows: Number,
}

export interface FilterType {
    field: String,
    "operator"?: RequestOperator,
    "values": String[],

}

export const SortType = {
    field: String,
    order: OrderEnum
}
export interface SearchRequestType {
    sort?: Array<typeof SortType>,
    filters?: Array<FilterType>,
    searchText?: String,
    pageInfo?: PageInfo
}