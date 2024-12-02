<script setup>
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="ResumeInfoForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="400" height="515" >    
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Resume Info</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="Resume.resumeName" label="Resume Name*"
                                    :rules="[required('First Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="Resume.jobTitle" label="Job Title*"
                                    :rules="[required('Job Title')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="Resume.profSummary" label="Professional Summary*"
                                    :rules="[required('Professional Summary')]"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
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
    props: {
        Resume: {
            type: Object,
        }
    },
    methods:{
        async submitForm() {
            const { valid } = await this.$refs.ResumeInfoForm.validate();
            if (valid) {
                //insert backend logic here
                this.$emit('getNext');
            }
        }
    }
};
</script>