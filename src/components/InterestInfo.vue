<script setup>
import ImportModal from "../components/ImportModal.vue"
import InterestService from "../services/interestServices";
import { ref } from 'vue';
const required = (label) => (value) => !!value || `The ${label} field is required.`;
const modalEditIndex = ref(0)
</script>
<template>
    <v-form ref="InterestForm">
        <v-row align="center" justify="center">
            <v-card class="mx-auto" width="440" height="600" :style="'overflow-y: scroll'">
                <v-card-title style="text-align:center">
                    <v-row>
                        <v-col col="8">
                            <span class="text-h6">Interest</span>
                        </v-col>
                        <v-col cols="4">
                            <ImportModal :dataType="'Interest'" :keyName="'interestName'"
                                @sendToParent="handleArrayChange" />
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-row v-for="(item, index)  in Interest" :key="index">
                        <slot v-if="item.interestId == 0">
                        <v-col cols="12">
                            <v-text-field class="formField" v-model="item.interestName" label="Interest Name*"
                                :rules="[required('Interest Name')]"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea class="formField" v-model="item.interestDesc" label="Interest Description*"
                                :rules="[required('Interest Description')]"></v-textarea>
                        </v-col>
                        </slot>
                        <Slot v-else>
                            <v-col cols="10">
                                <v-row>
                                    <p>Interest Name: {{ item.interestName }}</p>
                                </v-row>
                                <v-row>
                                    <p>Interest Description: {{ item.interestDesc }}</p>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-btn @click="dialog = true, modalEditIndex = index" style="float:center"
                                    class="py-auto">
                                    <v-icon icon="mdi-pencil" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </v-col>
                        </Slot>
                        <div v-if="Interest.length > 1" class="mx-auto">
                            <v-btn @click="removeInterest(index)" style="float:left" class="my-2">
                                <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                            </v-btn>
                        </div>
                        <v-divider class="my-5"></v-divider>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                        <div class="mx-auto">
                            <v-btn @click="addNewInterest" style="float:left" class="my-2">
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
                            <v-text-field class="formField" v-model="Interest[modalEditIndex].interestName"
                                label="Interest Name*" :rules="[required('Interest Name')]" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea class="formField" v-model="Interest[modalEditIndex].interestDesc"
                                label="Interest Description*" :rules="[required('Interest Description')]"
                                density="compact"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Save" @click="saveAward(Interest[modalEditIndex])"></v-btn>
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
        Interest: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.InterestForm.validate();
            if (valid) {
                this.$emit('getNext');
            }
        },
        addNewInterest() {
            this.Interest.push({
                interestId: 0,
                userId: 0,
                interestName: "",
                interestDesc: "",
            })
        },
        handleArrayChange(data) {
            let len = 0
            for (let i = 0; i < this.Interest.length; i++) {
                if (this.Interest[i].interestId > 0 ) {
                    len++
                }
            }
            if(len > 0){
                this.Interest.splice(0, len)
            }
            for (let i in data) {
                this.Interest.unshift(data[i])
            }
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
        async saveAward(item) {
            const { valid } = await this.$refs.modalForm.validate();
            if (valid) {
                dialog.value = false
                InterestService.updateInterest(item.interestId, item)
            }
        }
    }
}
</script>