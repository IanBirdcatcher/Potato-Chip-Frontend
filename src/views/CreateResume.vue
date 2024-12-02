<template>
  <v-container>
    <div v-if="componentSelected == 0">
      <ResumeInfo @getNext="getNext" :Resume="Resume" />
    </div>
    <div v-if="componentSelected == 1">
      <PersonalInfo @getNext="getNext" :Person="Person" :ContactInfo="ContactInfo" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 2">
      <EducationInfo @getNext="getNext" :Education="Education" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 3">
      <ExperienceInfo @getNext="getNext" :Experience="Experience" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 4">
      <InterestInfo @getNext="getNext" :Interest="Interest" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 5">
      <LinksInfo @getNext="getNext" :Link="Link" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 6">
      <ProjectInfo @getNext="getNext" :Project="Project" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 7">
      <AwardsInfo @getNext="getNext" :Award="Award" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 8">
      <SkillInfo @getNext="getNext" :Skill="Skill" @getPrevious="getPrevious" />
    </div>
    <div v-if="componentSelected == 9">
      <TemplateSelector :Resume="Resume" :ContactInfo="ContactInfo" :Education="Education" :Experience="Experience" :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill"/>
    </div>
    <v-dialog v-model="dialog" width="auto" height="300" persistent>
      <v-card title="It looks like you didn't finish a resume!"
        subtitle="Warning you will loose any new data you put in this resume">
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ms-auto" text="Delete" @click="Utils.removeItem('resume'), dialog = false" color="red"
            variant="tonal" style="float:right"></v-btn>
          <v-btn class="ms-auto" text="Continue" @click="mountUserData(), dialog = false" color="green" variant="tonal"
            style="float:right"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
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
import Utils from "../config/utils";
import { reactive, ref, onUnmounted, onMounted } from "vue";

const Resume = reactive({
  id: 0,
  userId: 0,
  resumeName: '',
  jobTitle: '',
  profSummary: ''
});
const Person = reactive({
  id: 0,
  userId: 0,
  fName: "",
  lName: "",
});
const ContactInfo = reactive({
  contactInfoId: 0,
  userId: 0,
  email: "",
  phone: "",
  address: "",
});
const Education = reactive([
  {
    educationId: 0,
    userId: 0,
    school: "",
    GPA: null,
    degree: "",
    major: "",
    dateRange: null
  },
]);
const Interest = reactive([
  {
    interestId: 0,
    userId: 0,
    interestName: "",
    interestDesc: "",
  },
]);
const Experience = reactive([
  {
    experienceId: 0,
    userId: 0,
    jobTitle: "",
    jobDesc: "",
    dateRange: null
  },
]);
const Link = reactive([
  {
    linkId: 0,
    userId: 0,
    linkName: "",
    link: "",
  },
]);
const Award = reactive([
  {
    awardId: 0,
    userId: 0,
    awardName: "",
    awardDesc: "",
    awardDate: ""
  },
]);
const Project = reactive([
  {
    projectId: 0,
    userId: 0,
    projectName: "",
    projectDesc: "",
    projectDate: ""
  },
]);

const Skill = reactive([]);

const componentSelected = ref(0);

function getNext() {
  if (componentSelected.value < 9) {
    componentSelected.value++
  }
}
function getPrevious() {
  if (componentSelected.value > 0) {
    componentSelected.value--;
  }
}
onUnmounted(() => {
  if (componentSelected.value != 9 && (Resume.jobTitle || Resume.resumeName || Resume.ProfSummary)) {
    const resume = ref({ Resume, Person, ContactInfo, Education, Experience, Interest, Link, Project, Award, Skill, componentSelected })
    Utils.setStore("resume", resume.value)
  }
  else {
    Utils.removeItem("resume")
  }
});

const storedResume = ref()
const dialog = ref(false)
onMounted(() => {
  storedResume.value = Utils.getStore("resume")
  if (storedResume.value != null) {
    dialog.value = true
  }
});

function mountUserData() {
  console.log("Saving Data")
  componentSelected.value = storedResume.value.componentSelected
  Object.assign(Resume, storedResume.value.Resume)
  Object.assign(Person, storedResume.value.Person)
  Object.assign(ContactInfo, storedResume.value.ContactInfo)
  Object.assign(Education, storedResume.value.Education)
  Object.assign(Experience, storedResume.value.Experience)
  Object.assign(Interest, storedResume.value.Interest)
  Object.assign(Link, storedResume.value.Link)
  Object.assign(Project, storedResume.value.Project)
  Object.assign(Award, storedResume.value.Award)
  Object.assign(Skill, storedResume.value.Skill)
}
</script>