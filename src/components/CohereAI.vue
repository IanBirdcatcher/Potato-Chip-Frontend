<template>
  <div class="cohere-ai">
    <h3>Cohere AI Feedback</h3>

    <!-- Button to trigger AI chat, only shown if chat is not open -->
    <button v-if="!isChatOpen" @click="startChat">Open Cohere AI Chat</button>

    <!-- AI Chat Window -->
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        <h4>Chat with Cohere AI</h4>
        <button @click="clearChat" class="clear-btn">Clear Chat</button>
      </div>

      <!-- Display chat messages -->
      <div class="chat-messages">
        <div v-for="message in chatMessages" :key="message.id" class="chat-message">
          <p><strong>{{ message.sender }}:</strong> {{ message.content.text }}</p>
        </div>
      </div>

      <!-- User input for custom message or resume query -->
      <div class="chat-input">
        <textarea v-model="userMessage" placeholder="Ask something..." rows="4" cols="50"></textarea>

        <!-- Plus icon to upload PDF -->
        <button @click="triggerFileInput" class="upload-btn">
          <span class="plus-icon">+</span> Upload PDF
        </button>

        <!-- Hidden file input to allow file upload -->
        <input
          ref="fileInput"
          type="file"
          accept="application/pdf"
          @change="handleFileUpload"
          style="display: none"
        />

        <button @click="sendMessage" :disabled="!userMessage.trim() && !uploadedPdf">
          Send
        </button>
      </div>
    </div>

    <!-- Feedback display section -->
    <div v-if="feedback" class="feedback-section">
      <h4>AI Feedback:</h4>
      <p>{{ feedback }}</p>
    </div>

    <!-- Displaying resume tips -->
    <div class="resume-tips">
      <h4>What Makes a Good Resume?</h4>
      <p>{{ resumeTips }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import getResumeFeedback from '../services/cohereServices';

export default {
  name: 'CohereAI',
  setup() {
    const isChatOpen = ref(false); // Determines whether chat is open
    const userMessage = ref(''); // Stores the user's input message
    const chatMessages = ref([]); // Stores chat messages between the user and AI
    const feedback = ref(''); // Stores the feedback from Cohere
    const resumeTips = ref(''); // Stores tips about resumes
    const uploadedPdf = ref(null); // Stores the uploaded PDF file

    // Function to start the chat
    const startChat = () => {
      isChatOpen.value = true;
      chatMessages.value.push({
        id: Date.now(),
        sender: 'AI',
        content: { text: 'Hello! You can upload a PDF resume or ask me anything.' },
      });
    };

    // Function to clear the chat
    const clearChat = () => {
      chatMessages.value = [];
      feedback.value = ''; // Clear any previous feedback
    };

    // Function to trigger file input click
    const triggerFileInput = () => {
      const fileInput = document.querySelector('input[type="file"]');
      fileInput.click();
    };

    // Function to handle file upload
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];

      // Check if the uploaded file is a PDF
      if (file && file.type === 'application/pdf') {
        uploadedPdf.value = file;
        chatMessages.value.push({
          id: Date.now(),
          sender: 'User',
          content: { text: `Uploaded a PDF: ${file.name}` },
        });

        // Send the PDF file to Cohere for analysis
        try {
          const formData = new FormData();
          formData.append('pdf', file);

          const response = await getResumeFeedback(formData);

          if (response && response.body && response.body.text) {
            feedback.value = response.body.text;
            chatMessages.value.push({
              id: Date.now(),
              sender: 'AI',
              content: { text: feedback.value },
            });
          } else {
            feedback.value = 'No feedback available from the PDF.';
            chatMessages.value.push({
              id: Date.now(),
              sender: 'AI',
              content: { text: 'Sorry, I couldn’t provide feedback at this moment.' },
            });
          }
        } catch (error) {
          console.error('Error uploading PDF:', error);
          feedback.value = 'Error uploading PDF for analysis.';
          chatMessages.value.push({
            id: Date.now(),
            sender: 'AI',
            content: { text: 'Error uploading PDF. Please try again.' },
          });
        }
      } else {
        chatMessages.value.push({
          id: Date.now(),
          sender: 'AI',
          content: { text: 'Please upload a PDF file only.' },
        });
      }
    };

    // Function to send a message to the AI (Cohere)
    const sendMessage = async () => {
      if (userMessage.value.trim()) {
        chatMessages.value.push({
          id: Date.now(),
          sender: 'User',
          content: { text: userMessage.value },
        });

        try {
          const response = await getResumeFeedback({ text: userMessage.value });

          if (response && response.body && response.body.text) {
            feedback.value = response.body.text;
            chatMessages.value.push({
              id: Date.now(),
              sender: 'AI',
              content: { text: feedback.value },
            });
          } else {
            feedback.value = 'No feedback available.';
            chatMessages.value.push({
              id: Date.now(),
              sender: 'AI',
              content: { text: 'Sorry, I couldn’t provide feedback at this moment.' },
            });
          }
        } catch (error) {
          console.error('Error sending message to Cohere:', error);
          chatMessages.value.push({
            id: Date.now(),
            sender: 'AI',
            content: { text: 'Error fetching feedback, please try again.' },
          });
        }

        userMessage.value = '';
      }
    };

    // Fetch general tips on what makes a good resume on component mount
    onMounted(async () => {
      try {
        const response = await getResumeFeedback({ text: 'What makes a good resume?' });

        if (response && response.body && response.body.text) {
          resumeTips.value = response.body.text;
        } else {
          resumeTips.value = 'No information available on what makes a good resume.';
        }
      } catch (error) {
        console.error('Error fetching resume tips:', error);
        resumeTips.value = 'Error fetching tips on what makes a good resume.';
      }
    });

    return {
      isChatOpen,
      userMessage,
      chatMessages,
      feedback,
      resumeTips,
      startChat,
      sendMessage,
      clearChat,
      triggerFileInput,
      handleFileUpload,
      uploadedPdf,
    };
  },
};
</script>

<style scoped>
.cohere-ai {
  text-align: center;
  margin-top: 1em;
}

.chat-window {
  margin-top: 1em;
  border: 1px solid black;
  padding: 1em;
  background-color: #f9f9f9;
  max-height: 400px;
  overflow-y: auto;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  padding: 5px 10px;
  background-color: maroon;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-messages {
  margin-bottom: 1em;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-input {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: maroon;
}

.upload-btn {
  background-color: darkred;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.upload-btn .plus-icon {
  font-size: 20px;
  margin-right: 5px;
}

.feedback-section {
  margin-top: 1em;
}

.resume-tips {
  margin-top: 2em;
  font-style: italic;
  color: #555;
}
</style>
