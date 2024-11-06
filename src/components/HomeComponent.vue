<template>
    <!-- Main Template Structure ------------------ -->
    <main>
      <!-- External CSS Stylesheet Link ------------------ -->
      <head>
        <link href="./assets/main.css" rel="stylesheet" />
      </head>
  
      <!-- Toolbar Section: Top bar with title and search field ------------------ -->
      <v-container fluid class="no-padding">
        <v-row class="no-padding">
          <v-col cols="12" class="no-padding">
            <v-toolbar flat color="#F7F6FE" dense>
              <!-- Title for Toolbar ------------------ -->
              <v-toolbar-title style="margin-left: 20px;"><b>Resumes List</b></v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              
              <!-- Search Field in Toolbar ------------------ -->
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
  
        <!-- Resumes Data Table Section ------------------ -->
        <v-row class="no-padding">
          <v-col cols="12" class="no-padding">
            <!-- Main Data Table for Resumes ------------------ -->
            <v-data-table
              :headers="headers"
              :items="resumes"
              :search="search"
              :sort-by="[{ key: 'resumeName', order: 'asc' }]"
              class="table-border">
              
              <!-- Actions Column: View and Delete Icons ------------------ -->
              <template v-slot:item.actions="{ item }">
                <v-icon icon="mdi-eye" color="#624DE3" class="me-2" size="small" @click="viewItem(item)">
                  mdi-eye
                </v-icon>
                <v-icon size="small" color="#A30D11" @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
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
    // Import Statements and Component Definition ------------------
    import { defineComponent } from 'vue';
    import { VDataTable } from 'vuetify/labs/VDataTable';
    import { VToolbar, VTextField, VIcon, VDivider, VContainer, VRow, VCol, VSpacer, VSnackbar } from 'vuetify/components';
  
    export default defineComponent({
      // Components Registration ------------------
      components: {
        VDataTable,
        VToolbar,
        VTextField,
        VIcon,
        VDivider,
        VContainer,
        VRow,
        VCol,
        VSpacer,
        VSnackbar,
      },
  
      // Data Properties ------------------
      data: () => ({
        search: '',
        snackbar: false,
        snackbarMessage: '',
        snackbarColor: '',
        headers: [
          { title: 'Resume Name', key: 'resumeName' },
          { title: 'Template', key: 'template' },
          { title: 'Job', key: 'job' },
          { title: 'Actions', key: 'actions', sortable: false }
        ],
        resumes: [
          { resumeID: 1, resumeName: '1 Resume', template: 'Basic', job: 'Software Developer' },
          { resumeID: 2, resumeName: '2 Resume', template: 'Modern', job: 'Project Manager' }
        ],
      }),
  
      // Methods for Event Handling ------------------
      methods: {
        // Show Snackbar with a Message ------------------
        showSnackbar(message, color) {
          this.snackbarMessage = message;
          this.snackbarColor = color === 'success' ? 'green' : 'red';
          this.snackbar = true;
        },
  
        // View Item Action ------------------
        viewItem(item) {
          this.showSnackbar(`Viewing: ${item.resumeName}`, 'success');
          //view resume code here
        },
  
        // Delete Item Action ------------------
        deleteItem(item) {
          this.resumes = this.resumes.filter(resume => resume.resumeID !== item.resumeID);
          this.showSnackbar('Resume deleted successfully', 'success');
        },
      }
    });
  </script>
  
  <style scoped>
    /* Container Padding Removal ------------------ */
    .no-padding {
      padding: 0 !important;
      margin: 0 !important;
    }
  
    /* Toolbar Styling ------------------ */
    .v-toolbar {
      min-height: 48px !important;
      padding: 0 16px !important;
    }
  
    /* Data Table Border ------------------ */
    .table-border {
      border: 1px solid #E0E0E0 !important;
    }
  
    /* Toolbar Title Styling ------------------ */
    .v-toolbar-title {
      line-height: 1.2 !important;
      font-size: 1.1rem;
    }
  
    /* Search Field Styling ------------------ */
    .v-text-field {
      margin: 0 !important;
      padding: 0 !important;
    }
  </style>
  