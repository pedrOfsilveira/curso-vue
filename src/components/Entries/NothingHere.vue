<script setup>
import { useLightOrDark } from 'src/use/useLightOrDark';
</script>

<template>
  <div class="text-center">
    <q-icon
        name="savings"
        size="100px"
        class="text-grey-4 q-mt-xl"
        :color="useLightOrDark('grey-4', 'grey-9')"
    />
    <div class="text-h6 q-mt-md" :class="useLightOrDark('text-grey-6', 'text-grey-7')">
      Nothing here yet
    </div>
  </div>
</template>
