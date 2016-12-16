export class Organism {
  constructor(
    readonly biosampleId: string,
    readonly name: string,
    readonly description: string,
    readonly standardMet: string,
    readonly project: string,
    readonly sameAs: string[],
    readonly specimens: string[],
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
  ) { }
}