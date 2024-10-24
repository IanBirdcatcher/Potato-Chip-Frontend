
<template>
    <v-container>
      <br /><br />
      <SocialLogin />
      <br /><br />

      <div v-if="componentSelected == 0">
        <PersonalInfo @getNext="getNext" :Person="Person" :ContactInfo="ContactInfo" @submit-person="updatePerson" />
      </div>
    </v-container>
  </template>
  
  <script>
  import PersonalInfo from "../components/PersonalInfo.vue"
  import SocialLogin from "../components/SocialLogin.vue";
  import { reactive, ref, provide } from 'vue';
  import { VIcon } from '../../node_modules/vuetify/lib/components/VIcon'
  export default {
    components: {
        PersonalInfo,
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
      const componentSelected = ref(0);
      return { Person, ContactInfo,componentSelected };
    },
    methods: {
        getNext(){
            if(this.componentSelected < 0){
                this.componentSelected = 0;
            }
            else if(this.componentSelected > 7){
                this.componentSelected = 7;
            }
            else{
                this.componentSelected++

            }
        }
    }
  };
  </script>
  