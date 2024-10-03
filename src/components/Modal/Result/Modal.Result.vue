<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import Sad from "@/components/icons/Sad.vue"
import Smiley from "@/components/icons/Smiley.vue"
import { ref } from "vue"

const props = defineProps<{
  isOpen: boolean
  value: string | null
  onClose: () => void
}>()

console.log(props.isOpen)

const getWinner = (key: string) => {
  switch (key) {
    case "X":
      return "PLAYER X WINS!"
    case "O":
      return "PLAYER O WINS!"
    case "DRAW":
      return "IT'S A DRAW"
    default:
      return ""
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed left-0 top-0 z-[999] flex h-full min-h-screen w-full items-center justify-center px-4 py-5 bg-black/70 shadow-2xl"
  >
    <Transition name="modal-scale" appear>
      <div v-show="isOpen" class="min-w-96 rounded-lg bg-green-200 text-slate-800">
        <div class="px-8 py-5 text-3xl font-extrabold">
          <span class="flex justify-center py-4">
            <Smiley v-if="props.value == 'X' || props.value == 'O'" class="size-20" />
            <Sad v-else-if="props.value == 'DRAW'" class="size-20" />
          </span>
          <h1>{{ getWinner(props.value ?? "") }}</h1>
        </div>
        <div class="py-4">
          <button
            @click="props.onClose"
            class="border px-4 py-2 text-lg rounded-lg bg-green-500 font-bold uppercase hover:opacity-90 hover:shadow-xl duration-200"
          >
            Next Round
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal-scale-enter-to,
.modal-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
