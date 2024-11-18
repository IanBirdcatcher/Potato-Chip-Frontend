<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
    dataToImportTo: {
        type: Object,
    },
    dataType: {
        type: String,
    },
})
const selected = ref([])
const dialog = ref(false)

function pushToParent() {
    dialog.value = false
}

</script>
<template>
    <v-btn @click="dialog = true">
        Import
    </v-btn>

    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="600" max-height="700" :style="'overflow-y: scroll'">
            <v-card-title>
                Select Items that you want in your resume
            </v-card-title>
            <v-divider class="mx-4"></v-divider>

            <v-divider class="mx-4"></v-divider>
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="pushToParent"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>