<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <button @click="props.onClick" :class="getStyle(props.value)">
    <Transition name="icon-scale" appear>
      <component :is="inputValue(props.value)" />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import Circle from "@/components/icons/Circle.vue"
import X from "../icons/X.vue"

const props = defineProps<{
  value: string
  onClick: () => void
  sqrCss: string
}>()

const getStyle = (value: string) => {
  switch (value) {
    case "X":
      return "text-blue-600 " + defaultStyle
    case "O":
      return "text-red-600 " + defaultStyle
    default:
      return defaultStyle
  }
}

const inputValue = (value: string) => {
  switch (value) {
    case "X":
      return X
    case "O":
      return Circle
    default:
      return null
  }
}

const defaultStyle =
  "bg-green-400 m-1 shadow-md rounded-lg px-3 py-1 min-w-24 min-h-24 max-sm:min-w-20 max-sm:min-h-20 text-5xl font-bold"
</script>

<style scoped>
.icon-scale-enter-active,
.icon-scale-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.icon-scale-enter-from,
.icon-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.icon-scale-enter-to,
.icon-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
