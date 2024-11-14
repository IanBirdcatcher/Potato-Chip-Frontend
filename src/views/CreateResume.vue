
<template>
  <v-container>
    <div v-if="componentSelected == 0">
      <PersonalInfo @getNext="getNext" :Person="Person" :ContactInfo="ContactInfo" />
    </div>
    <div v-if="componentSelected == 1">
      <EducationInfo @getNext="getNext" :Education="Education"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 2">
      <ExperienceInfo @getNext="getNext" :Experience="Experience"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 3">
      <InterestInfo @getNext="getNext" :Interest="Interest"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 4">
      <ProjectInfo @getNext="getNext" :Award="Award"  @getPrevious="getPrevious"/>
    </div>
    <div v-if="componentSelected == 5">
      <AwardsInfo @getNext="getNext" :Project="Project"  @getPrevious="getPrevious"/>
    </div>
  </v-container>
</template>

<script>
import PersonalInfo from "../components/PersonalInfo.vue"
import EducationInfo from "../components/EducationInfo.vue"
import ExperienceInfo from "../components/ExperienceInfo.vue"
import InterestInfo from "../components/InterestInfo.vue"
import AwardsInfo from "../components/AwardsInfo.vue"
import ProjectInfo from "../components/ProjectInfo.vue";

import { reactive, ref } from 'vue';

export default {
  components: {
    PersonalInfo,
    EducationInfo,
    ExperienceInfo,
    InterestInfo,
    ProjectInfo,
    AwardsInfo
  },
  setup() {
    const Person = reactive({
      id: 0,
      fName: '',
      lName: ''
    });
    const ContactInfo = reactive({
      id: 0,
      Email: '',
      PhoneNumber: '',
      Address: ''
    });
    const Education = reactive([
      {
        id: 0,
        SchoolName: "",
        Degree: "",
        GPA: 0
      }
    ]);
    const Experience = reactive([
      {
        id: 0,
        Organization: "",
        Title:"",
        JobDescription: "",
        Date: null
      }
    ]);
    const Interest = reactive([
      {
        id: 0,
        InterestName: "",
        InterestDesc: "",
      }
    ]);
    const Project = reactive([
      {
        id: 0,
        ProjectName: "",
        ProjectDesc: "",
      }
    ]);
    const Award = reactive([
      {
        id: 0,
        AwardName: "",
        AwardDesc: "",
      }
    ]);
    const componentSelected = ref(0);
    return { Person, ContactInfo, Education, Interest, componentSelected, Experience, Project, Award };
  },
  methods: {
    getNext() {
      if(this.componentSelected < 7){
        this.componentSelected ++
      }
    },
    getPrevious() {
      if (this.componentSelected > 0) {
        this.componentSelected --
      }
    }
  }
};
</script>