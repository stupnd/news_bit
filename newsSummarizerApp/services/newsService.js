// services/newsService.js

import { API_KEY } from '@env'; // Imports API_KEY from your .env file
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category = 'general') => {
  try {
    let url = `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;

    if (category && category !== 'All News' && category.toLowerCase() !== 'general') {
      url += `&category=${category.toLowerCase()}`;
    }
    
    const response = await fetch(url);
    const json = await response.json();

    if (json.status !== 'ok') {
      console.error('Error fetching news:', json);
      return [];
    }
    
    return json.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
