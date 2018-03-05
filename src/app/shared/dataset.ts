export class Dataset {
  
  constructor(
    readonly accession: string,
    readonly title: string,
    readonly alias: string,
    readonly type: string,
    readonly secondaryAccession: string,
    readonly archive: string[],
    readonly specimen: {
      readonly biosampleId: string,
      readonly material: {
        readonly text: string,
        readonly ontologyTerms: string
      },
      readonly cellType: {
        readonly text: string,
        readonly ontologyTers: string
      },
      readonly organism: {
        readonly text: string,
        readonly ontologyTers: string
      },
      readonly sex: {
        readonly text: string,
        readonly ontologyTers: string
      },
      readonly breed: {
        readonly text: string,
        readonly ontologyTers: string
      },
    }[],
    readonly species: {
      readonly text: string,
      readonly ontologyTerms: string
    }[],
    readonly releaseDate: string,
    readonly updateDate: string,
    readonly file: {
      readonly url: string,
      readonly name: string,
      readonly fileId: string,
      readonly experiment: string,
      readonly type: string,
      readonly size: number,
      readonly readableSize: string,
      readonly archive: string,
      readonly readCount: number,
      readonly baseCount: number
    }[],
    readonly experiment: {
      readonly accession: string,
      readonly target: string,
      readonly assayType: string
    }[],
    readonly instrument: string[],
    readonly centerName: string[]
  ) {}
}