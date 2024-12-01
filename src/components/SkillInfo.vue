<script setup>
import { ref, defineProps ,  onMounted , onUnmounted , defineEmits } from 'vue';
import SkillService from '../services/skillServices';
import Utils from "../config/utils.js";

const required = (label) => (value) => !!value || `The ${label} field is required.`;

const user = Utils.getStore("user");

const emit = defineEmits(['getNext', 'getPrevious'])

const SkillForm = ref(null);

const skillList = ref([]);

SkillService.getAllForUser()
    .then(response => {
        skillList.value = response.data;
          })
          .catch(error => {
            console.log("Error fetching resumes:", error);
          });

const props = defineProps({
    Skill: {
        type: Object,
    },
})
const selected = ref([])

async function submitForm() {
   const { valid } = await SkillForm.value.validate();
    if (valid) {
        emit('getNext');
    }
}
function getPrevious() {
    emit('getPrevious');
}
function skip() {
    selected.value.splice(0,selected.value.length);
    emit('getNext')
}
onUnmounted(() => {
    props.Skill.splice(0,props.Skill.length)
    for (let i in selected.value) {
        if (selected.value[i].skillId === undefined ) {
            selected.value[i] = { skillId: 0, skill: selected.value[i] }
        }
        props.Skill.push(selected.value[i])
    }
});
onMounted(() => {
    for(let i in props.Skill){
        selected.value.push(props.Skill[i])
    }
});

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
                                <v-combobox :items="skillList" label="Select a Skill or type a new one" v-model="selected"
                                    item-title="skill" multiple return-object chips clearable style="height: 200px;"  :rules="[required('Please choose at least 1 skill')]">
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
                                Finish
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-form>
       
    </div>
</template>