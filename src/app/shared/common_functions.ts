export function removeUnderscore(data) {
  if (data.indexOf('_') !== -1) {
    return data.split('_').join(' ');
  } else {
    return data;
  }
}
