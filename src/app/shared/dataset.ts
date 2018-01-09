import { File } from './file';

export class Dataset {
  
  constructor(
    readonly accession: string,
//    readonly releaseDate: string,
//    readonly updateDate: string,
    readonly title: string,
    readonly type: string,
    readonly secondaryAccession: string,
    readonly species: {
      readonly text: string,
      readonly ontologyTerms: string
    }[],
//    readonly submission: string,
    readonly experiments: string[],
    readonly instruments: string[],
    readonly files: File[]
  ) {}
}