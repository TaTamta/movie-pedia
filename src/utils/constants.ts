export const posterBaseUrl: string = 'https://image.tmdb.org/t/p/w300';

// TMDB "API Read Access Token" (v4). Set it in .env.local — see .env.example.
// Note: in a client-only app this value is still visible in the browser bundle,
// so use a read-only TMDB token, never a private key.
export const apiToken: string = `Bearer ${process.env.REACT_APP_TMDB_TOKEN ?? ''}`;
