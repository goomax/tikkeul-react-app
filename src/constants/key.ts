export const STORAGE_KEY = {
  RECENT_SEARCHES: 'recentSearches',
};

export const QUERY_PARAM_KEY = {
  GROUP_ID: 'groupId',
} as const;

export type QueryParamKey = (typeof QUERY_PARAM_KEY)[keyof typeof QUERY_PARAM_KEY];

export const QUERY_KEY = {
  USER: 'user',
  GROUP: 'group',
  COURSES: 'courses',
};
