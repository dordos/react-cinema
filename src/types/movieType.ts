export type movieDetail = {
  poster_path: string;
  release_date: string;
  overview: string;
  genres: Array<{ id: number; name: string }>;
  spoken_languages: Array<{ iso_639_1: string }>;
  vote_average: number;
  title: string;
  id: string;
};
