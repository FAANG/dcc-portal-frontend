export function removeUnderscore(data) {
  if (data.indexOf('_') !== -1) {
    return data.split('_').join(' ');
  } else {
    return data;
  }
}

export function convertArrayToStr(data: any[], subelement: string): string {
    if (data === undefined || data.length === 0) {
      return '';
    }
    let value = '';
    for (let i = 0; i < data.length; i++) {
      if (subelement === '') {
        value += data[i] + ', ';
      } else {
        if (subelement in data[i]) {
          value += data[i][subelement] + ', ';
        }
      }
    }
    return value.substring(0, value.length - 2);
  }

