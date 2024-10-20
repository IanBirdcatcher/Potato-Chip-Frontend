<script setup>
import { ref, reactive } from 'vue';
import { mdiMenuRight } from '@mdi/js';

const required = (label) => (value) => !!value || `The ${label} field is required.`;

const Person = reactive({
    id: 0,
    fName: '',
    lName: ''
});

const ContactInfo = reactive({
    id: 0,
    Email: '',
    PhoneNumber: '',
    Address: ''
});

const personalInfoForm = ref(null);
const emit = defineEmits(['submitFormData']);

const savePersonalInfo = () => {
    personalInfoForm.value.validate().then((isValid) => {
        if (isValid) {
            emit('submitFormData', { Person, ContactInfo });
            //Add backend submit here.
            console.log(1)
        } else {
            console.log('Form validation failed.');
        }
    });
};

</script>

<template>
    <div>
        <v-form ref="personalInfoForm" @submit.prevent="savePersonalInfo">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" max-width="400">
                    <v-card-title style="text-align: center;">
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
                            <v-btn type="submit">
                                <v-icon icon="mdi-chevron-right" style="font-size: 30px;"></v-icon>
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-form>
    </div>
</template>
