<script setup>
import ImportModal from "../components/ImportModal.vue"
import ProjectService from "../services/projectServices";
import { ref } from 'vue';
const modalEditIndex = ref(0)
</script>
<template>
    <v-form ref="ProjectForm">
        <v-row align="center" justify="center">
            <v-card class="mx-auto" width="440" height="600" :style="'overflow-y: scroll'">
                <v-card-title style="text-align:center">
                    <v-row>
                        <v-col col="8">
                            <span class="text-h6">Project</span>
                        </v-col>
                        <v-col cols="4">
                            <ImportModal :dataType="'Project'" :keyName="'projectName'"
                                @sendToParent="handleArrayChange" />
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-row v-for="(item, index) in Project" :key="index">
                        <slot v-if="item.projectId == 0">
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.projectName" label="Project Name*"
                                    :rules="[required('Project Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="item.projectDesc" label="Project Description*"
                                    :rules="[required('Project Description')]"></v-textarea>
                            </v-col>
                        </slot>
                        <Slot v-else>
                            <v-col cols="10">
                                <v-row>
                                    <p> Project Name: {{ item.projectName }}</p>
                                </v-row>
                                <v-row>
                                    <p>Project Description: {{ item.projectDesc }}</p>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-btn @click="dialog = true, modalEditIndex = index" style="float:center"
                                    class="py-auto">
                                    <v-icon icon="mdi-pencil" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </v-col>
                        </Slot>
                        <div v-if="Project.length > 0" class="mx-auto">
                            <v-btn @click="removeProject(index)" style="float:left" class="my-3">
                                <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                            </v-btn>
                        </div>
                        <v-divider class="my-5"></v-divider>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                        <div class="mx-auto">
                            <v-btn @click="addNewProject" style="float:left" class="mx-5">
                                <v-icon icon="mdi-plus" style="font-size: 20px;"></v-icon>
                            </v-btn>
                        </div>
                    </v-row>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions style="position: relative; bottom: 0;">
                    <div>
                        <v-btn @click="getPrevious" style="float:left">
                            <v-icon icon="mdi-chevron-left" style="font-size: 30px;"></v-icon>
                        </v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn variant="outlined" @click="skip" class="mx-auto">
                            Skip
                        </v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn @click="submitForm" style="float:right">
                            <v-icon icon="mdi-chevron-right" style="font-size: 30px;"></v-icon>
                        </v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-form>
    <v-form ref="modalForm">
        <v-dialog v-model="dialog" width="auto" height="auto">
            <v-card width="500" max-height="600" class="my-auto">
                <v-card-title style="text-align:center">
                    This Will Change Existing Resumes Using This
                </v-card-title>
                <v-divider class='my-5'></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field class="formField" v-model="Project[modalEditIndex].projectName"
                                label="Project Name*" :rules="[required('Project Name')]"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea class="formField" v-model="Project[modalEditIndex].projectDesc"
                                label="Project Description*" :rules="[required('Project Description')]"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Save" @click="saveProject(Project[modalEditIndex])"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
const dialog = ref(false)
export default {
    components: {
        ImportModal
    },
    props: {
        Project: {
            type: Object,
        },
    },
    methods: {
        required(label) {
            return (value) => !!value || `The ${label} field is required.`;
        },
        async submitForm() {
            const { valid } = await this.$refs.ProjectForm.validate();
            if (valid) {
                this.$emit('getNext');
            }
        },
        addNewProject() {
            this.Project.push({
                projectId: 0,
                userId: 0,
                projectName: "",
                projectDesc: "",
                projectDate: ""
            });
        },
        handleArrayChange(data) {
            let len = 0
            for (let i = 0; i < this.Project.length; i++) {
                if (this.Project[i].projectId > 0) {
                    len++
                }
            }
            if (len > 0) {
                this.Project.splice(0, len)
            }
            for (let i in data) {
                this.Project.unshift(data[i])
            }
        },
        removeProject(index) {
            this.Project.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.Project.splice(0, this.Project.length);
            this.$emit('getNext');
        },
        async saveProject(item) {
            const { valid } = await this.$refs.modalForm.validate();
            if (valid) {
                dialog.value = false
                ProjectService.updateProject(item.projectId, item)
            }
        }
    }
}
</script>
