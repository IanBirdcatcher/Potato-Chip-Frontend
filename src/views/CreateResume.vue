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
  </v-container>
</template>

<script>
import PersonalInfo from "../components/PersonalInfo.vue"
import EducationInfo from "../components/EducationInfo.vue"
import ExperienceInfo from "../components/ExperienceInfo.vue"
import { reactive, ref } from 'vue';

export default {
  components: {
    PersonalInfo,
    EducationInfo,
    ExperienceInfo
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
    const componentSelected = ref(1);
    return { Person, ContactInfo, Education, componentSelected };
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