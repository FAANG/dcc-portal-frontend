export class File {
  constructor(
    readonly name: string,
    readonly dataType: string,
    readonly md5: string,
    readonly specimens: string[],
    readonly url: string
  ) { }
}