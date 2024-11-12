import { CohereClientV2 } from 'cohere-ai'; // Import Cohere API

// Initialize the Cohere client with your API key
const cohere = new CohereClientV2({
  token: 'xoNnNR0JTYjvWLrUPo5a1XB6GUEJBs8jB47LNfPj', 
});

// Define the async function getResumeFeedback
export default async function getResumeFeedback() {
  try {
    // Call the Cohere chat endpoint with the message you want to send
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: 'This is my resume. Please Provide Feedback on it.',
        },
      ],
    });

    // Log the full response
    console.log("Full Response Object:", response);

    // Check if response body has the text field you're interested in
    if (response && response.body && response.body.text) {
      console.log("Response Text:", response.body.text);  // Log the text from the response
    } else {
      console.log("Response structure doesn't contain text field."); //no text field???
    }

  } catch (error) {
    console.error('Error calling Cohere API:', error); // Handles errors
  }
}