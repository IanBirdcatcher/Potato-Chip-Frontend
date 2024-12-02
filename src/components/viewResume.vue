<template>
  <v-container fluid>
    <!-- Header Row with Comment -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-alert type="info" border="left" elevation="2">
              {{ comment }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resume Preview Section -->
    <v-row>
      <v-col cols="12">
        <!-- Hardcoded link for BasicTemplate -->
        <a v-if="templateName === 1" :href="basicTemplateLink" target="_blank">
          View Basic Template
        </a>
        <component v-else :is="getTemplateComponent(templateName)" />
      </v-col>
    </v-row>

    <!-- Action Buttons -->
    <v-row justify="space-between" class="mt-3">
      <v-col cols="auto">
        <v-btn color="primary" @click="generatePdf">
          Generate PDF
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="secondary" @click="goToHomepage">
          Back to Homepage
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BasicTemplate from '../components/BasicTemplate.vue';
import ModernTemplate from '../components/ModernTemplate.vue';
import GothicTemplate from '../components/GothicTemplate.vue';

export default {
  props: {
    templateName: {
      type: [String, Number],
      required: true,
    },
    comment: {
      type: String,
      default: 'This is a placeholder comment for the resume review.',
    },
  },
  data() {
    return {
      // Hardcoded link for BasicTemplate
      basicTemplateLink: 'https://example.com/basic-template', // Replace with your actual URL
    };
  },
  methods: {
    generatePdf() {
      // Placeholder for PDF generation logic
      console.log('PDF generation triggered');
    },
    goToHomepage() {
      this.$router.push({ name: 'Homepage' }); // Assuming the homepage route is named 'Homepage'
    },
    getTemplateComponent(templateName) {
      switch (templateName) {
        case '1':
        case 1:
          return BasicTemplate;
        case '2':
        case 2:
          return ModernTemplate;
        case '3':
        case 3:
          return GothicTemplate;
        default:
          return BasicTemplate; 
      }
    },
  },
};
</script>

<style scoped>
.v-alert {
  font-size: 1rem;
  padding: 16px;
}
.mt-3 {
  margin-top: 16px;
}
</style>
