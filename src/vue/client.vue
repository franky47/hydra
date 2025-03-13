<script setup lang="ts">
// @ts-check
import { useRouteQuery } from '@vueuse/router';

const count = useRouteQuery('count', '0', {
  transform: Number,
})

function incrementCount() {
  count.value++
}
function clear() {
  count.value = 0 // Shame we can't remove it from the URL here..
}
</script>

<template>
  <section>
    <h2>Vue Router</h2>
    <div style="display: flex; gap: 0.25rem;">
      <button style="width: 4rem;" @click="clear">Clear</button>
      <button style="width: 4rem;" @click="incrementCount">
        {{ count }}
      </button>
    </div>
  </section>
</template>
