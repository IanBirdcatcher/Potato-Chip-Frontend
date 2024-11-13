<script setup>
import { VDateInput } from 'vuetify/labs/VDateInput';

const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>

<template>
    <div>
        <v-form ref="ProjectForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="440" height="600" :style="'overflow-y: scroll'">
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Project</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row v-for="(item, index) in projects" :key="index">
                            <v-col cols="6">
                                <v-text-field class="formField" v-model="item.ProjectName" label="Project Name*"
                                    :rules="[required('Project Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="item.ProjectDescription" label="Project Description*" 
                                    :rules="[required('Project Description')]"></v-textarea>
                            </v-col>
                            <div v-if="index > 0" class="mx-auto">
                                <v-btn @click="removeProject(index)" style="float:left">
                                    <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </div>
                            <v-divider class="my-5"></v-divider>
                        </v-row>
                        <v-row>
                            <div class="mx-auto">
                                <v-btn @click="addNewProject" style="float:left" class="mx-5">
                                    <v-icon icon="mdi-plus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </div>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="getPrevious" style="float:left">
                            <v-icon icon="mdi-chevron-left" style="font-size: 30px;"></v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn variant="outlined" @click="skip" class="mx-auto">
                            Skip
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="submitForm" style="float:right">
                            <v-icon icon="mdi-chevron-right" style="font-size: 30px;"></v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    props: {
        projects: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.ProjectForm.validate();
            if (valid) {
                this.$emit('getNext');
            }
        },
        addNewProject() {
            this.projects.push({
                id: 0,
                ProjectName: "",
                ProjectDescription: "",
            });
        },
        removeProject(index) {
            this.projects.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.projects.splice(0, this.projects.length);
            this.$emit('getNext');
        },
    }
}
</script>
