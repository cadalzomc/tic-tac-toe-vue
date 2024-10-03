<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import Square from "@/components/Square/Square.vue"
import { CalculateWinner } from "@/lib/helper/CalculateWinner"
import { useGameStore } from "@/stores/GameStores"

import ButtonReset from "@/components/Buttons/Button.Reset.vue"
import TicTacToe from "../icons/TicTacToe.vue"

const gameStore = useGameStore()
const currentPlayer = ref("X")
const squares = ref(Array(9).fill(null))

const ClickHandle = (index: number) => {
  if (squares.value[index]) return
  squares.value[index] = currentPlayer.value
  currentPlayer.value = currentPlayer.value === "X" ? "O" : "X"
}

const CLickResetHandle = () => {
  squares.value = Array(9).fill(null)
}

const winnerExist = computed(() => CalculateWinner(squares.value))
watchEffect(() => {
  const winner = CalculateWinner(squares.value)
  if (winner?.toString().toUpperCase() === "X") {
    gameStore.incrementXWins()
  } else if (winner?.toString().toUpperCase() === "O") {
    gameStore.incrementOWins()
  } else if (squares.value.every((square) => square !== null)) {
    gameStore.incrementDraw()
  }
})
</script>

<template>
  <div class="flex justify-between mb-6 items-center">
    <div>
      <TicTacToe class="size-12" />
    </div>
    <div class="font-bold">
      <span class="flex gap-2 px-4 py-1 rounded-lg text-3xl text-slate-300 uppercase">
        <span class="pr-2">
          <strong>{{ currentPlayer }}</strong>
        </span>
        <span><strong>Turn</strong></span>
      </span>
    </div>
    <ButtonReset @click="CLickResetHandle" />
  </div>
  <div class="p-4 pt-0">
    <div class="flex justify-center">
      <div class="grid grid-cols-3 items-center w-80">
        <Square
          v-for="(square, index) in squares"
          :key="index"
          :value="square ?? ''"
          sqr-css="text-green-500"
          :onClick="() => ClickHandle(index)"
          :disabled="!!winnerExist"
        />
      </div>
    </div>
  </div>
</template>
