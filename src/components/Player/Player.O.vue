<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div
    class="flex flex-col justify-center max-sm:h-14 items-center text-slate-800 bg-zinc-400 px-12 max-sm:px-5 py-2 max-sm:py-1 rounded-md uppercase"
  >
    <h1 class="text-sm max-sm:text-xs font-medium">PLAYER O</h1>
    <div className="text-3xl max-sm:text-2xl font-bold p-0">{{ gameStore.oWins }}</div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/GameStores"
const gameStore = useGameStore()
</script>
