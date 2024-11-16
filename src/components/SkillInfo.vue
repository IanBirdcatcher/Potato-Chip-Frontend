<script setup>
import { ref, defineProps, defineEmits } from 'vue';
const required = (label) => (value) => !!value || `The ${label} field is required.`;

const emit = defineEmits(['getNext', 'getPrevious'])

const skillList = ref([
    { id: 1, skill: 'JavaScript' },
    { id: 2, skill: 'Python' },
    { id: 3, skill: 'Ruby' },
    { id: 4, skill: 'Java' },
    { id: 5, skill: 'Go' }
]);

const props = defineProps({
    Skill: {
        type: Object,
    },
})

async function submitForm() {
    const { valid } = await this.$refs.SkillForm.validate();
    if (valid) {
        this.$emit('getNext');
    }
}
function getPrevious() {
    emit('getPrevious');
}
function skip() {
    props.Skill.value.splice(0,props.Skill.value.length);
    emit('getNext')
}
</script>
<template>
    <div>
        <v-form ref="SkillForm">
            <v-row align="center" justify="center">
                <v-card class="mx-auto" width="400" height="515" :style="'overflow-y: scroll'">
                    <v-card-title style="text-align:center">
                        <span class="text-h6">Skill</span>
                    </v-card-title>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-combobox :items="skillList" label="Select a Skill or type a new one" v-model="props.Skill.value"
                                    item-title="skill" multiple return-object chips clearable style="height: 200px;">
                                </v-combobox>
                            </v-col>
                            <v-divider class="my-5"></v-divider>
                            <v-spacer></v-spacer>
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