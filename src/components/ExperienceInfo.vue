<script setup>
import ImportModal from "../components/ImportModal.vue"
import ExperienceService from "../services/experienceServices";
import { ref } from 'vue';
import { VDateInput } from 'vuetify/labs/VDateInput'
const required = (label) => (value) => !!value || `The ${label} field is required.`;
const modalEditIndex = ref(0)
</script>
<template>
    <v-form ref="ExperienceForm">
        <v-row align="center" justify="center">
            <v-card class="mx-auto" width="440" height="600" :style="'overflow-y: scroll'">
                <v-card-title style="text-align:center">
                    <v-row>
                        <v-col cols="8">
                            <span class="text-h6">Experience</span>
                        </v-col>
                        <v-col cols="4">
                            <ImportModal :dataType="'Experience'" :keyName="'jobTitle'"
                                @sendToParent="handleArrayChange" />
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-row v-for="(item, index)  in Experience" :key="index">
                        <slot v-if="item.experienceId == 0">
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.jobTitle" label="Job Title*"
                                    :rules="[required('Job Title')]" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="item.jobDesc" label="Job Description*"
                                    :rules="[required('Job Description')]" density="compact"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-date-input class="formField" v-model="item.dateRange" label="Start and End Date"
                                    multiple="range" density="compact"></v-date-input>
                            </v-col>
                        </slot>
                        <Slot v-else>
                            <v-col cols="10">
                                <v-row>
                                    <p>Job Title: {{ item.jobTitle }}</p>
                                </v-row>
                                <v-row>
                                    <p>Job Description: {{ item.jobDesc }}</p>
                                </v-row>
                                <v-row v-if="item.dateRange">
                                    <p>Start and End Date:{{ new Date(item.dateRange[0]).toLocaleDateString() + " - " + new Date(item.dateRange[item.dateRange.length -1]).toLocaleDateString()}}</p>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-btn @click="dialog = true, modalEditIndex = index" style="float:center"
                                    class="py-auto">
                                    <v-icon icon="mdi-pencil" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </v-col>
                        </Slot>
                        <div v-if="Experience.length > 1" class="mx-auto">
                                <v-btn @click="removeExperience(index)" style="float:left" class="my-2">
                                    <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                        </div>
                        <v-divider class="my-5"></v-divider>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                        <div class="mx-auto">
                            <v-btn @click="addNewExperience" style="float:left">
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
                            <v-text-field class="formField" v-model="Experience[modalEditIndex].jobTitle"
                                label="Job Title*" :rules="[required('Job Title')]" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea class="formField" v-model="Experience[modalEditIndex].jobDesc"
                                label="Job Description*" :rules="[required('Job Description')]"
                                density="compact"></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-date-input class="formField" v-model="Experience[modalEditIndex].dateRange"
                                label="Start and End Date" multiple="range" density="compact"></v-date-input>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Save" @click="saveExperience(Experience[modalEditIndex])"></v-btn>
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
        Experience: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.ExperienceForm.validate();
            if (valid) {
                this.$emit('getNext');
            }
        },
        addNewExperience() {
            this.Experience.push({
                experienceId: 0,
                userId: 0,
                jobTitle: "",
                jobDesc: "",
                dateRange: null
            })
        },
        handleArrayChange(data) {
            let len = 0
            for (let i = 0; i < this.Experience.length; i++) {
                if (this.Experience[i].experienceId > 0) {
                    len++
                }
            }
            if (len > 0) {
                this.Experience.splice(0, len)
            }
            for (let i in data) {
                if(data[i].dateRange){
                    data[i].dateRange.forEach((element, index) => {
                        data[i].dateRange[index] = new Date(element);
                    });
                }
                this.Experience.unshift(data[i])
            }
        },
        removeExperience(index) {
            this.Experience.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.Experience.splice(0, this.Experience.length);
            this.$emit('getNext');
        },
        async saveExperience(item) {
            const { valid } = await this.$refs.modalForm.validate();
            if (valid) {
                dialog.value = false
                ExperienceService.updateExperience(item.experienceId, item)
            }
        }
    }
}
</script>