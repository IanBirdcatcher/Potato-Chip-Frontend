<script setup>
import ImportModal from "../components/ImportModal.vue"
const required = (label) => (value) => !!value || `The ${label} field is required.`;
// URL validation rule
const validURL = (value) => {
    const pattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/;
    return pattern.test(value) || "Please enter a valid URL.";
};
</script>
<template>
    <div>
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
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.linkName" label="Link Name*"
                                    :rules="[required('Link Name')]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.link" label="Link*"
                                    :rules="[required('Link'), validURL]"></v-text-field>
                            </v-col>

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
                                <v-btn @click="addNewLink" style="float:left" class="mx-5">
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
                for (let i = 0; i < this.Link.length; i++) {
                    if (this.Link[i].linkId > 0) {
                        this.Link.splice(i)
                    }
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
    }
}
</script>