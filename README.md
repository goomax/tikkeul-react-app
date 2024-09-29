# Tikkeul React Web

#### [티끌모아강원 바로가기](https://tikkeul.netlify.app/)

## 0. 미리보기

<div style="display: flex; flex-wrap: nowrap; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/17c7130b-e106-4a87-bccd-70be7f6f4dd0" alt="미리보기" style="width: 20%;">
  <img src="https://github.com/user-attachments/assets/de00ac5c-7b5d-4c71-b246-e66058d72e61" alt="미리보기" style="width: 20%;">
  <img src="https://github.com/user-attachments/assets/8e47ed75-5b1c-4e04-9113-5851b6111273" alt="미리보기" style="width: 20%;">
  <img src="https://github.com/user-attachments/assets/9aa337b5-e628-4ef9-b7eb-5090b286912f" alt="미리보기" style="width: 20%;">
</div>

## 1. Getting Started

#### Install

```
yarn install
```

#### Dev mode

```
yarn dev
```

#### Storybook

```
yarn sb
```

#### 기타 커스텀 스크립트

```bash
yarn gen:icon {컴포넌트 이름}  
# SVG 아이콘 컴포넌트 템플릿 생성
# e.g. yarn gen:icon ArrowTop  

yarn gen:index {타겟경로}  
# 디렉토리 기준 배럴 파일 생성
# e.g. yarn gen:index src/components/icons
```

#### 환경변수
```
VITE_SERVER_URL={SERVER_URL}
VITE_KAKAO_JS_KEY={KAKAO_JS_KEY}
VITE_KAKAO_REST_KEY={KAKAO_REST_KEY}
```

#### 개발환경

- NodeJS-18.18.0
- yarn-1.22.21

## 2. 기술 스택

#### Framework & Language

- React 18.x
- TypeScript 5.x

#### State Management & Data Fetching

- React Query (TanStack Query) ^5.56.2

#### Styling & Animations

- MUI (Material-UI) ^5.16.7
- Emotion (CSS-in-JS) ^11.13.0
- Framer Motion ^11.3.30

#### Form & Validation

- React Hook Form ^7.53.0
- Yup (Schema Validation) ^1.4.0

#### HTTP Client

- Axios ^1.7.5

#### Development & Build Tools

- Vite ^5.4.1 (Development & Build Tool)
- Storybook ^8.2.9 (Component Development Environment)
- ESLint & Prettier (Linting & Formatting)
- Chromatic (Visual Testing)


## 3. 서비스 아키텍쳐

## 4. 기능 구현 내용

### 4.1. 회원 관련


#### 4.1.1. 로그인
<img width="779" alt="image8" src="https://github.com/user-attachments/assets/6a2c3902-4200-417f-9256-5cbcddc0f885">

카카오 OAuth 로그인 기능은 다음과 같이 구현되었습니다:

1. 사용자가 클라이언트에서 카카오 로그인을 요청하면 서버에 해당 요청이 전달됩니다.
2. 서버는 카카오 인증 서버에 인가 코드를 요청합니다.
3. 카카오 인증 서버는 사용자의 카카오 계정 로그인을 위해 클라이언트로 리다이렉션합니다.
4. 사용자는 클라이언트에서 카카오 계정으로 로그인합니다.
5. 로그인 성공 시, 카카오 인증 서버는 설정된 리다이렉트 URI를 통해 인가 코드를 서버로 전달합니다.
6. 서버는 이 인가 코드를 사용하여 카카오 인증 서버에 액세스 토큰 발급을 요청합니다.
7. 카카오 인증 서버는 서버에 액세스 토큰을 발급해줍니다.
8. 서버는 발급받은 토큰 정보를 클라이언트에 전달하며, 클라이언트는 쿠키(`set-cookie`)로 토큰을 저장하여 이후 인증에 활용할 수 있습니다.

이러한 과정으로 클라이언트와 카카오 인증 서버 간의 인증 및 토큰 교환이 이뤄져 안전한 로그인 및 인증이 가능합니다.

#### 4.1.2. 회원가입

<img width="896" alt="image" src="https://github.com/user-attachments/assets/b98311c1-31a6-4993-8744-a1f1a74e3034">

회원가입은 최초 로그인 여부에 따라 진행됩니다.

1. **로그인 요청**: 사용자가 로그인 버튼을 누르면 프로세스가 시작됩니다.
2. **최초 로그인 여부 확인**:
    - 사용자가 처음 로그인하는 경우 회원가입 페이지로 리다이렉트됩니다.
    - 이미 회원 가입이 되어 있는 경우에는 바로 "로그인 완료"로 이동합니다.
3. **회원 정보 입력**:
    - 최초 로그인일 경우, 이름, 나이, 성별 등 필수 정보를 입력받는 단계로 이동합니다.
4. **회원가입 완료**:
    - 정보 입력이 완료되면 회원가입이 완료됩니다.
    - 이 과정 이후에 로그인 상태로 전환되어 "로그인 완료" 단계로 이동합니다.
5. **로그인 완료**:
    - 회원가입이 완료된 경우나 기존 회원일 경우 모두 이 단계로 이동하며, 최종적으로 로그인 상태가 유지됩니다.

이러한 흐름은 사용자가 최초로 로그인하는지 여부를 판단하여 필요한 경우 추가 정보를 입력하게 하고, 그렇지 않다면 바로 로그인 완료 상태로 이동합니다

### 4.3. 그룹 생성 및 추천 코스

#### 4.3.1. 추천시스템
#### 4.3.2. 코스 경로 찾기

<img width="790" alt="image2" src="https://github.com/user-attachments/assets/4bcb53ed-158e-479e-99f7-0b6683e2330d">

1. **코스 데이터 요청 및 응답**:
    - 클라이언트는 서버에 추천 경로와 관련된 데이터를 요청하고 서버는 그에 맞는 코스 데이터를 응답합니다. 이 데이터는 사용자의 요구에 맞는 경로 추천 정보를 포함하고 있습니다.
2. **다중 경유지 길찾기 API 사용**:
    - 클라이언트는 서버로부터 받은 코스 데이터를 기반으로 카카오의 다중 경유지 길찾기 API를 호출하여 경로를 계산합니다. 이때 API는 경유지를 모두 포함한 최적 경로의 좌표값을 반환합니다.
3. **경로 시각화**:
    - 클라이언트는 받은 좌표값을 바탕으로 카카오 맵 API를 활용해 지도에 경로를 시각화합니다. 맵 API를 요청하면 카카오 서버는 해당 경로를 지도로 렌더링해 클라이언트에 전달합니다.

이러한 과정으로 사용자는 추천된 코스와 최적화된 경로를 지도로 확인할 수 있습니다.

### 4.4. 코스 담기 및 공유  

#### 4.3.1. 코스 담기 및 편집

<img width="898" alt="image3" src="https://github.com/user-attachments/assets/cdd5694b-3b8d-440f-a472-4cf90906a426">

사용자가 코스를 담은 이후의 흐름입니다:

1. **코스 담기**: 사용자가 관심 있는 장소나 코스를 담기 시작합니다.
2. **코스 편집 여부**: 담은 코스를 편집할지 선택하는 단계입니다.
    - `true`: 코스 편집이 필요한 경우.
    - `false`: 편집이 필요 없을 경우 바로 다음 단계로 진행됩니다.
3. **장소 추가/삭제/순서 변경**: 편집이 필요한 경우 사용자가 코스에 장소를 추가하거나 삭제하고, 순서를 변경할 수 있습니다.
4. **여행 시작**: 코스 편집이 완료되면 최종적으로 확정된 코스로 여행을 시작할 수 있게 됩니다.

이러한 흐름을 통해 사용자는 여행 코스를 유연하게 편집하고, 준비가 되면 바로 여행을 시작할 수 있습니다.

#### 4.3.2. 코스 공유하기
<img width="788" alt="image4" src="https://github.com/user-attachments/assets/be4e7734-8375-4763-903f-9e7e40b9b9fb">

여행을 시작하면 사용자는 코스를 공유할 수 있습니다. 클라이언트에서 코스를 공유하는 기능은 다음과 같은 프로세스로 이루어집니다:

1. **코스 데이터 공유**:
    - 사용자가 공유하기 버튼을 클릭하면, 서버는 코스 데이터를 base64로 인코딩해 반환합니다. 이 인코딩된 데이터는 URL로 변환되어 공유가 용이하도록 합니다.
2. **URL 복사 및 공유**:
    - 클라이언트는 인코딩된 코스 데이터를 클립보드에 복사하고 공유할 수 있게 합니다. 이렇게 하면 사용자가 특정 코스에 대한 링크를 쉽게 전송할 수 있습니다.
3. **코스 데이터 디코딩**:
    - 공유된 URL의 데이터를 다시 사용하려면 클라이언트는 인코딩된 값을 서버로 전송합니다. 서버는 해당 값을 디코딩하여 JSON 형태의 원래 코스 데이터를 반환합니다.

이러한 과정으로 사용자 간에 코스 공유와 데이터 복원이 간편하게 이루어집니다.


