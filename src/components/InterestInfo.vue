<script setup>
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="InterestForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="440" height="600"
                    :style="'overflow-y: scroll'">
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Interest</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row v-for="(item, index)  in Interest" :key="index">
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.InterestName" label="Interest Name*"
                                    :rules="[required('Interest Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="item.InterestDesc" label="Interest Description*" 
                                :rules="[required('Interest Description')]"></v-textarea>
                            </v-col>

                            <div v-if="index > 0" class="mx-auto">
                                <v-btn @click="removeInterest(index)" style="float:left">
                                    <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </div>
                            <v-divider class="my-5"></v-divider>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-row>
                            <div class="mx-auto">
                                <v-btn @click="addNewInterest" style="float:left" class="mx-5">
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
    props: {
        Interest: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.InterestForm.validate();
            if (valid) {
                //insert backend logic here
                this.$emit('getNext');
            }
        },
        addNewInterest() {
            this.Interest.push({
                id: 0,
                InterestName: "",
                InterestDesc: ""
            })
        },
        removeInterest(index) {
            this.Interest.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.Interest.splice(0, this.Interest.length);
            this.$emit('getNext');
        },
    }
}
</script>