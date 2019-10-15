import { TestBed, inject } from '@angular/core/testing';

import {removeUnderscore} from './common_functions';

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
});
