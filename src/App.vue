<template>
  <router-view />
</template>

<script setup>
import { useStoreEntries } from './stores/storeEntries';
import { useStoreSettings } from './stores/storeSettings';

import { onMounted } from 'vue';

const storeSettings = useStoreSettings();
const storeEntries = useStoreEntries();

onMounted(() => {
  storeSettings.loadSettings();
  storeEntries.loadEntries();
})


// window.addEventListener('contextmenu', e =>{
//   e.preventDefault();
// })

</script>
