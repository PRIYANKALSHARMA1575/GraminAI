import axios from 'axios';

export async function sendMessageToGemini(prompt) {
  try {
    const response = await axios.post('http://localhost:3000/chat', { prompt });

    return response.data.reply;
  } catch (error) {
    console.error('Error communicating with backend:', error);
    return 'Sorry, something went wrong.';
  }
}