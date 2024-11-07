const { CohereClientV2 } = require('cohere-ai'); // Import Cohere API

// Initialize the Cohere client with your API key
const cohere = new CohereClientV2({
  token: 'xoNnNR0JTYjvWLrUPo5a1XB6GUEJBs8jB47LNfPj', 
});

// Function to call the API and log the response
export default 
{
  (async () => {
    try {
      // Call the Cohere chat endpoint with the message you want to send
      const response = await cohere.chat({
        model: 'command-r-plus',  // Model you're using
        messages: [
          {
            role: 'student',
            content: 'This is my resume. Give me feedback please!',  // Message you want to send
          },
        ],
      });
      
      // Inspect the entire response object to see its structure
      console.log("Full Response Object:", response);
      
      // Assuming the text you're interested in is in the 'text' property
      if (response && response.body && response.body.text) {
        console.log("Response Text:", response.body.text);  // Log the text from the response
      } else {
        console.log("Response structure doesn't contain text field.");
      }

    } catch (error) {
      console.error('Error calling Cohere API:', error); // Handle errors
    }

  })()
};
