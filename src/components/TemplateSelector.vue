<script setup>
import { onMounted } from "vue";
import Utils from "../config/utils";
onMounted(() => {
  Utils.removeItem("resume")
});
</script>
<script>
import BasicTemplate from './BasicTemplate.vue';
import ModernTemplate from '../components/ModernTemplate.vue';
import GothicTemplate from '../components/GothicTemplate.vue';

import ResumeService from '../services/resumeServices';
import AwardService from '../services/awardServices';
import AwardResumeService from '../services/awardResumeServices';
import ContactInfoService from '../services/contactInfoServices';
import ContactInfoResumeService from '../services/contactInfoResumeServices';
import EducationService from '../services/educationServices';
import EducationResumeService from '../services/educationResumeServices';
import ExperienceService from '../services/experienceServices';
import ExperienceResumeService from '../services/experienceResumeServices';
import InterestService from '../services/interestServices';
import InterestResumeService from '../services/interestResumeServices';
import LinkService from '../services/linkServices';
import LinkResumeService from '../services/linkResumeServices';
import ProjectService from '../services/projectServices';
import ProjectResumeService from '../services/projectResumeServices';
import SkillService from '../services/skillServices';
import SkillResumeService from '../services/skillResumeServices';
import Utils from "../config/utils";
import Router from "../router"

export default {
  name: 'TemplateSelector',
  components: {
    BasicTemplate,
    ModernTemplate,
    GothicTemplate,
  },
  props: {
    Resume: { type: Object, required: true },
    ContactInfo: { type: Object, required: true },
    Award: { type: Array, required: true },
    Education: { type: Array, required: true },
    Experience: { type: Array, required: true },
    Interest: { type: Array, required: true },
    Link: { type: Array, required: true },
    Project: { type: Array, required: true },
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

    // Saves the resume content
    async save() {
        // create new resume
        const templateName = ( this.selectedTemplate === 1 ? "Basic Template" : this.selectedTemplate === 2 ? "Modern Template" : "Gothic Template" )
        
        const user = Utils.getStore("user");
        const userId = user ? user.userId : null;
        let currResumeId = null

        await ResumeService.createResume(
          {
            "resumeName": this.Resume.resumeName,
            "templateId": this.selectedTemplate,
            "templateName": templateName,
            "profSummary": this.Resume.profSummary,
            "jobTitle": this.Resume.jobTitle,
            "userId": userId
          }
        )
        .then((res) => {
          currResumeId = res.data.resumeId
        })

        // for all resume items, if item does not exist (i.e. has no id)
        // then create a new instance of that resumeItem,
        // else move on
        if (this.ContactInfo.id == 0) {
          ContactInfoService.createContactInfo(
            {
              "email": this.ContactInfo.Email,
              "phone": this.ContactInfo.PhoneNumber,
              "address": this.ContactInfo.Address
            }
          )
          .then((res) => {
            ContactInfoResumeService.createContactInfoResume({
              "resumeId": currResumeId, 
              "contactInfoId": res.data.data.contactInfoId
            })
          })
        } else {
            ContactInfoResumeService.createContactInfoResume({
                "resumeId": currResumeId, 
                "contactInfoId": contactInfo.contactInfoId
             })
           }
        
        this.Award.forEach(award => {
          if (award.id == 0) {
            AwardService.createAward({
              "awardName": award.AwardName,
              "awardDesc": award.AwardDesc,
              "userId": userId
            })
            .then((res) => {
              AwardResumeService.createAwardResume({
              "resumeId": currResumeId, 
              "awardId": res.data.awardId
              })
            })
          } else {
            AwardResumeService.createAwardResume({
                "resumeId": currResumeId, 
                "awardId": award.awardId
             })
           }
        });

        // Implement after education component is fixed.
        this.Education.forEach(education => {
          if (education.educationId == 0) {
            EducationService.createEducation({
              school: education.school,
              GPA: education.GPA,
              major: education.major,
              degree: education.degree,
              dateRange: education.dateRange,
              userId: userId
            })
             .then((res) => {
               EducationResumeService.createEducationResume({
                "resumeId": currResumeId, 
                "educationId": res.data.educationId
             })

           }) 
          } else {
            EducationResumeService.createEducationResume({
                "resumeId": currResumeId, 
                "educationId": education.educationId
             })
           }
        });

        this.Experience.forEach(experience => {
          if (experience.id == 0) {
            ExperienceService.createExperience({
              "organizationName": experience.Organization,
              "jobTitle": experience.Title,
              "jobDesc": experience.JobDescription,
              "dateRange": experience.dateRange,
              "userId": userId
            })
            .then((res) => {
              ExperienceResumeService.createExperienceResume({
                "resumeId": currResumeId, 
                "experienceId": res.data.experienceId
              })
            })
          } else {
            ExperienceResumeService.createExperienceResume({
                "resumeId": currResumeId, 
                "experienceId": experience.experienceId
             })
           }
        });

        this.Interest.forEach(interest => {
            if (interest.id == 0) {
            InterestService.createInterest({
              "interestName": interest.InterestName,
              "interestDesc": interest.InterestDesc,
              "userId": userId
            })
            .then((res) => {
              InterestResumeService.createInterestResume({
                "resumeId": currResumeId, 
                "interestId": res.data.interestId
              })
            })
          } else {
            InterestResumeService.createInterestResume({
                "resumeId": currResumeId, 
                "interestId": interest.interestId
             })
           }
        });

        this.Link.forEach(link => {
          if (link.id == 0) {
            LinkService.createLink({
              "linkName": link.LinkName,
              "link": link.LinkDesc,
              "userId": userId
            })
            .then((res) => {
              LinkResumeService.createLinkResume({
                "resumeId": currResumeId, 
                "linkId": res.data.linkId
              })
            })
          } else {
            LinkResumeService.createLinkResume({
                "resumeId": currResumeId, 
                "linkId": link.linkId
             })
           }
        });

        this.Project.forEach(project => {
          if (project.id == 0 ) {  
            ProjectService.createProject({
              "projectName": project.ProjectName,
              "projectDesc": project.ProjectDesc,
              "userId": userId
            })
            .then((res) => {
              ProjectResumeService.createProjectResume({
                "resumeId": currResumeId, 
                "projectId": res.data.projectId
              })
            })
          } else {
            ProjectResumeService.createProjectResume({
                "resumeId": currResumeId, 
                "projectId": project.projectId
             })
           }
        });

        this.Skill.forEach(skill => {
          if (skill.id == 0) {  
            SkillService.createSkill({
              "skill": skill.Skill,
              "userId": userId
            })
            .then((res) => {
              SkillResumeService.createSkillResume({
              "resumeId": currResumeId, 
              "skillId": res.data.skillId
              })
            })
          } else {
            SkillResumeService.createSkillResume({
                "resumeId": currResumeId, 
                  "skillId": skill.skillId
             })
           }
        });


        // route to homepage
        Router.push({ name: 'HomePage' });
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
      <BasicTemplate v-show="selectedTemplate === 1" ref="basicTemplate":Resume="Resume":ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project":Award="Award" :Skill="Skill" />
      <ModernTemplate v-show="selectedTemplate === 2" ref="modernTemplate":Resume="Resume":ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill" />
      <GothicTemplate v-show="selectedTemplate === 3" ref="gothicTemplate":Resume="Resume":ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill" />
    </div>
    
    <v-btn color="#007BFF" class="float-left" @click="generatePDF()"> 
    PDF
    </v-btn>
    <v-btn color="#28a745" class="float-right"
        @click=save>
    Save
    </v-btn>

  </v-card>
</template>

