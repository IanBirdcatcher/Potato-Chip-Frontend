<script setup>
import SocialLogin from "../components/SocialLogin.vue"
</script>

<template>
  <v-container class="circle-background">
    <v-row justify="center" align="center" class="full-height">
      <v-col cols="12" md="8" lg="6" class="center-content">
        <!-- Page Title -->
        <v-row justify="center">
          <v-col class="text-center">
            <h1 class="display-1">Welcome Back!</h1>
            <p class="subheading">Sign in to your account using your preferred method.</p>
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
  background: radial-gradient(circle, rgba(25, 118, 210, 0.8), rgba(0, 0, 0, 0.5));
  border-radius: 50%;
  padding: 10px;
}

.center-content {
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-weight: bold;
  color: #1976D2;
}

.subheading {
  font-size: 1.2rem;
  color: #616161;
}

.text-center {
  text-align: center;
}
</style>
