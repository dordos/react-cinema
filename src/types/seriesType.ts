export type seriesType = {
  backdrop_path: string | undefined;
  first_air_date: string | undefined;
  genres: Array<{ id: number; name: string }>;
  id: string;
  name: string;
  original_country: string[];
  original_language: string | undefined;
  original_name: string;
  overview: string;
  popularity: number | undefined;
  poster_path: string;
  vote_average: number | undefined;
  vote_count: number | undefined;
};

export type seriesDetailType = {
  adult: boolean;
  backdrop_path: string | null;
  created_by: [{ id: number; credit_id: string; name: string; gender: number }];
  episode_run_time: [number];
  first_air_date: string;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: [string];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: null | number | string;
    season_number: number;
    show_id: number;
    still_path: null | number | string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: [{ id: number; logo_path: string; name: string; origin_country: string }];

  belongs_to_collection: null | string;
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: null | number;
    season_number: number;
    show_id: number;
    still_path: null | number | string;
    vote_average: number;
    vote_count: number;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: null | string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }
  ];
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type movieImg = {
  backdrops: [
    {
      file_path: string;
    }
  ];
};
