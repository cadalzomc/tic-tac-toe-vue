<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"
import WinnerModal from "@/components/Modal/Result/Modal.Result.vue"
import Square from "@/components/Square/Square.vue"
import { CalculateWinner } from "@/lib/helper/CalculateWinner"
import { useGameStore } from "@/stores/GameStores"

import ButtonReset from "@/components/Buttons/Button.Reset.vue"
import TicTacToe from "@/components/icons/TicTacToe.vue"

const gameStore = useGameStore()
const currentPlayer = ref("X")
const isModalOpen = ref(false)
const result = ref("")
const squares = ref(Array(9).fill(null))

const ClickHandle = (index: number) => {
  if (squares.value[index]) return
  squares.value[index] = currentPlayer.value
  currentPlayer.value = currentPlayer.value === "X" ? "O" : "X"
}

const CloseModal = () => {
  isModalOpen.value = false
  CLickResetHandle()
  console.log(isModalOpen.value)
}

const CLickResetHandle = () => {
  squares.value = Array(9).fill(null)
}

const winnerExist = computed(() => CalculateWinner(squares.value))

watchEffect(() => {
  const winner = CalculateWinner(squares.value)
  setTimeout(() => {
    if (winner?.toString().toUpperCase() === "X") {
      gameStore.incrementXWins()
      isModalOpen.value = true
      result.value = "X"
    } else if (winner?.toString().toUpperCase() === "O") {
      isModalOpen.value = true
      result.value = "O"
      gameStore.incrementOWins()
    } else if (squares.value.every((square) => square !== null)) {
      isModalOpen.value = true
      result.value = "DRAW"
      gameStore.incrementDraw()
    }
  }, 700)
})
</script>

<template>
  <div class="flex justify-between mb-6 items-center">
    <div>
      <TicTacToe class="size-12" />
    </div>
    <div class="font-bold">
      <span class="flex items-center gap-2 px-4 py-1 rounded-lg text-3xl text-slate-300 uppercase">
        <span class="text-2xl"><strong>Next Player</strong></span>
        <span class="pl-2 text-green-200">
          <strong>{{ currentPlayer }}</strong>
        </span>
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
  <WinnerModal :value="result" :is-open="isModalOpen" :onClose="CloseModal" />
</template>
