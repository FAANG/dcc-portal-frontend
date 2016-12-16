import { Organism } from './organism';

export class OrganismList {
  constructor(
    readonly hits : Organism[],
    readonly total : number
) { }
}