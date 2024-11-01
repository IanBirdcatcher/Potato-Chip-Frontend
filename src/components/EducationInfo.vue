<script setup>
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="educationForm">
            <v-row align="center" justify="center" >
                <v-card class="mx-auto" width="400" height="515" :style="[Education.length > 1 ? 'overflow-y: scroll' : '']">
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Education</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row v-for="(item, index)  in Education" :key="index">
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.SchoolName" label="School Name"
                                    :rules="[required('School Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.Degree" label="Degree"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.GPA" label="GPA"></v-text-field>
                            </v-col>
                            <div v-if="index > 0" class="mx-auto">
                                <v-btn @click="removeEducation(index)" style="float:left">
                                    <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </div>
                            <v-divider class="my-5"></v-divider>
                            <v-spacer></v-spacer>
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
                            <v-btn variant="outlined"  @click="skip" class="mx-auto">
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
                id: 0,
                SchoolName: "",
                Degree: "",
                GPA: ""
            })
        },
        removeEducation(index) {
            this.Education.splice(index,1);
        },
        getPrevious(){
            this.$emit('getPrevious');
        },
        skip() {
            this.Education.splice(0,this.Education.length);
            this.$emit('getNext');
        },
    }
}
</script>