<template>
    <q-btn color="purple" icon="visibility" size="sm" flat round dense @click="open_view_dialog">
        <q-tooltip class="bg-purple" :delay="200">View</q-tooltip>
    </q-btn>
    <q-dialog v-model="openViewDialogVisible">
        <q-card>
            <h1>this is an view dialog</h1>
        </q-card>
    </q-dialog>
</template>
<script setup>
import {ref} from 'vue'

const openViewDialogVisible = ref(false);
const open_view_dialog = () => {
    openViewDialogVisible.value = true
}
</script>