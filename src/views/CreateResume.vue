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
      <TemplateSelector :Resume="Resume" :ContactInfo="ContactInfo" :Education="Education" :Experience="Experience"
        :Interest="Interest" :Link="Link" :Project="Project" :Award="Award" :Skill="Skill" />
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
    educationId: 0,
    userId: 0,
    school: "",
    GPA: 0,
    degree: "",
    major: "",
    dateRange: null
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

const Skill = reactive([]);

const componentSelected = ref(3);

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