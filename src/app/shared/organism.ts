//IMPORTANT: this file needs to be updated when the elasticsearch structure changes
//if the change affects the display, both organism-detail and getAllInArray in apiOrganismService for exportation needs change
export class Organism {
  constructor(
    readonly biosampleId: string,
    readonly name: string,
    readonly description: string,
    readonly standardMet: string,
    readonly releaseDate: string,
    readonly updateDate: string,
    readonly project: string,
    readonly organization: {
      readonly name: string,
      readonly URL: string,
      readonly role: string
    }[],
    readonly sameAs: string[],
    readonly material: {
      readonly text: string,
      readonly ontologyTerms: string,
    },
    readonly availability: string,
    readonly organism: {
      readonly text: string,
      readonly ontologyTerms: string,
    },
    readonly sex: {
      readonly text: string,
      readonly ontologyTerms: string,
    },
    readonly breed: {
      readonly text: string,
      readonly ontologyTerms: string,
    },
    readonly birthDate: {
      readonly text: string,
      readonly unit: string,
    },
    readonly healthStatus: {
      readonly text: string,
      readonly ontologyTerms: string,
    }[],
    readonly birthLocation: string,
    readonly birthLocationLongitude: {
      readonly text: string,
      readonly unit: string,
    },
    readonly birthLocationLatitude: {
      readonly text: string,
      readonly unit: string,
    },
    readonly birthWeight: {
      readonly text: number,
      readonly unit: string,
    },
    readonly placentalWeight: {
      readonly text: number,
      readonly unit: string,
    },
    readonly pregnancyLength: {
      readonly text: number,
      readonly unit: string,
    },
    readonly deliveryTiming: string,
    readonly deliveryEase: string,
    readonly childOf: string[],
    readonly pedigree: string,
    readonly customField:{
      readonly name: string,
      readonly value: string,
      readonly unit: string,
      readonly ontologyTerms: string
    }[]
  ) { }
}