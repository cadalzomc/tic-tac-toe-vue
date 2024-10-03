import { defineStore } from "pinia"
import { ref } from "vue"

export const useGameStore = defineStore("gameStore", () => {
  const xWins = ref(0)
  const oWins = ref(0)
  const draws = ref(0)

  const incrementXWins = () => {
    xWins.value += 1
  }

  const incrementOWins = () => {
    oWins.value += 1
  }

  const incrementDraw = () => {
    draws.value += 1
  }

  const resetRecords = () => {
    xWins.value = 0
    oWins.value = 0
    draws.value = 0
  }

  return { xWins, oWins, draws, incrementXWins, incrementOWins, incrementDraw, resetRecords }
})
