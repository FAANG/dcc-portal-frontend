import {SortPipe} from './sort.pipe';
import {TestBed} from '@angular/core/testing';

describe('Pipe: SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('should return empty list if value was not provided', () => {
    const params = {
      id: 'standard',
      direction: 'asc'
    };
    expect(pipe.transform('', params)).toEqual([]);
  });

  it('should sort by ascending order', () => {
    const params = {
      id: 'idNumber',
      direction: 'asc'
    };
    const value = [
      {
        idNumber: 10
      },
      {
        idNumber: 1
      }
    ];
    const to_return = [
      {
        idNumber: 1
      },
      {
        idNumber: 10
      }
    ];
    expect(pipe.transform(value, params)).toEqual(to_return);
  });

  it('should sort by descending order', () => {
    const params = {
      id: 'idNumber',
      direction: 'desc'
    };
    const value = [
      {
        idNumber: 1
      },
      {
        idNumber: 10
      }
    ];
    const to_return = [
      {
        idNumber: 10
      },
      {
        idNumber: 1
      }
    ];
    expect(pipe.transform(value, params)).toEqual(to_return);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
