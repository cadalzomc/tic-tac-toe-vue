<script setup lang="ts">
import Board from "./components/Board/Board.vue"
import PlayerX from "./components/Player/Player.X.vue"
import PlayerO from "./components/Player/Player.O.vue"
import Ties from "./components/Player/Ties.vue"
</script>

<template>
  <main class="flex w-screen h-screen justify-center items-center overflow-auto">
    <div class="py-8 px-8 text-center max-sm:w-full max-sm:px-4">
      <div class="block w-full text-center">
        <Board />
        <div class="grid grid-cols-3 justify-between gap-3 mt-2">
          <PlayerX />
          <Ties />
          <PlayerO />
        </div>
      </div>
    </div>
  </main>
</template>
