<script setup>
import ImportModal from "../components/ImportModal.vue"
import AwardService from "../services/awardServices";
import { ref } from 'vue';
const required = (label) => (value) => !!value || `The ${label} field is required.`;
const modalEditIndex = ref(0)
</script>
<template>
    <v-form ref="AwardForm">
        <v-row align="center" justify="center">
            <v-card class="mx-auto" width="440" height="600" :style="'overflow-y: scroll'">
                <v-card-title style="text-align:center">
                    <v-row>
                        <v-col col="8">
                            <span class="text-h6">Award</span>
                        </v-col>
                        <v-col cols="4">
                            <ImportModal :dataType="'Award'" :keyName="'awardName'" @sendToParent="handleArrayChange" />
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-row v-for="(item, index)  in Award" :key="index">
                        <slot v-if="item.awardId == 0">
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.awardName" label="Award Name*"
                                    :rules="[required('Award Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea class="formField" v-model="item.awardDesc" label="Award Description*"
                                    :rules="[required('Award Description')]"></v-textarea>
                            </v-col>
                        </slot>
                        <Slot v-else>
                            <v-col cols="10">
                                <v-row>
                                    <p> Award Name: {{ item.awardName }}</p>
                                </v-row>
                                <v-row>
                                    <p>Award Description: {{ item.awardDesc }}</p>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-btn @click="dialog = true, modalEditIndex = index" style="float:center"
                                    class="py-auto">
                                    <v-icon icon="mdi-pencil" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </v-col>
                        </Slot>
                        <div v-if="Award.length > 1" class="mx-auto">
                                <v-btn @click="removeAward(index)" style="float:left" class="my-2">
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
    <v-form ref="modalForm">
        <v-dialog v-model="dialog" width="auto" height="auto">
            <v-card width="500" max-height="600" class="my-auto">
                <v-card-title style="text-align:center">
                    This Will Change Existing Resumes Using This
                </v-card-title>
                <v-divider class='my-5'></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field class="formField" v-model="Award[modalEditIndex].awardName"
                                label="Award Name*" :rules="[required('Award Name')]"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea class="formField" v-model="Award[modalEditIndex].awardDesc"
                                label="Award Description*" :rules="[required('Award Description')]"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Save" @click="saveAward(Award[modalEditIndex])"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-form>
</template>

<script>
const dialog = ref(false)
export default {
    components: {
        ImportModal
    },
    props: {
        Award: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.AwardForm.validate();
            if (valid) {
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
            let len = 0
            for (let i = 0; i < this.Award.length; i++) {
                if (this.Award[i].awardId > 0) {
                    len++
                }
            }
            if(len > 0){
                this.Award.splice(0,len)
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
        async saveAward(item) {
            const { valid } = await this.$refs.modalForm.validate();
            if (valid) {
                dialog.value = false
                AwardService.updateAward(item.awardId, item)
            }

        }
    }
}
</script>