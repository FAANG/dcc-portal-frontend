export class Specimen {
  constructor(
    readonly biosampleID: string,
    readonly name: string,
    readonly description: string,
    readonly standardMet: string,
    readonly project: string,
    readonly organization: {
      readonly name: string,
      readonly role: string,
    }[],
    readonly material: {
      readonly text: string,
      readonly ontologyTerms: string,
    },
    readonly derivedFrom: string[],
    readonly sameAs: string[],
    readonly availability: string[],
    readonly organism: {
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
      readonly healthStatus: {
        readonly text: string,
        readonly ontologyTerms: string,
      }[]
    },
    readonly specimenFromOrganism: {
      readonly specimenCollectionDate: {
        readonly text: string,
        readonly unit: string,
      },
      readonly animalAgeAtCollection: {
        readonly text: number,
        readonly unit: string,
      },
      readonly developmentalStage: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly healthStatusAtCollection: {
        readonly text: string,
        readonly ontologyTerms: string,
      }[],
      readonly organismPart: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly specimenCollectionProtocol: string,
      readonly fastedStatus: string,
      readonly numberOfPieces: {
        readonly text: number,
        readonly unit: string,
      },
    },
  ) { }
}