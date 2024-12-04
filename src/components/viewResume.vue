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
import { reactive, ref, onUnmounted, onMounted } from "vue";

export default {
  components: { BasicTemplate, ModernTemplate, GothicTemplate },
  props: {
    resumeId: { type: Number, required: true },
  },
  setup(){
    const loadTemplate = ref(false)
    const selectedTemplate = ref(null)
    return {loadTemplate, selectedTemplate}
  },
  data() {
    return {
      resumeData: {
        Resume: null,
        ContactInfo: [],
        Education: [],
        Experience: [],
        Interest: [],
        Link: ["link"],
        Project: [],
        Award: [],
        Skill: [],
      },
      adminComment: "This is an admin comment about the resume.",
    };
  },
  async mounted() {
    console.log("VIEW MOUNTED")
    await this.fetchResumeAndData();
    this.loadTemplate = true
    this.selectedTemplate = this.resumeData.Resume.templateId
  },
  emits:["goBack"],
  methods: {
    async fetchResumeAndData() {
      try {
        console.log("FETCH REUSME");

        // Fetch Resume
        const resumeResponse = await ResumeService.getResumeById(this.resumeId);
        this.resumeData.Resume = resumeResponse.data;
        console.log("Resume data:", this.resumeData.Resume);

        // Fetch Contact Info
        try{
        const contactInfoResumeResponse = await ContactInfoResumeService.getContactInfoResumeById(this.resumeId);
        console.log("Bridge table response for ContactInfo:", contactInfoResumeResponse.data);
        const contactInfoId = contactInfoResumeResponse.data[0].contactInfoId;
        const contactInfoResponse = await ContactInfoService.getContactInfoById(contactInfoId);
        this.resumeData.ContactInfo = contactInfoResponse.data;
        console.log("Contact Info data:", this.resumeData.ContactInfo);
        }
        catch{}

        // Fetch Awards
        const awardResumeResponse = await AwardResumeService.getAwardResumeById(this.resumeId);
        console.log("Bridge table response for Awards:", awardResumeResponse.data);
        if (Array.isArray(awardResumeResponse.data)) {
          const awards = await Promise.all(
            awardResumeResponse.data.map(async (awardEntry) => {
              try {
                const awardResponse = await AwardService.getAwardById(awardEntry.awardId);
                return awardResponse.data;
              } catch (error) {
                console.error("Error fetching award with ID:", awardEntry.awardId, error.message);
                return null;
              }
            })
          );
          this.resumeData.Award = awards.filter(Boolean);
          console.log("Awards data:", this.resumeData.Award);
        }

        // Fetch Education
        const educationResumeResponse = await EducationResumeService.getEducationResumeById(this.resumeId);
        console.log("Bridge table response for Education:", educationResumeResponse.data);
        if (Array.isArray(educationResumeResponse.data)) {
          const education = await Promise.all(
            educationResumeResponse.data.map(async (educationEntry) => {
              try {
                const educationResponse = await EducationService.getEducationById(educationEntry.educationId);
                return educationResponse.data;
              } catch (error) {
                console.error("Error fetching education with ID:", educationEntry.educationId, error.message);
                return null;
              }
            })
          );
          this.resumeData.Education = education.filter(Boolean);
          console.log("Education data:", this.resumeData.Education);
        }

        // Fetch Experience
        const experienceResumeResponse = await ExperienceResumeService.getExperienceResumeById(this.resumeId);
        console.log("Bridge table response for Experience:", experienceResumeResponse.data);
        if (Array.isArray(experienceResumeResponse.data)) {
          const experiences = await Promise.all(
            experienceResumeResponse.data.map(async (experienceEntry) => {
              try {
                const experienceResponse = await ExperienceService.getExperienceById(experienceEntry.experienceId);
                return experienceResponse.data;
              } catch (error) {
                console.error("Error fetching experience with ID:", experienceEntry.experienceId, error.message);
                return null;
              }
            })
          );
          this.resumeData.Experience = experiences.filter(Boolean);
          console.log("Experience data:", this.resumeData.Experience);
        }

        // Fetch Interests
        const interestResumeResponse = await InterestResumeService.getInterestResumeById(this.resumeId);
        console.log("Bridge table response for Interest:", interestResumeResponse.data);
        if (Array.isArray(interestResumeResponse.data)) {
          const interests = await Promise.all(
            interestResumeResponse.data.map(async (interestEntry) => {
              try {
                const interestResponse = await InterestService.getInterestById(interestEntry.interestId);
                return interestResponse.data;
              } catch (error) {
                console.error("Error fetching interest with ID:", interestEntry.interestId, error.message);
                return null;
              }
            }));
          this.resumeData.Interest = interests.filter(Boolean);
          console.log("Interest data:", this.resumeData.Interest);
        }

        // Fetch Links
        const linkResumeResponse = await LinkResumeService.getLinkResumeById(this.resumeId);
        console.log("Bridge table response for Link:", linkResumeResponse.data);
        if (Array.isArray(linkResumeResponse.data)) {
          const links = await Promise.all(
            linkResumeResponse.data.map(async (linkEntry) => {
              try {
                const linkResponse = await LinkService.getLinkById(linkEntry.linkId);
                return linkResponse.data;
              } catch (error) {
                console.error("Error fetching link with ID:", linkEntry.linkId, error.message);
                return null;
              }
            })
          );
          this.resumeData.Link = links.filter(Boolean);
          console.log("Link data:", this.resumeData.Link);
        }

        // Fetch Projects
        const projectResumeResponse = await ProjectResumeService.getProjectResumeById(this.resumeId);
        console.log("Bridge table response for Project:", projectResumeResponse.data);
        if (Array.isArray(projectResumeResponse.data)) {
          const projects = await Promise.all(
            projectResumeResponse.data.map(async (projectEntry) => {
              try {
                const projectResponse = await ProjectService.getProjectById(projectEntry.projectId);
                return projectResponse.data;
              } catch (error) {
                console.error("Error fetching project with ID:", projectEntry.projectId, error.message);
                return null;
              }
            })
          );
          this.resumeData.Project = projects.filter(Boolean);
          console.log("Project data:", this.resumeData.Project);
        }

        // Fetch Skills
        const skillResumeResponse = await SkillResumeService.getSkillResumeById(this.resumeId);
        console.log("Bridge table response for Skill:", skillResumeResponse.data);
        if (Array.isArray(skillResumeResponse.data)) {
          const skills = await Promise.all(
            skillResumeResponse.data.map(async (skillEntry) => {
              try {
                const skillResponse = await SkillService.getSkillById(skillEntry.skillId);
                return skillResponse.data;
              } catch (error) {
                console.error("Error fetching skill with ID:", skillEntry.skillId, error.message);
                return null;
              }
            })
          );
          this.resumeData.Skill = skills.filter(Boolean);
          console.log("Skill data:", this.resumeData.Skill);
        }
        selectedTemplate = this.resumeData.resume.templateId;
        console.log(this.resumeData);
    } catch (error) {
      console.error("Error fetching resume data:", error.response?.data || error.message);
    }
  },
  

    downloadPdf() {
      console.log("PDF download functionality to be implemented.");
    },
    goBack() {
      this.$emit("goBack")
    },
  },
};
</script>



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
      <v-col cols="12" >
        <div v-if="resumeData.Resume && loadTemplate">
          <BasicTemplate
            :key="resumeData.Resume?.id || 'basic-template'"
            v-show="selectedTemplate === 1"
            ref="basicTemplate"
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
            ref="modernTemplate"
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
            ref="gothicTemplate"
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

<style scoped>
.placeholder {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
}
</style>
