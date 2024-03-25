import { apiToken } from './contants';

export async function apiCall<T>(
  url: string,
  customOptions: RequestInit = {}
): Promise<T> {
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: apiToken,
    },
    ...customOptions,
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
