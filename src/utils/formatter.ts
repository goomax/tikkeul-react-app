import { Toursite } from '@/schemas/types';

export function commaizeNumber(value: number | string | null | undefined, locale = 'ko-KR') {
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

export const formatToursiteType = (type: Toursite['type']) => {
  switch (type) {
    case 'restaurant':
      return '맛을 아는';
    case 'lodging':
      return '잠이 좋은';
    case 'activity':
      return '즐길 줄 아는';
    default:
      return '';
  }
};
