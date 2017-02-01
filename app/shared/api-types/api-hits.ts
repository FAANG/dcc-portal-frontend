export class ApiHits {
  constructor(
    readonly hits: {
      fields: {[key:string]: string[]},
      _id: string,
    }[],
    readonly total: number,
  ) { }
}