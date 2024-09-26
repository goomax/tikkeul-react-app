import * as yup from 'yup';

export interface CreateGroupFormData {
  headCount: string | null;
  preferences: Partial<Record<'restaurantPrefer' | 'activityPrefer' | 'lodgingPrefer', number | null>>;
  duration: string | null;
}

export const initialCreateGroupFormData: CreateGroupFormData = {
  headCount: null,
  preferences: {
    restaurantPrefer: null,
    activityPrefer: null,
    lodgingPrefer: null,
  },
  duration: null,
};

export const createGroupFormDataSchema = yup.object().shape({
  headCount: yup
    .string()
    .required('미입력 시 다음 단계로 넘어갈 수 없습니다')
    .test('valid-number', '인원 수는 숫자만 입력 가능해요', (value) => {
      if (!value) return false;
      return /^\d+$/.test(value);
    })
    .nullable(),
  duration: yup
    .string()
    .required('미입력 시 다음 단계로 넘어갈 수 없습니다')
    .test('valid-number', '기간은 숫자만 입력 가능해요', (value) => {
      if (!value) return false;
      return /^\d+$/.test(value);
    })
    .nullable(),
  preferences: yup.object().shape({
    restaurantPrefer: yup
      .number()
      .nullable()
      .test('is-required', '미입력 시 다음 단계로 넘어갈 수 없습니다', (value) => {
        return value !== null;
      }),
    activityPrefer: yup
      .number()
      .nullable()
      .test('is-required', '미입력 시 다음 단계로 넘어갈 수 없습니다', (value) => value !== null),
    lodgingPrefer: yup
      .number()
      .nullable()
      .test('is-required', '미입력 시 다음 단계로 넘어갈 수 없습니다', (value) => value !== null),
  }),
});
