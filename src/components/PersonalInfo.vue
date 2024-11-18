<script setup>
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="personalInfoForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="400" height="515" >    
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
                        <div>
                            <v-btn @click="getPrevious" style="float:left">
                                <v-icon icon="mdi-chevron-left" style="font-size: 30px;"></v-icon>
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
            const { valid } = await this.$refs.personalInfoForm.validate();
            if (valid) {
                console.log( "contact info from PersonalInfo: ",this.ContactInfo)
                this.$emit('updateContactInfo', this.ContactInfo);
                this.$emit('getNext');
            }
        },
        getPrevious() {
            this.$emit('getPrevious');
        }
    }
};
</script>