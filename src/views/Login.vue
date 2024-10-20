<script setup>
import SocialLogin from "../components/SocialLogin.vue";
import { VIcon } from '../../node_modules/vuetify/lib/components/VIcon'
import { ref } from 'vue';
var location = 0;
const formData = ref(null);

const handleFormSubmission = (data) => {
  console.log('Form data from child:', data);
}

</script>

<template>
  <v-container>
    <br /><br />
    <SocialLogin />
    <br /><br />
    <div v-if="location == 0">
      <PersonalInfo @submitFormData="handleFormSubmission" />
    </div>
  </v-container>
</template>


<script>
import PersonalInfo from "../components/PersonalInfo.vue"

export default {
  components: {
    PersonalInfo,
  }
};
</script>