<script setup>
import SocialLogin from "../components/SocialLogin.vue";
</script>

<template>
  <v-container class="split-background">
    <v-row justify="center" align="center" class="full-height">
      <v-col cols="12" md="6" lg="4" class="login-card">
        <v-row justify="center">
          <v-col class="t-center">
    
            <h1 class="display-1 title-text">Resume Builder</h1>

            <p class="subheading">Sign in with Google</p>
          </v-col>
        </v-row>

        <!-- the google button -->
        <v-row justify="center" class="mt-5">
          <v-col cols="12" class="text-center">
            <SocialLogin /> <!-- the google comp -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .full-height {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .split-background {
    background: linear-gradient(120deg, #8b0000 50%, #ffffff 50%);
    position:relative;
    
  }

  .login-card {
    background: #ffffff; 
    padding: 4px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
    border: 1px solid #e0e0e0; 
  }

  .title-text {
    font-weight: bold;
    color: #8b0000; 
  } 

  .subheading {
    font-size: 1.2rem;
    color: #4c4c4c; 
    margin-bottom: 32px;
  }

  .t-center {
    text-align: center;
  }
</style>
