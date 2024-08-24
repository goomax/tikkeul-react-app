interface DefaultResponse {
  success: boolean;
}

export interface GetBenefitResponse extends DefaultResponse {
  data: {
    key: string;
    type: string;
    isClear: boolean;
    title: string;
    description: string;
    deadline: string;
  }[];
}

export interface GetRecommendedCoursesResponse extends DefaultResponse {
  data: {
    key: string;
    title: string;
    desc: string;
    image: string;
    type: string;
    heart: number;
    cart: number;
    price: number;
    alreadyHeart: boolean;
  }[];
}

export interface GetRecommendedLocationsResponse extends DefaultResponse {
  data: {
    key: string;
    type: string;
    name: string;
    price: string;
    image: string;
  }[];
}
