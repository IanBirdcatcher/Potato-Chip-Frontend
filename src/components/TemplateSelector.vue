<script>
import BasicTemplate from './BasicTemplate.vue';
import ModernTemplate from '../components/ModernTemplate.vue';
import GothicTemplate from '../components/GothicTemplate.vue';

export default {
  name: 'TemplateSelector',
  components: {
    BasicTemplate,
    ModernTemplate,
    GothicTemplate,
  },
  props: {
    ContactInfo: { type: Object, required: true },
    Education: { type: Array, required: true },
    Experience: { type: Array, required: true },
    Interest: { type: Array, required: true },
    Link: { type: Array, required: true },
    Project: { type: Array, required: true },
    Award: { type: Array, required: true },
    Skill: { type: Array, required: true },
    Resume: { type: Array, required: true },
  },
  data() {
    return {
      selectedTemplate: 1, 
      totalTemplates: 3, 
    };
  },
  methods: {
    showTemplate(template) {
      this.selectedTemplate = template;
    },
    Previous() {
      if (this.selectedTemplate > 1) {
        this.showTemplate(this.selectedTemplate - 1);
      } else {
        this.showTemplate(this.totalTemplates); 
      }
    },
    Next() {
      if (this.selectedTemplate < this.totalTemplates) {
        this.showTemplate(this.selectedTemplate + 1);
      } else {
        this.showTemplate(1); 
      }
    },
    generatePDF() {
      if (this.selectedTemplate === 1 && this.$refs.basicTemplate) {
        this.$refs.basicTemplate.generatePDF();
      } else if (this.selectedTemplate === 2 && this.$refs.modernTemplate) {
        this.$refs.modernTemplate.generatePDF();
      } else if (this.selectedTemplate === 3 && this.$refs.gothicTemplate) {
        this.$refs.gothicTemplate.generatePDF();
      } else {
        console.error("Template not found");
      }
    },
  },
};
</script>

<template>
  <v-card class="mx-auto" width="1000" height="1500">
    <v-card-title style="text-align: center;">
      {{ selectedTemplate === 1 ? "Basic Template" : selectedTemplate === 2 ? "Modern Template" : "Gothic Template" }}
    </v-card-title>

    <v-spacer></v-spacer>

    <v-card-actions style="position: relative; bottom: 0;">

      <v-btn @click="Previous" style="float: left;">Previous
        <v-icon icon="mdi-chevron-left" style="font-size: 30px;"></v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="Next" style="float: right;">Next
        <v-icon icon="mdi-chevron-right" style="font-size: 30px;"></v-icon>
      </v-btn>

    </v-card-actions>
    <v-divider class="mx-4"></v-divider>
    <div>
      <BasicTemplate v-show="selectedTemplate === 1" ref="basicTemplate":Resume="Resume":ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link"   :Project="Project":Award="Award" :Skill="Skill" />
      <ModernTemplate v-show="selectedTemplate === 2" ref="modernTemplate":Resume="Resume":ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill" />
      <GothicTemplate v-show="selectedTemplate === 3" ref="gothicTemplate":Resume="Resume":ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill" />
    </div>

    <v-btn @click="generatePDF"
        style="float: left; background-color: #007BFF; color: white; font-weight: bold; padding: 10px 20px; border-radius: 5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" >
      PDF
    </v-btn>
    
    <v-spacer></v-spacer>

    <v-btn 
        style="float: right; background-color: #28a745; color: white; font-weight: bold; padding: 10px 20px; border-radius: 5px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" >
      Save
    </v-btn>

  </v-card>
</template>

