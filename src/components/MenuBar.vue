<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ocLogo from "/oc-logo-white.png";
import Utils from "../config/utils";

const user = ref(null);
const title = ref("Resume Builder");
const initials = ref("");
const name = ref("");
const logoURL = ref("");
const router = useRouter(); 

const resetMenu = () => {
  const storedUser = Utils.getStore("user"); 
  if (storedUser) {
    user.value = storedUser; 
    initials.value = storedUser.fName[0] + storedUser.lName[0];
    name.value = storedUser.fName + " " + storedUser.lName;
  }
};

//Switch to the Admin
const switchToAdmin = () => {
  if (user.value.isAdmin = true) {
    router.push({ name: "AdminPage" }); 
  } else {
    alert("You are not authorized to access the Admin Page.");
  }
};

//Switch back to a user
const switchToUser = () => {
  router.push({ name: "HomePage" }); 

const logout = () => {
  AuthServices.logoutUser(user.value)
    .then((response) => {
      console.log(response);
      Utils.removeItem("user");
      router.push({ name: "login" });  // Navigate to the login page after logout
    })
    .catch((error) => {
      console.log("error", error);
    });
};

onMounted(() => {
  logoURL.value = ocLogo;
  resetMenu();
});
</script>

<template>
  <div>
    <v-app-bar app>
      <router-link :to="{ name: 'HomePage' }">
        <v-img class="mx-2" :src="logoURL" height="50" width="50" contain></v-img>
      </router-link>
      <v-toolbar-title class="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" :to="{ name: 'CreateResume' }"> Create Resume </v-btn>

      <v-menu bottom min-width="200px" rounded offset-y v-if="user">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon x-large>
            <v-avatar v-if="user" color="secondary">
              <span class="accent--text font-weight-bold">{{ initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="secondary" class="mt-2 mb-2">
                <span class="accent--text font-weight-bold">{{ initials }}</span>
              </v-avatar>
              <h3>{{ name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn v-if="user.isAdmin === true && $route.name !== 'AdminPage'" class="mx-2"
                color="primary" @click="switchToAdmin">
                Switch To Admin
              </v-btn>
              <v-btn v-if="user.isAdmin == true && $route.name === 'AdminPage'" class="mx-2"
                color="primary" @click="switchToUser">
                Switch To User
              </v-btn>
              <v-btn depressed rounded text @click="logout"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>