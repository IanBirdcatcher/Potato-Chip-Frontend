<template>
  <v-container>
    <div v-if="componentSelected == 0">
      <ResumeInfo @getNext="getNext" :Resume="Resume" />
    </div>
    <div v-if="componentSelected == 1">
      <PersonalInfo @getNext="getNext" :Person="Person" :ContactInfo="ContactInfo" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 2">
      <EducationInfo @getNext="getNext" :Education="Education"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 3">
      <ExperienceInfo @getNext="getNext" :Experience="Experience"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 4">
      <InterestInfo @getNext="getNext" :Interest="Interest"  @getPrevious="getPrevious"/>
    </div>    
    <div v-if="componentSelected == 5">
      <LinksInfo @getNext="getNext" :Link="Link"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 6">
      <ProjectInfo @getNext="getNext" :Project="Project"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 7">
      <AwardsInfo @getNext="getNext" :Award="Award"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 8">
      <SkillInfo @getNext="getNext" :Skill="Skill"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 9">
      <TemplateSelector :Resume="Resume":ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill"/>
    </div>
  </v-container>
</template>

<script>
import ResumeInfo from "../components/ResumeInfo.vue"
import PersonalInfo from "../components/PersonalInfo.vue";
import EducationInfo from "../components/EducationInfo.vue";
import ExperienceInfo from "../components/ExperienceInfo.vue";
import SkillInfo from "../components/SkillInfo.vue";
import InterestInfo from "../components/InterestInfo.vue";
import AwardsInfo from "../components/AwardsInfo.vue";
import ProjectInfo from "../components/ProjectInfo.vue";
import LinksInfo from "../components/LinksInfo.vue";
import TemplateSelector from "../components/TemplateSelector.vue";
import { reactive, ref } from "vue";

export default {
  components: {
    ResumeInfo,
    PersonalInfo,
    EducationInfo,
    ExperienceInfo,
    InterestInfo,
    ProjectInfo,
    AwardsInfo,
    LinksInfo,
    SkillInfo,
    TemplateSelector,
  },
  setup() {
    const Resume = reactive({
      id: 0,
      resumeName: '',
      jobTitle: '',
      ProfSummary: ''
    });
    const Person = reactive({
      id: 0,
      fName: "",
      lName: "",
    });
    const ContactInfo = reactive({
      id: 0,
      Email: "",
      PhoneNumber: "",
      Address: "",
    });
    const Education = reactive([
      {
        id: 0,
        SchoolName: "",
        Degree: "",
        GPA: 0,
      },
    ]);
    const Interest = reactive([
      {
        id: 0,
        InterestName: "",
        InterestDesc: "",
      },
    ]);
    const Experience = reactive([
      {
        id: 0,
        Organization: "",
        Title: "",
        JobDescription: "",
        Date: null,
      },
    ]);
    const Link = reactive([
      {
        id: 0,
        LinkName: "",
        LinkDesc: "",
      },
    ]);
    const Award = reactive([
      {
        id: 0,
        AwardName: "",
        AwardDesc: "",
      },
    ]);
    const Project = reactive([
      {
        id: 0,
        ProjectName: "",
        ProjectDesc: "",
      },
    ]);

    const Skill = ref([]);

    const componentSelected = ref(0);
    return { Resume, Person, ContactInfo, Education, Interest, Link, componentSelected, Experience, Award, Project, Skill};
  },

  methods: {
    getNext() {
      if(this.componentSelected < 9){
        this.componentSelected ++
      }
    },
    getPrevious() {
      if (componentSelected.value > 0) {
        componentSelected.value--;
      }
    },
  },
};
</script>
