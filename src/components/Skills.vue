<script setup>
const required = (label) => (value) => !!value || `The ${label} field is required.`;
</script>
<template>
    <div>
        <v-form ref="SkillForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="440" height="600"
                    :style="'overflow-y: scroll'">
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Skill</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row v-for="(item, index)  in Skill" :key="index">
                            <v-col cols="12">
                                <v-text-field class="formField" v-model="item.Skill" label="Skill*"
                                    :rules="[required('Skill Name')]"></v-text-field>
                            </v-col>

                            <div v-if="index > 0" class="mx-auto">
                                <v-btn @click="removeSkill(index)" style="float:left">
                                    <v-icon icon="mdi-minus" style="font-size: 20px;"></v-icon>
                                </v-btn>
                            </div>
                            <v-divider class="my-5"></v-divider>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-row>
                            <div class="mx-auto">
                                <v-btn @click="addNewSkill" style="float:left" class="mx-5">
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
        Skill: {
            type: Object,
        },
    },
    methods: {
        async submitForm() {
            const { valid } = await this.$refs.SkillForm.validate();
            if (valid) {
                //insert backend logic here
                this.$emit('getNext');
            }
        },
        addNewSkill() {
            this.Skill.push({
                id: 0,
                SkillName: "",
                SkillDesc: ""
            })
        },
        removeSkill(index) {
            this.Skill.splice(index, 1);
        },
        getPrevious() {
            this.$emit('getPrevious');
        },
        skip() {
            this.Skill.splice(0, this.Skill.length);
            this.$emit('getNext');
        },
    }
}
</script>