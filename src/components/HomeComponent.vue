<template>
  <!-- Main Template Structure ------------------ -->
  <main>
    <v-container fluid class="no-padding">
      <v-row class="no-padding">
        <!-- Toolbar Section ------------------ -->
        <v-col cols="12" class="no-padding">
          <v-toolbar flat color="#F7F6FE" dense>
            <v-toolbar-title style="margin-left: 20px;"><b>Resumes List</b></v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            
            <v-spacer></v-spacer>
            <div style="width:30%">
              <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line    
              ></v-text-field>
            </div>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-col>
      </v-row>

      <v-row class="no-padding">
        <!-- Resume List or View Resume ------------------ -->
        <v-col cols="12" class="no-padding">
          <!-- Show Resumes List -->
          <div v-if="!selectedResume">
            <v-data-table
              :headers="headers"
              :items="resumes"
              :search="search"
              :sort-by="[{ key: 'resumeName', order: 'asc' }]">
              
              <!-- Editable Columns ------------------ -->
              <template v-slot:item.resumeName="{ item }">
                <div v-if="!item.isEditingResumeName">
                  <span @click="editField(item, 'resumeName')">{{ item.resumeName }}</span>
                </div>
                <div v-else>
                  <v-text-field
                    v-model="item.resumeName"
                    label="Resume Name"
                    @blur="updateResume(item)"
                    @keyup.enter="updateResume(item)"
                    single-line
                    hide-details
                    class="edit-field"
                    autofocus
                  />
                </div>
              </template>

              <template v-slot:item.jobTitle="{ item }">
                <div v-if="!item.isEditingJob">
                  <span @click="editField(item, 'job')">{{ item.jobTitle }}</span>
                </div>
                <div v-else>
                  <v-text-field
                    v-model="item.jobTitle"
                    label="Job"
                    @blur="updateResume(item)"
                    @keyup.enter="updateResume(item)"
                    single-line
                    hide-details
                    class="edit-field"
                  />
                </div>
              </template>

              <!-- Actions Column ------------------ -->
              <template v-slot:item.actions="{ item }">
                <v-icon icon="mdi-eye" color="#624DE3" class="me-2" size="small" @click="viewItem(item)">
                  mdi-eye
                </v-icon>
                <v-icon size="small" color="#A30D11" @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </div>

          <!-- Show ViewResume Component -->
          <view-resume
            v-if="selectedResume"
            :resume-id="selectedResume.resumeId"
            @close="selectedResume = null" 
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar for Notifications ------------------ -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" top right timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </main>
</template>

<script>
import resumeService from '../services/resumeServices';
import Utils from '../config/utils';
import viewResume from "../components/viewResume.vue";

export default {
  components: {
    viewResume, 
  },
  data: () => ({
    search: '',
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: '',
    headers: [
      { title: 'Resume Name', key: 'resumeName' },
      { title: 'Template', key: 'templateName' },
      { title: 'Job', key: 'jobTitle' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    resumes: [],
    selectedResume: null, 
  }),

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      const user = Utils.getStore("user");
      const userId = user ? user.userId : null;

      if (userId) {
        resumeService.getAllForUser(userId)
          .then(response => {
            this.resumes = response.data;  
            this.resumes.forEach(resume => {
              resume.isEditingResumeName = false; 
              resume.isEditingJob = false;        
            });
          })
          .catch(error => {
            console.log("Error fetching resumes:", error);
          });
      } else {
        console.log("User ID is not available. Please ensure the user is logged in and user data is stored correctly.");
      }
    },

    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color === 'success' ? 'green' : 'red';
      this.snackbar = true;
    },

    editField(item, field) {
      if (field === 'resumeName') {
        item.isEditingResumeName = true;
        item.isEditingJob = false; 
      } else if (field === 'job') {
        item.isEditingJob = true;
        item.isEditingResumeName = false; 
      }
    },

    updateResume(item) {
      resumeService.updateResume(item.resumeId, item)
        .then(() => {
          this.showSnackbar('Resume updated successfully', 'success');
          item.isEditingResumeName = false; 
          item.isEditingJob = false;        
        })
        .catch(error => {
          this.showSnackbar('Error updating resume', 'error');
          console.log("Error updating resume:", error);
        });
    },

    viewItem(item) {
      this.selectedResume = item; 
      this.showSnackbar(`Viewing: ${item.resumeName}`, 'success');
    },

    deleteItem(item) {
      if (!item.resumeId) {  
        this.showSnackbar('Resume ID is missing', 'error');
        return; 
      }

      this.resumes = this.resumes.filter(resume => resume.resumeId !== item.resumeId);

      resumeService.deleteResume(item.resumeId)
        .then(() => {
          this.showSnackbar('Resume deleted successfully', 'success');
        })
        .catch(error => {
          this.resumes.push(item);
          this.showSnackbar('Error deleting resume', 'error');
          console.log("Error deleting resume:", error);
        });
    },
  }
};
</script>
<style scoped>
.no-padding {
  padding: 0 !important;
  margin: 0 !important;
}

.v-toolbar {
  min-height: 48px !important;
  padding: 0 16px !important;
}

.table-border {
  border: 1px solid #E0E0E0 !important;
}

.v-toolbar-title {
  line-height: 1.2 !important;
  font-size: 1.1rem;
}

.v-text-field {
  margin: 0 !important;
  padding: 0 !important;
}

.edit-field {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 1rem;
  padding-left: 8px;
}

.edit-field input:focus {
  border: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}
</style>
