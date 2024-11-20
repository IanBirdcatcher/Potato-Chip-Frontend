<script setup>
import ImportModal from "../components/ImportModal.vue"
import EducationsService from '../services/educationServices';
import { ref } from 'vue';
import { VDateInput } from 'vuetify/labs/VDateInput'
const required = (label) => (value) => !!value || `The ${label} field is required.`;

const dialog = ref(false)
const modalEditIndex = ref(0)

</script>
<template>
    <div>
        <v-form ref="educationForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="400" height="600" :style="'overflow-y: scroll'">
                    <v-card-title style="text-align:center">
                        <v-row>
                            <v-col cols="8">
                                <span class="text-h6">Education</span>
                            </v-col>
                            <v-col cols="4">
                                <ImportModal :dataType="'Education'" :keyName="'major'"
                                    @sendToParent="handleArrayChange" />
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row v-for="(item, index)  in Education" :key="index">
                            <slot v-if="item.educationId == 0">
                                <v-col cols="12">
                                    <v-text-field class="formField" v-model="item.school" label="School Name"
                                        :rules="[required('School Name')]" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field class="formField" v-model="item.degree" label="Degree"
                                        density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field class="formField" v-model="item.major" label="Major"
                                        density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field class="formField" v-model="item.GPA" label="GPA"
                                        density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-date-input class="formField" v-model="item.dateRange" label="Start and End Date*"
                                        multiple="range" density="compact"></v-date-input>
                                </v-col>
                                <div v-if="Education.length > 1" class="mx-auto">
                                    <v-btn @click="removeEducation(index)" style="float:left">
                                        <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                    </v-btn>
                                </div>
                            </slot>
                            <Slot v-else>
                                <v-col cols="10">
                                    <v-row>
                                        <p> School Name: {{ item.school }}</p>
                                    </v-row>
                                    <v-row>
                                        <p>Degree: {{ item.degree }}</p>
                                    </v-row>
                                    <v-row>
                                        <p>Major: {{ item.major }}</p>
                                    </v-row>
                                    <v-row>
                                        <p>GPA: {{ item.GPA }}</p>
                                    </v-row>
                                    <v-row>
                                        <p>Start and End Date:{{ Education.dateRange }}</p>
                                    </v-row>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn @click="dialog = true, modalEditIndex = index" style="float:center"
                                        class="py-auto">
                                        <v-icon icon="mdi-pencil" style="font-size: 20px;"></v-icon>
                                    </v-btn>
                                </v-col>
                            </Slot>
                            <v-divider class="my-1"></v-divider>
                        </v-row>
                        <v-row>
                            <div class="mx-auto">
                                <v-btn @click="addNewEducation" style="float:left" class="mx-5">
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

    <v-dialog v-model="dialog" width="auto" height="auto">
        <v-card width="400" max-height="600" class="my-auto">
            <v-card-title style="text-align:center">
                Warning Editing This Could Change Existing Reumes Using This
            </v-card-title>
            <v-divider class='my-5'></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field class="formField" v-model="Education[modalEditIndex].school" label="School Name"
                            :rules="[required('School Name')]" density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="formField" v-model="Education[modalEditIndex].degree" label="Degree"
                            density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="formField" v-model="Education[modalEditIndex].major" label="Major"
                            density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="formField" v-model="Education[modalEditIndex].GPA" label="GPA"
                            density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-date-input class="formField" v-model="Education[modalEditIndex].dateRange"
                            label="Start and End Date*" multiple="range" density="compact"></v-date-input>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Save"
                    @click="saveEducation(Education[modalEditIndex]), dialog = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    components: {
        ImportModal
    },
    props: {
        Education: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.educationForm.validate();
            if (valid) {
                this.$emit('getNext');
            }
        },
        addNewEducation() {
            this.Education.push({
                educationId: 0,
                userId: 0,
                school: "",
                GPA: 0,
                degree: "",
                major: "",
                dateRange: ""
            })
        },
        removeEducation(index) {
            this.Education.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.Education.splice(0, this.Education.length);
            this.$emit('getNext');
            console.log(this.Education)
        },
        handleArrayChange(data) {
                for (let i = 0; i < this.Education.length; i++) {
                    if (this.Education[i].educationId > 0) {
                        this.Education.splice(i)
                    }
                }
                for (let i in data) {
                    this.Education.unshift(data[i])
                }
        },
        saveEducation(item) {
            EducationsService.updateEducation(item.educationId, item)
        }
    }
}
</script>