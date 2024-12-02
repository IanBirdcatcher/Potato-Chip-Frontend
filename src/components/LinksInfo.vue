<script setup>
import ImportModal from "../components/ImportModal.vue"
import LinkService from "../services/linkServices";
import { ref } from 'vue';
const modalEditIndex = ref(0)
const required = (label) => (value) => !!value || `The ${label} field is required.`;
const validURL = (value) => {
    const pattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/;
    return pattern.test(value) || "Please enter a valid URL.";
};
</script>
<template>
    <v-form ref="LinkForm">
        <v-row align="center" justify="center">
            <v-card class="mx-auto" width="440" height="600" :style="'overflow-y: scroll'">
                <v-card-title style="text-align:center">
                    <v-row>
                        <v-col col="8">
                            <span class="text-h6">Link</span>
                        </v-col>
                        <v-col cols="4">
                            <ImportModal :dataType="'Link'" :keyName="'linkName'" @sendToParent="handleArrayChange" />
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                    <v-row v-for="(item, index)  in Link" :key="index">
                        <slot v-if="item.linkId == 0">
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.linkName" label="Link Name*"
                                    :rules="[required('Link Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.link" label="Link*"
                                    :rules="[required('Link'), validURL]"></v-text-field>
                            </v-col>
                        </slot>
                        <Slot v-else>
                            <v-col cols="10">
                                <v-row>
                                    <p>Link Name: {{ item.linkName }}</p>
                                </v-row>
                                <v-row>
                                    <p>Link Description: {{ item.link }}</p>
                                </v-row>
                            </v-col>
                            <v-col cols="2">
                                <v-btn @click="dialog = true, modalEditIndex = index" style="float:center"
                                    class="py-auto">
                                    <v-icon icon="mdi-pencil" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </v-col>
                        </Slot>
                        <div v-if="index > 0" class="mx-auto">
                            <v-btn @click="removeLink(index)" style="float:left">
                                <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                            </v-btn>
                        </div>
                        <v-divider class="my-5"></v-divider>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-row>
                        <div class="mx-auto">
                            <v-btn @click="addNewLink" style="float:left" class="my-2">
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
                            <v-text-field class="formField" v-model="Link[modalEditIndex].linkName" label="Link Name*"
                                :rules="[required('Link Name')]" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea class="formField" v-model="Link[modalEditIndex].link"
                                label="Link Description*" :rules="[required('Link Description')]"
                                density="compact"></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Save" @click="saveLink(Link[modalEditIndex])"></v-btn>
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
        Link: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.LinkForm.validate();
            if (valid) {
                //insert backend logic here
                this.$emit('getNext');
            }
        },
        addNewLink() {
            this.Link.push({
                linkId: 0,
                userId: 0,
                linkName: "",
                link: "",
            })
        },
        handleArrayChange(data) {
            let len = 0
            for (let i = 0; i < this.Link.length; i++) {
                if (this.Link[i].linkId > 0 ) {
                    len++
                }
            }
            if(len > 0){
                this.Link.splice(0, len)
            }
            for (let i in data) {
                this.Link.unshift(data[i])
            }
        },
        removeLink(index) {
            this.Link.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.Link.splice(0, this.Link.length);
            this.$emit('getNext');
        },
        async saveLink(item) {
            const { valid } = await this.$refs.modalForm.validate();
            if (valid) {
                dialog.value = false
                LinkService.updateLink(item.linkId, item)
            }
        }
    }
}
</script>