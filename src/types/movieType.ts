export type movieType = {
  adult: boolean;
  backdrop_path: string | undefined;
  genres: Array<{ id: number; name: string }>;
  id: string;
  original_language: string | undefined;
  original_title: string | undefined;
  overview: string;
  popularity: number | undefined;
  poster_path: string;
  release_date: string;
  spoken_languages: Array<{ iso_639_1: string }>;
  title: string;
  video: boolean | undefined;
  vote_average: number | undefined;
  vote_cunt: number | undefined;
};

export type movieDetailType = {};
