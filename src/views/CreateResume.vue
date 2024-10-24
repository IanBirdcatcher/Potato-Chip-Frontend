
<template>
    <v-container>
      <br /><br />
      <SocialLogin />
      <br /><br />
      <!-- <div v-if="location == 0"> -->
        <!-- <PersonalInfo  :Person="Person" :ContactInfo="ContactInfo" @submit-person="updatePerson" /> -->
      <!-- </div> -->
    </v-container>
  </template>
  
  
  <script>
//   import PersonalInfo from "../components/PersonalInfo.vue"
  import SocialLogin from "../components/SocialLogin.vue";
  import { reactive, provide } from 'vue';
  import { VIcon } from '../../node_modules/vuetify/lib/components/VIcon'
  export default {
    components: {
    //   PersonalInfo,
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

      var location = 0;

      return { Person, ContactInfo };
    },
    methods: {
        getNext(){
            if(location < 0){
                location = 0;
            }
            else if(location > 7){
                location = 7;
            }
            else{
                location++
            }
        }
    }
  };
  </script>
  