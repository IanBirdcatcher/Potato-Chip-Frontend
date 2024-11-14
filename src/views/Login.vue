<script setup>
import SocialLogin from "../components/SocialLogin.vue";
</script>

<template>
  <v-container class="circle-background">
    <v-row justify="center" align="center" class="full-height">
      <v-col cols="12" md="8" lg="6" class="center-content">
        <!-- Page Title -->
        <v-row justify="center">
          <v-col class="text-center">
            <h1 class="display-1 title-text">Resume builder</h1>
            <p class="subheading">Sign in to your account</p>
          </v-col>
        </v-row>
        
        <!-- Social Login Component -->
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <SocialLogin />
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

.circle-background {
  background: radial-gradient(circle at center, #9d00ff 0%, #ffffff 80%);
  padding: 20px;
}

.center-content {
  background: rgba(165, 0, 52, 0.85);
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.title-text {
  font-weight: bold;
  color: #ffffffd9;
  margin-bottom: 8px;
}

.subheading {
  font-size: 1.1rem;
  color: #ffffffb3;
  margin-bottom: 24px;
}

.text-center {
  text-align: center;
}
</style>
