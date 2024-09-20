import { postUser } from '@/apis/user';
import * as yup from 'yup';

export type SignUpFormData = Parameters<typeof postUser>[0];

export const initialSignUpFormData: SignUpFormData = {
  gender: 'F',
  age: 0,
  name: '',
};

export const signUpFormDataSchema = yup.object().shape({
  gender: yup
    .string()
    .oneOf(['M', 'F'], '올바른 성별을 선택해주세요')
    .required('미입력 시 다음 단계로 넘어갈 수 없습니다'),
  age: yup.number().required('미입력 시 다음 단계로 넘어갈 수 없습니다').typeError('나이는 숫자로 입력해야 합니다'),
  name: yup.string().required('미입력 시 다음 단계로 넘어갈 수 없습니다'),
});
