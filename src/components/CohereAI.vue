<template>
  <div class="cohere-ai">
    <h3>Cohere AI Feedback</h3>

    <!-- Button to trigger AI chat, only shown if chat is not open -->
    <button v-if="!isChatOpen" @click="startChat" class="open-chat-btn">Open Cohere AI Chat</button>

    <!-- AI Chat Window -->
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        <h4>Cohere AI</h4>

        <!-- Clear Chat and Exit buttons -->
        <div class="chat-actions">
          <button @click="clearChat" class="clear-btn">Clear</button>
          <button @click="exitChat" class="exit-btn">X</button>
        </div>
      </div>

      <!-- Display chat messages -->
      <div class="chat-messages">
        <div v-for="message in chatMessages" :key="message.id" class="chat-message">
          <p><strong>{{ message.sender }}:</strong> {{ message.content.text }}</p>
        </div>
      </div>

      <!-- User input for custom message -->
      <div class="chat-input">
        <textarea v-model="userMessage" placeholder="Ask something..." rows="4" cols="50"></textarea>

        <!-- Plus icon to upload PDF -->
        <button @click="triggerFileInput" class="upload-btn">
          <span class="plus-icon">+</span> Add PDF
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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import getResumeFeedback from '../services/cohereServices';

export default {
  name: 'CohereAI',
  setup() {
    const isChatOpen = ref(false);
    const userMessage = ref('');
    const chatMessages = ref([]);
    const feedback = ref('');
    const resumeTips = ref('');
    const uploadedPdf = ref(null);

    const startChat = () => {
      isChatOpen.value = true;
      chatMessages.value.push({
        id: Date.now(),
        sender: 'AI',
        content: { text: 'Hello! You can upload a PDF resume or ask me anything.' },
      });
    };

    const clearChat = () => {
      chatMessages.value = [];
      feedback.value = '';
    };

    const exitChat = () => {
      clearChat();
      isChatOpen.value = false;
    };

    const triggerFileInput = () => {
      const fileInput = document.querySelector('input[type="file"]');
      fileInput.click();
    };

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];

      if (file && file.type === 'application/pdf') {
        uploadedPdf.value = file;
        chatMessages.value.push({
          id: Date.now(),
          sender: 'User',
          content: { text: `Uploaded a PDF: ${file.name}` },
        });

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

    // Remove the extra comma here in the script section
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



    return {
      isChatOpen,
      userMessage,
      chatMessages,
      feedback,
      startChat,
      sendMessage,
      clearChat,
      exitChat,
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

.open-chat-btn {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: darkred;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.open-chat-btn:hover {
  background-color: maroon;
}

.chat-window {
  background-color: #f9f9f9;
  padding: 1em;
  width: 60%; /* Adjust width as needed */
  max-width: 600px;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px auto; /* Center the chat window horizontally */
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-actions {
  display: flex;
  gap: 10px;
}

.clear-btn, .exit-btn {
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
</style>