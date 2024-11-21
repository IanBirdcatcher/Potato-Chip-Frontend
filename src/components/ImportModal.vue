<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import EducationsService from '../services/educationServices';
import Utils from "../config/utils.js";

const emit = defineEmits(['sendToParent']);

const props = defineProps({
    dataType: {
        type: String,
        required: true,
    },
    keyName: {
        type: String,
        required: true,
    }
})

const List = ref(null)
const user = Utils.getStore("user");
const Selected = ref([])
const isActive = ref(false)
try{
eval(`${props.dataType}sService.getAllForUser(${user.userId})
    .then(response => {
            List.value = response.data;
          })
          .catch(error => {
            console.log("Error fetching resumes:", error);
          });
    `)
}
catch{
    isActive.value = true
}
const dialog = ref(false)


function pushToParent() {
    dialog.value = false
    let data = Selected.value
    emit('sendToParent', data);
}

</script>
<template>
    <v-btn @click="dialog = true" density="compact" :style="{ display: isActive ? 'block' : 'none' }">
        Import
    </v-btn>
    <v-dialog v-model="dialog" width="auto" height="auto">
        <v-card width="400" height="515">
            <v-card-title style="text-align:center">
                {{ props.dataType }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-select :items="List" label="Select as many as you would like" v-model="Selected"
                    :item-title="props.keyName" multiple return-object chips clearable style="height: 100%;"
                    variant="solo">
                </v-select>
            </v-card-text>
            <v-divider></v-divider>
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="pushToParent"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
