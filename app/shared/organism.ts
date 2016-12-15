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
  ) { }
}