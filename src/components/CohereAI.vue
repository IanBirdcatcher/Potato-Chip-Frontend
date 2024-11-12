<template>
  <div class="cohere-ai">
    <h3>Cohere AI</h3>

    <!-- Dropdown to select resume -->
    <select v-model="selectedResume" @change="resetFeedback">
      <option disabled value="">Select a resume</option>
      <option v-for="resume in resumes" :key="resume.id" :value="resume">
        {{ resume.title }}
      </option>
    </select>

    <!-- Button to trigger feedback request -->
    <button @click="requestFeedback" :disabled="!selectedResume">
      Get Feedback on Selected Resume
    </button>

    <!-- Feedback display section -->
    <div v-if="feedback" class="feedback-section">
      <h4>Feedback:</h4>
      <p>{{ feedback }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import getResumeFeedback from '../services/cohereServices';

export default {
  name: 'CohereAI',
  props: {
    resumes: Array, // Array of resumes passed from parent component
  },
  setup() {
    const selectedResume = ref(null);  // Stores the selected resume
    const feedback = ref('');  // Stores the feedback from Cohere API

    // Function to request feedback for the selected resume
    const requestFeedback = async () => {
      if (selectedResume.value) {
        try {
          // Call getResumeFeedback to fetch feedback from Cohere API
          const response = await getResumeFeedback(selectedResume.value);

          // Check if the feedback exists in the response
          if (response && response.body && response.body.text) {
            feedback.value = response.body.text;  // Display feedback
          } else {
            feedback.value = 'No feedback available.';  // Default message if no feedback
          }
        } catch (error) {
          console.error('Error fetching feedback:', error);
          feedback.value = 'Error fetching feedback.';  // Error handling
        }
      }
    };

    // Reset feedback when a new resume is selected
    const resetFeedback = () => {
      feedback.value = '';  // Clear feedback whenever a new resume is selected
    };

    return {
      selectedResume,
      feedback,
      requestFeedback,
      resetFeedback,
    };
  },
};
</script>

<style scoped>
.cohere-ai {
  text-align: center;
  margin-top: 1em;
}
.feedback-section {
  margin-top: 1em;
}
</style>
