<template>
  <div class="cohere-ai">
    <h3>Cohere AI Feedback</h3>

    <!-- Button to trigger AI chat, only shown if chat is not open -->
    <button v-if="!isChatOpen" @click="startChat" class="open-chat-btn">Open Cohere AI Chat</button>

    <!-- AI Chat Window -->
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        <h4>Cohere AI Chat Bot</h4>
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
        <button @click="sendMessage" :disabled="!userMessage.trim()">Send</button>
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
    const isChatOpen = ref(false);
    const userMessage = ref('');
    const chatMessages = ref([]);
    const feedback = ref('');
    const resumeTips = ref('');

    const startChat = () => {
      isChatOpen.value = true;
      chatMessages.value.push({
        id: Date.now(),
        sender: 'AI',
        content: { text: 'Hello! You can ask me anything.' },
      });
    };

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

    onMounted(async () => {
      try {
        const response = await getResumeFeedback({ text: 'What makes a good resume?' });
        if (response && response.message && response.message.content.text) {
          resumeTips.value = response.message.content.text;
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

.feedback-section {
  margin-top: 1em;
}

.resume-tips {
  margin-top: 2em;
  font-style: italic;
  color: #555;
}
</style>
