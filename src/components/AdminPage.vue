
<script>
import Utils from "../config/utils.js";
import userServices from "../services/userServices.js";
import resumeServices from "../services/resumeServices.js";
import { ref } from "vue"
export default {
  setup(){
      const loadData = ref(false)
      return {loadData}
    },
  data() {
    return {
      headers: [{ title: "All Users", key: "name" }],
      users: [],
      filteredUsers: [],
      searchQuery: "",
      dropdowns: {}
    };
  },

  methods: {
    async initialize() {
      const admin = Utils.getStore("user");
      if (admin.isAdmin = false) {
        console.log("Admin user not found.");
        return;
      }
      // Check if we're in development mode and use test data
      await userServices.getAllUsers()
        .then((response) => {
          this.users = response.data;
          this.filteredUsers = this.users;
          this.users.forEach((user) => {
            user.resumes = [];
          });
        })
        .catch((error) => {
          console.log("Error fetching users:", error);
        });
    },
    searchUsers() {
      if (this.searchQuery.trim() === "") {
        this.filteredUsers = this.users;
      } else {
        this.filteredUsers = this.users.filter((user) =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    fetchResumes(userId) {
      if (this.dropdowns[userId]) {
        this.dropdowns[userId] = false;
        return;
      }
      this.users.forEach((user) => {
        resumeServices.getAllForUser(user.userId)
          .then((response) => {
            const user = this.users.find((user) => user.id === userId);
            if (user) {
              user.resumes = response.data || [];
              this.dropdowns[userId] = true;
            }
          })
          .catch((error) => {
            console.log("Error fetching resumes for user:", userId, error);
          });

      })

    },
    navigateToHome(resumeId) {
      this.$router.push({ name: "AdminView", query: { resumeId } });
    }
  },
  watch: {
    searchQuery() {
      this.searchUsers();
    }
  },
  async mounted() {
    await this.initialize();
    this.loadData = true;
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.v-data-table {
  margin: 0 auto;
  width: 50%;
}

.v-data-table th {
  background-color: #624de3;
  color: white;
  font-size: 18px;
  text-align: left !important;
}

.v-data-table td {
  font-size: 16px;
  text-align: left !important;
}

.v-data-table .user-row-btn {
  text-align: left !important;
}

.user-name {
  text-align: left !important;
  width: 100%;
  display: block;
}

.clickable-user {
  color: red;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.clickable-user:hover {
  color: maroon;
}

.dropdown {
  margin: 10px 0 0;
  padding: 10px;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ddd;
  text-align: left;
}

.dropdown li {
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.dropdown li:last-child {
  border-bottom: none;
}

.dropdown li:hover {
  background-color: #f4f4f4;
}

.user-row-btn {
  font-size: 20px;
  font-weight: bold;
  color: #424242;
  justify-content: left;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
}

.user-row-btn:hover {
  background-color: #f4f4f4;
  cursor: pointer;
}
</style>



<template>
  <div class="admin-page">
    <h1>Admin Dashboard</h1>

    <!-- Search Bar -->
    <v-container fluid class="no-padding">
      <v-row class="no-padding" justify="center">
        <v-col cols="12" md="4" class="no-padding">
          <v-text-field v-model="searchQuery" label="Search Users" prepend-inner-icon="mdi-magnify" variant="outlined"
            hide-details single-line style="width: 100%;" @input="searchUsers" clearable></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="mx-4" inset vertical></v-divider>
    <!-- Users Table -->
    <v-container fluid class="no-padding">
      <v-row class="no-padding">
        <v-col cols="12" class="no-padding">
          <!-- Main Data Table for Users -->
          <v-data-table :headers="headers" :items="filteredUsers" class="user-table" v-if="loadData">
            <!-- Row for User Names -->
            <template v-slot:item.name="{ item }">
              <v-btn class="user-row-btn" @click="fetchResumes(item.id)" block text>
                {{ item.fName + " " + item.lName }}
              </v-btn>

              <!-- Dropdown for resumes -->
              <ul v-if="dropdowns[item.id]" class="dropdown">
                <li v-if="!item.resumes || item.resumes.length === 0">
                  This user has no resumes.
                </li>
                <li v-for="resume in item.resumes" :key="resume.id" @click="navigateToHome(resume.id)">
                  {{ resume.resumeName }}
                </li>
              </ul>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>