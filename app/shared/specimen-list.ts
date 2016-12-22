import { Specimen } from './specimen';

export class SpecimenList {
  constructor(
    readonly hits : {hits: Specimen[], total : number},
    readonly aggregations : {[field : string]: {buckets: {key: string, doc_count: number}[]}}
) { }
}