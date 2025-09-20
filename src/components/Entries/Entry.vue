<template>
    <q-slide-item left-color="positive" right-color="negative" @left="onLeft" @right="onRight"
        :class="{ 'bg-grey-2' : entry.paid}">
        <template v-slot:left>
            <q-icon name="done"></q-icon>
        </template>
        <template v-slot:right>
            <q-icon name="delete" />
        </template>

        <q-item>
            <q-item-section :class="[
              useAmountColorClass(entry.amount),
              { 'text-strike' : entry}
              ]" class="text-weight-bold">
                {{ entry.name }}
                <q-popup-edit buttons label-set="Ok" :cover="false" :offset="[16,12]" anchor="top left"
                    :model-value="entry.name" auto-save @save="onNameUpdate" v-slot="scope"> <q-input
                        input-class="text-weight-bold letter-spacing-none" v-model="scope.value" dense autofocus
                        @keyup.enter="scope.set" />
                </q-popup-edit>
            </q-item-section>

            <q-item-section side top :class="useAmountColorClass(entry.amount)" class="text-weight-bold justify-center">
                {{ useCurrencyFormatter(entry.amount) }}
                <q-popup-edit buttons label-set="Ok" :cover="false" :offset="[16, 12]" anchor="top left"
                    :model-value="entry.amount" @save="onAmountUpdate" auto-save v-slot="scope">
                    <q-input input-class="text-weight-bold letter-spacing-none text-right" v-model.number="scope.value"
                        step="0.01" type="number" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit>
            </q-item-section>

            <q-item-section side  v-if="storeEntries.options.sort">
                <q-icon class="handle" name="reorder" color="primary" />
            </q-item-section>
        </q-item>
    </q-slide-item>
</template>

<script setup>
import { useStoreEntries } from 'src/stores/storeEntries';
import { useCurrencyFormatter } from 'src/use/useCurrencyFormatter';
import { useAmountColorClass } from 'src/use/useAmountColorClass';
import { useQuasar } from 'quasar';
 
/* store */
const storeEntries = useStoreEntries();

/* props */

const props = defineProps({
    entry: Object,
    index: Number
});

/* quasar */
const $q = useQuasar();

/* slide */
const onRight = ({ reset }) => {
    $q.dialog({
        title: 'Delete Entry',
        message:
            `
    Delete this entry?
    <div class="q-mt-md text-weight-bold ${useAmountColorClass(props.entry.amount)}">
      ${props.entry.name}: ${useCurrencyFormatter(props.entry.amount)}
    </div>
    `,
        cancel: true,
        persistent: true,
        html: true,
        ok: {
            label: 'Delete',
            color: 'negative',
            noCaps: true
        },
        cancel: {
            color: 'primary',
            noCaps: true
        }
    }).onOk(() => {
        storeEntries.deleteEntry(props.index);
        $q.notify({
            message: "Entry deleted",
            position: "top",
        })
    }).onCancel(() => {
        reset();
    })
}

const onLeft = ({ reset }) => {
    storeEntries.updateEntry(props.index, {paid: !props.entry.paid});
    reset();
}

/* name and amount update */

const onNameUpdate = (newName) => {
    storeEntries.updateEntry(props.index, { name: newName });
}

const onAmountUpdate = (newAmount) => {
    storeEntries.updateEntry(props.index, { amount: newAmount});
}
</script>