export interface Group {
  groupId: number;
  name: string;
  cost: number;
  duration: number;
  courseDescription: string;
  courseDetails: Pick<TourSite, 'tourSiteId' | 'latitude' | 'longitude' | 'name' | 'recommendType' | 'address'> &
    {
      photoUrl: string;
      day: number;
      order: number;
    }[];
}

export interface TourSite {
  tourSiteId: number;
  latitude: number;
  longitude: number;
  name: string;
  cost: number;
  startTime: `${string}:${string}`;
  endTime: `${string}:${string}`;
  phone: string;
  type: 'restaurant' | 'lodging' | 'activity';
  address: string;
  recommendType: number;
  description: string;
  photoUrls: string[];
}

/**
 * 추천 코스 리스트
 */
export interface Course {
  id: number;
  name: string;
  description: string;
  cost: number;
  picked: number;
  liked: number;
  tourSites: TourSite[];
}
