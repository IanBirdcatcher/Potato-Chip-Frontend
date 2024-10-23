<script setup>
import { toRefs, ref, reactive } from 'vue';
import { mdiMenuRight } from '@mdi/js';
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="personalInfoForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" max-width="400">
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Personal Information</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field class="formField" v-model="Person.fName" label="First Name"
                                    :rules="[required('First Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field class="formField" v-model="Person.lName" label="Last Name"
                                    :rules="[required('Last Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="ContactInfo.Email" label="Email"
                                    :rules="[required('Email')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="ContactInfo.PhoneNumber" label="Phone Number"
                                    :rules="[required('Phone Number')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="ContactInfo.Address" label="Address"
                                    :rules="[required('Address')]"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <div style="float:right">
                            <v-btn @click="submitForm">
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
        Person: {
            type: Object,
        },
        ContactInfo: {
            type: Object,
        },
    },
    methods:{
        async submitForm() {
            const personalInfoForm = ref(null)
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                this.emit('PersonalInfo', { Person, ContactInfo });
            }
            else {
                console.log('Form validation failed.');
            }
        }
    }
};
</script>