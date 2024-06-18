<template>
    <q-btn color="positive" icon="edit" size="sm" flat round dense @click="open_edit_dialog">
        <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
    </q-btn>
    <q-dialog v-model="openEditDialogVisible">
        <q-card>
            <h1>this is an edit dialog</h1>
        </q-card>
    </q-dialog>
</template>
<script setup>
import {ref} from 'vue'

const openEditDialogVisible = ref(false);
const open_edit_dialog = () => {
    openEditDialogVisible.value = true
}
</script>