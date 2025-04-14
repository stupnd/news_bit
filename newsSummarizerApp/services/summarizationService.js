// services/summarizationService.js

import { OPENAI_API_KEY } from '@env';

// Function to generate a simplified summary using Chat API.
export const summarizeArticle = async (articleText) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant who summarizes news articles in simple, clear language.'
          },
          {
            role: 'user',
            content: `Please simplify and summarize the following news article:\n\n${articleText}`
          }
        ],
        max_tokens: 150,
        temperature: 0.5
      }),
    });

    const json = await response.json();
    console.log('OpenAI Response for summary:', json);

    if (json.choices && json.choices.length > 0) {
      return json.choices[0].message.content.trim();
    }
    return 'Summary not available.';
  } catch (error) {
    console.error('Error generating summary:', error);
    return 'Error generating summary.';
  }
};

// Function to generate an analogy using Chat API.
export const generateAnalogy = async (articleText) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: `Please provide a simple analogy to explain the following news article:\n\n${articleText}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      }),
    });
    const json = await response.json();
    console.log('OpenAI Response for analogy:', json);

    if (json.choices && json.choices.length > 0) {
      return json.choices[0].message.content.trim();
    }
    return 'Analogy not available.';
  } catch (error) {
    console.error('Error generating analogy:', error);
    return 'Error generating analogy.';
  }
};
