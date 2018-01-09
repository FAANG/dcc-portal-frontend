import { Dataset } from './dataset';

export class DatasetList {
  constructor(
    readonly hits : {hits: Dataset[], total : number},
    readonly aggregations : {[field : string]: {[field : string]: {buckets: {key: string, doc_count: number}[]}}}
) { }
}