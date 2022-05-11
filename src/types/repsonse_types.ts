

export type TekionResponseType<T> = {
    data: T,
    status: string,
}

export type SearchResponseType<T> = {
    count: Number,
    hits: Array<T>,
}
export type PrinterSeachResponseType<T> = SearchResponseType<T> & {
    extra: string,
    nextPageToken: string,
};

export type PrintJobSearchResponeType = {
    status: string,
    jobId: String,
    printerName: string,
    displayName: string,
    totalPages: number,
    timeTaken: number,
}