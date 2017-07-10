import { File } from './file';

export class FileList {
  constructor(
    readonly hits : {hits: File[], total : number},
    readonly aggregations : {[field : string]: {[field : string]: {buckets: {key: string, doc_count: number}[]}}}
) { }
}