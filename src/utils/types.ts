export interface UserInfo {
  isLoggedIn: boolean;
  user: string | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
}

export interface MovieDetails {
  adult: false;
  backdrop_path: '/zAepSrO99owYwQqi0QG2AS0dHXw.jpg';
  belongs_to_collection: null;
  budget: 80000000;
  genres: [
    {
      id: 28;
      name: 'Action';
    },
    {
      id: 14;
      name: 'Fantasy';
    }
  ];
  homepage: 'https://www.madameweb.movie';
  id: 634492;
  imdb_id: 'tt11057302';
  original_language: 'en';
  original_title: 'Madame Web';
  overview: 'Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.';
  popularity: 2707.52;
  poster_path: '/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg';
  production_companies: [
    {
      id: 5;
      logo_path: '/71BqEFAF4V3qjjMPCpLuyJFB9A.png';
      name: 'Columbia Pictures';
      origin_country: 'US';
    },
    {
      id: 435;
      logo_path: '/AjzK0s2w1GtLfR4hqCjVSYi0Sr8.png';
      name: 'di Bonaventura Pictures';
      origin_country: 'US';
    }
  ];
  production_countries: [
    {
      iso_3166_1: 'US';
      name: 'United States of America';
    }
  ];
  release_date: '2024-02-14';
  revenue: 96619699;
  runtime: 116;
  spoken_languages: [
    {
      english_name: 'English';
      iso_639_1: 'en';
      name: 'English';
    }
  ];
  status: 'Released';
  tagline: 'Her web connects them all.';
  title: 'Madame Web';
  video: false;
  vote_average: 5.607;
  vote_count: 765;
}
