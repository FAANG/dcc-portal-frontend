
import {removeUnderscore, convertArrayToStr} from './common_functions';

describe('common functions', () => {
  it ('removeUnderscore replace underscore with space', () => {
    expect(removeUnderscore('one_Two_three')).toEqual('one Two three');
  });

  it ('removeUnderscore does nothing with single word', () => {
    expect(removeUnderscore('word')).toEqual('word');
  });

  it ('removeUnderscore replace multiple underscores with same number of spaces', () => {
    expect(removeUnderscore('_one__Two___three')).toEqual(' one  Two   three');
  });

  it ('getStrFromArray should return empty string on undefined parameter', () => {
    // tslint:disable-next-line:prefer-const
    let data;
    expect(convertArrayToStr(data, '')).toEqual('');
  });

  it ('getStrFromArray should return empty string on empty array', () => {
    const data = [];
    expect(convertArrayToStr(data, '')).toEqual('');
  });

  it('getStrFromArray should return string representation of array without subelement', () => {
    const data = ['test1', 'test2'];
    expect(convertArrayToStr(data, '')).toEqual('test1, test2');
  });

  it('getStrFromArray should return string representation of array with subelement', () => {
    const data = [{'text': 'abc'}, {'text': 'efg'}];
    expect(convertArrayToStr(data, 'text')).toEqual('abc, efg');
  });

  it('getStrFromArray should return string representation of array with subelement, some may not having subelement', () => {
    const data = [{'text': 'abc'}, {'txt': 'efg'}];
    expect(convertArrayToStr(data, 'text')).toEqual('abc');
  });
});
