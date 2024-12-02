<template>
  <v-container>
    <v-textarea
      label="Admin Comment"
      v-model="adminComment"
      readonly
      rows="3"
    ></v-textarea>

    <v-divider class="my-4"></v-divider>

    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <div v-if="resumeData">
          <BasicTemplate
            v-show="selectedTemplate === 1"
            :Resume="resumeData.Resume"
  
            :ContactInfo="resumeData.ContactInfo"
            :Education="resumeData.Education"
            :Experience="resumeData.Experience"
            :Interest="resumeData.Interest"
            :Link="resumeData.Link"
            :Project="resumeData.Project"
            :Award="resumeData.Award"
            :Skill="resumeData.Skill"
          />
          <ModernTemplate
            v-show="selectedTemplate === 2"
            :Resume="resumeData.Resume"
            :ContactInfo="resumeData.ContactInfo"
            :Education="resumeData.Education"
            :Experience="resumeData.Experience"
            :Interest="resumeData.Interest"
            :Link="resumeData.Link"
            :Project="resumeData.Project"
            :Award="resumeData.Award"
            :Skill="resumeData.Skill"
          />
          <GothicTemplate
            v-show="selectedTemplate === 3"
            :Resume="resumeData.Resume"
            :ContactInfo="resumeData.ContactInfo"
            :Education="resumeData.Education"
            :Experience="resumeData.Experience"
            :Interest="resumeData.Interest"
            :Link="resumeData.Link"
            :Project="resumeData.Project"
            :Award="resumeData.Award"
            :Skill="resumeData.Skill"
          />
        </div>
        <div v-else class="placeholder">Loading resume data...</div>
      </v-col>
    </v-row>

    <v-row class="mt-5" justify="center">
      <v-col cols="auto">
        <v-btn color="primary" @click="downloadPdf">PDF</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="secondary" @click="goBack">Back</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BasicTemplate from "./BasicTemplate.vue";
import ModernTemplate from "./ModernTemplate.vue";
import GothicTemplate from "./GothicTemplate.vue";

import ResumeService from "../services/resumeServices";
import AwardService from "../services/awardServices";
import AwardResumeService from "../services/awardResumeServices";
import ContactInfoService from "../services/contactInfoServices";
import ContactInfoResumeService from "../services/contactInfoResumeServices";
import EducationService from "../services/educationServices";
import EducationResumeService from "../services/educationResumeServices";
import ExperienceService from "../services/experienceServices";
import ExperienceResumeService from "../services/experienceResumeServices";
import InterestService from "../services/interestServices";
import InterestResumeService from "../services/interestResumeServices";
import LinkService from "../services/linkServices";
import LinkResumeService from "../services/linkResumeServices";
import ProjectService from "../services/projectServices";
import ProjectResumeService from "../services/projectResumeServices";
import SkillService from "../services/skillServices";
import SkillResumeService from "../services/skillResumeServices";

export default {
  components: { BasicTemplate, ModernTemplate, GothicTemplate },
  props: {
    resumeId: { type: Number, required: true },
  },
  data() {
    return {
      selectedTemplate: 1,
      resumeData: null,
      adminComment: "This is an admin comment about the resume.",
    };
  },
  mounted() {
    this.fetchResumeandbridgeTabelID();
  },
  methods: {
    fetchResumeandbridgeTabelID() {
      ResumeService.getResumeById(this.resumeId)
        .then((response) => {
          this.resumeData = { Resume: response.data }; 
        })
        .catch((error) => {
          console.error("Error fetching resume data:", error);
        });

      ContactInfoResumeService.getContactInfoResumeById(this.resumeId)
        .then((response) => ContactInfoService.getContactInfoById(response.data.ContactInfo.id))
        .then((response) => {
          this.resumeData.ContactInfo = response.data;
        })
        .catch((error) => {
          console.error("Error fetching contact info data:", error);
        });

      AwardResumeService.getAwardResumeById(this.resumeId)
        .then((response) => AwardService.getAwardById(response.data.Award.id))
        .then((response) => {
          this.resumeData.Award = response.data;
        })
        .catch((error) => {
          console.error("Error fetching award data:", error);
        });

      EducationResumeService.getEducationResumeById(this.resumeId)
        .then((response) => EducationService.getEducationById(response.data.Education.id))
        .then((response) => {
          this.resumeData.Education = response.data;
        })
        .catch((error) => {
          console.error("Error fetching education data:", error);
        });

      ExperienceResumeService.getExperienceResumeById(this.resumeId)
        .then((response) => ExperienceService.getExperienceById(response.data.Experience.id))
        .then((response) => {
          this.resumeData.Experience = response.data;
        })
        .catch((error) => {
          console.error("Error fetching experience data:", error);
        });

      InterestResumeService.getInterestResumeById(this.resumeId)
        .then((response) => InterestService.getInterestById(response.data.Interest.id))
        .then((response) => {
          this.resumeData.Interest = response.data;
        })
        .catch((error) => {
          console.error("Error fetching interest data:", error);
        });

      LinkResumeService.getLinkResumeById(this.resumeId)
        .then((response) => LinkService.getLinkById(response.data.Link.id))
        .then((response) => {
          this.resumeData.Link = response.data;
        })
        .catch((error) => {
          console.error("Error fetching link data:", error);
        });

      ProjectResumeService.getProjectResumeById(this.resumeId)
        .then((response) => ProjectService.getProjectById(response.data.Project.id))
        .then((response) => {
          this.resumeData.Project = response.data;
        })
        .catch((error) => {
          console.error("Error fetching project data:", error);
        });

      SkillResumeService.getSkillResumeById(this.resumeId)
        .then((response) => SkillService.getSkillById(response.data.Skill.id))
        .then((response) => {
          this.resumeData.Skill = response.data;
        })
        .catch((error) => {
          console.error("Error fetching skill data:", error);
        });
    },
    downloadPdf() {
      console.log("PDF download functionality to be implemented.");
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.placeholder {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
}
</style>
