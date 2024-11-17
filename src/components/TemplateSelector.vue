<script>
import BasicTemplate from './BasicTemplate.vue';
import ModernTemplate from '../components/ModernTemplate.vue';
import GothicTemplate from '../components/GothicTemplate.vue';

export default {
  name: 'App',
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
    Skill: { type: Array, required: true }
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
        console.log( "contact info from TemplateSelector: ",this.ContactInfo)

        this.showTemplate(this.selectedTemplate + 1);
      } else {
        this.showTemplate(1); 
      }
    },
  },
};

</script>

<template>
  <v-card class="mx-auto" width="1000" height="1000">
    <v-card-title style="text-align: center;" >      
      {{ selectedTemplate === 1 ? "Basic Template" : selectedTemplate === 2 ? "Modern Template" : "Gothic Template" }}
    </v-card-title>

    <v-spacer></v-spacer>

    <v-card-actions style="position: relative; bottom: 0;">

      <v-btn @click="Previous" style="float: left;">Previous
        <v-icon icon="mdi-chevron-left" style="font-size: 30px;"></v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="Next" style="float: right;">next
        <v-icon icon="mdi-chevron-right" style="font-size: 30px;"></v-icon>
      </v-btn>

    </v-card-actions>
    <v-divider class="mx-4"></v-divider>
    <div>
      <BasicTemplate v-if="selectedTemplate === 1" :ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill"/>
      <ModernTemplate v-if="selectedTemplate === 2" :ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill"/>
      <GothicTemplate v-if="selectedTemplate === 3" :ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill"/>
    </div>

  </v-card>
</template>
