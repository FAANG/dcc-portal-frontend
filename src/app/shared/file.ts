export class File {
  constructor(
    readonly name: string,
    readonly specimen: string,
    readonly organism: string,
    readonly species: {
      readonly text: string,
      readonly ontologyTerms: string
    },
    readonly url: string,
    readonly type: string,
    readonly size: number,
    readonly readableSize: number,
    readonly checksum: string,
    readonly checksumMethod: string,
    readonly archive: string,
    readonly readCount: number,
    readonly baseCount: number,
    readonly releaseDate: string,
    readonly updateDate: string,
    readonly submission: string,
    readonly experiment: {
      readonly accession: string,
      readonly target: string,
      readonly assayType: string,
      readonly standardMet: string
    },
    readonly study: {
      readonly accession: string,
      readonly alias: string,
      readonly type: string,
      readonly secondaryAccession: string,
      readonly title: string
    },
    readonly run: {
      readonly accession: string,
      readonly alias: string,
      readonly platform: string,
      readonly instrument: string,
      readonly centerName: string,
      readonly sequencingDate: string,
      readonly sequencingLocation: string,
      readonly sequencingLatitude: string,
      readonly sequencingLongitude: string,
    }
  ) { }
}