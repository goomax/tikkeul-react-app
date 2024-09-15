export function commaizeNumber(value: number | string, locale = 'ko-KR') {
  if (isNaN(Number(value))) {
    return 'NaN';
  }

  return Number(value).toLocaleString(locale);
}

export function decommaizeNumber(value: string) {
  if (!/^[0-9,]+$/.test(value)) {
    return NaN;
  }
  return parseInt(value.replace(/,/g, ''), 10);
}
