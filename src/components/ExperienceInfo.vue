<script setup>
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="ExperienceForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="400" height="515"
                    :style="[Experience.length > 1 ? 'overflow-y: scroll' : '']">
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Experience</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row v-for="(item, index)  in Experience" :key="index">
                            <v-col cols="6">
                                <v-text-field class="formField" v-model="item.Organization" label="Organization Name"
                                    :rules="[required('School Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field class="formField" v-model="item.Title" label="Job Title"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="item.JobDescription"
                                    label="Job Description"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-date-input class="formField" v-model="item.Date" label="Select Date range"
                                    multiple="range"></v-date-input>
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
import { VDateInput } from 'vuetify/labs/VDateInput'
export default {
    components: {
        VDateInput
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
                id: 0,
                Organization: "",
                Title: "",
                JobDescription: "",
                Date: null
            })
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