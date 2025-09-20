<template>
    <form @submit="addEntryFormSubmit" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
            <q-input ref="nameRef" v-model="addEntryForm.name" outlined dense bg-color="white" placeholder="Name" />
        </div>
        <div class="col">
            <q-input v-model.number="addEntryForm.amount" input-class="text-right" outlined dense bg-color="white"
                placeholder="Amount" type="number" step="0.01" />
        </div>
        <div class="col col-auto">
            <q-btn round color="primary" icon="add" type="submit" />
        </div>
    </form>
</template>

<script setup>

import { ref, reactive } from 'vue';
import { useStoreEntries } from 'src/stores/storeEntries';

const storeEntries = useStoreEntries();
const nameRef = ref(null);

const addEntryFormDefault = reactive({
    name: '',
    amount: null,
});

const addEntryForm = reactive({
    ...addEntryFormDefault
});

const addEntryFormReset = () => {
    Object.assign(addEntryForm, addEntryFormDefault)
    nameRef.value.focus()
}

const addEntryFormSubmit = () => {
    storeEntries.addEntry(addEntryForm);
    addEntryFormReset();
}

</script>