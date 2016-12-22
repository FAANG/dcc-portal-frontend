import { Organism } from './organism';

export class OrganismList {
  constructor(
    readonly hits : {hits: Organism[], total : number},
    readonly aggregations : {[field : string]: {buckets: {key: string, doc_count: number}[]}},
) { }
}