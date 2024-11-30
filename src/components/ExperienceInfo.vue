<script setup>
import ImportModal from "../components/ImportModal.vue"
import { VDateInput } from 'vuetify/labs/VDateInput'
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
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

                            <div v-if="index > 0" class="mx-auto">
                                <v-btn @click="removeExperience(index)" style="float:left">
                                    <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </div>
                            <v-divider class="my-5"></v-divider>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-row>
                            <div class="mx-auto">
                                <v-btn @click="addNewExperience" style="float:left" class="mx-5">
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
    </div>
</template>

<script>
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
                //insert backend logic here
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
            for (let i = 0; i < this.Experience.length; i++) {
                if (this.Experience[i].educationId > 0) {
                    this.Experience.splice(i)
                }
            }
            for (let i in data) {
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
    }
}
</script>