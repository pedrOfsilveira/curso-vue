<template>
    <form @submit="addEntryFormSubmit" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
            <q-input ref="nameRef" v-model="addEntryForm.name" outlined dense :bg-color="useLightOrDark('white', 'black')" placeholder="Name" v-select-all/>
        </div>
        <div class="col">
            <q-input v-model.number="addEntryForm.amount" input-class="text-right" outlined dense :bg-color="useLightOrDark('white', 'black')"
                placeholder="Amount" type="number" step="0.01" v-select-all/>
        </div>
        <div class="col col-auto">
            <q-btn round color="primary" icon="add" type="submit" />
        </div>
    </form>
</template>

<script setup>

import { ref, reactive } from 'vue';
import { useStoreEntries } from 'src/stores/storeEntries';
import { useLightOrDark } from 'src/use/useLightOrDark';
import vSelectAll from 'src/directives/directiveSelectAll';

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
