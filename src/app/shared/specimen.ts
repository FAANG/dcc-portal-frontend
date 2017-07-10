export class Specimen {
  constructor(
    readonly biosampleId: string,
    readonly name: string,
    readonly description: string,
    readonly standardMet: string,
    readonly project: string,
    readonly organization: {
      readonly name: string,
      readonly URL: string,
    }[],
    readonly material: {
      readonly text: string,
      readonly ontologyTerms: string,
    },
    readonly derivedFrom: string,
    readonly sameAs: string[],
    readonly availability: string,
    readonly organism: {
      readonly biosampleId: string,
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
      readonly specimenVolume: {
        readonly text: number,
        readonly unit: string,
      },
      readonly specimenSize: {
        readonly text: number,
        readonly unit: string,
      },
      readonly specimenWeight: {
        readonly text: number,
        readonly unit: string,
      },
      readonly specimenPictureUrl: string[],
      readonly gestationalAgeAtSampleCollection: {
        readonly text: number,
        readonly unit: string,
      }
    },
    readonly cellSpecimen: {
      readonly markers: string,
      readonly cellType: {
        readonly text: string,
        readonly ontologyTerms: string,
      }[],
      readonly purificationProtocol: string
    },
    readonly cellCulture: {
      readonly cultureType: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly cellType: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly cellCultureProtocol: string,
      readonly cultureConditions: string,
      readonly numberOfPassages: number
    },
    readonly cellLine: {
      readonly organism: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly sex: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly cellLine: string,
      readonly biomaterialProvider: string,
      readonly catalogueNumber: string,
      readonly passageNumber: number,
      readonly dateEstablished: {
        readonly text: number,
        readonly unit: string,
      },
      readonly publication: string,
      readonly breed: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly cellType: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly cultureConditions: string,
      readonly cultureProtocol: string,
      readonly disease: {
        readonly text: string,
        readonly ontologyTerms: string,
      },
      readonly karyotype: string,
    },
  ) { }
}