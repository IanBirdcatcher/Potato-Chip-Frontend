<script setup>
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="AwardForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="440" height="600" :style="'overflow-y: scroll'">
                    <v-card-title style="text-align:center">
                        <v-col col="8">
                            <span class="text-h6">Award</span>
                        </v-col>
                        <v-col cols="4">
                            <ImportModal :dataType="'Award'" :keyName="'awardName'" @sendToParent="handleArrayChange" />
                        </v-col>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row v-for="(item, index)  in Award" :key="index">
                            <v-col cols="100">
                                <v-text-field class="formField" v-model="item.awardName" label="Award Name*"
                                    :rules="[required('Award Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="item.awardDesc" label="Award Description*"
                                    :rules="[required('Award Description')]"></v-textarea>
                            </v-col>

                            <div v-if="index > 0" class="mx-auto">
                                <v-btn @click="removeAward(index)" style="float:left">
                                    <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </div>
                            <v-divider class="my-5"></v-divider>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-row>
                            <div class="mx-auto">
                                <v-btn @click="addNewAward" style="float:left" class="mx-5">
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
        Award: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.AwardForm.validate();
            if (valid) {
                //insert backend logic here
                this.$emit('getNext');
            }
        },
        addNewAward() {
            this.Award.push({
                awardId: 0,
                userId: 0,
                awardName: "",
                awardDesc: "",
                awardDate: ""
            })
        },
        handleArrayChange(data) {
                for (let i = 0; i < this.Award.length; i++) {
                    if (this.Award[i].educationId > 0) {
                        this.Award.splice(i)
                    }
                }
                for (let i in data) {
                    this.Award.unshift(data[i])
                }
        },
        removeAward(index) {
            this.Award.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.Award.splice(0, this.Award.length);
            this.$emit('getNext');
        },
    }
}
</script>