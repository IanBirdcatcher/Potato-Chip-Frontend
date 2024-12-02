<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-toolbar flat color="#F7F6FE" dense>
            <v-toolbar-title><b>Resume Preview</b></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="closeView">
              Back to List
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>
        <v-row>
        <v-col cols="12">
          <component
            :is="getTemplateComponent(resume.templateName)":resume="resume"/>
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
      resumeId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        resume: {
          resumeName: '',
          templateName: '',
          jobTitle: '',
          profile: '',
          skills: [],
          experience: [],
          projects: [],
          education: [],
        },
      };
    },
    mounted() {
      this.fetchResume();
    },
    methods: {
      fetchResume() {
        // Replace with your service call
        this.$http
          .get(`/api/resumes/${this.resumeId}`)
          .then((response) => {
            this.resume = response.data;
          })
          .catch((error) => {
            console.error('Error fetching resume:', error);
          });
      },
      closeView() {
        this.$emit('close');
      },
      getTemplateComponent(templateName) {
        switch (templateName) {
          case 'modern':
            return ModernTemplate;
          case 'gothic':
            return GothicTemplate;
          default:
            return BasicTemplate;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-toolbar-title {
    font-size: 1.2rem;
  }
  </style>
  