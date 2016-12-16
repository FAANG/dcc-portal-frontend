import { Specimen } from './specimen';

export class SpecimenList {
  constructor(
    readonly hits : Specimen[],
    readonly total : number
) { }
}