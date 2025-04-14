<script setup>
import TaskList from '@/components/TaskList.vue'
</script>

<template>
  <div
    class="flex flex-col bg-[url('../assets/patternCode.jpg')] bg-[length:65%_auto] lg:bg-[length:25%_auto] bg-repeat w-full min-h-lvh h-full"
  >
    <div class="flex-1 w-full bg-gray-500/20">
      <div
        class="w-full max-w-230 mx-auto min-h-min bg-white/85 backdrop-blur-sm rounded-lg mb-10 mt-30 shadow-xl"
      >
        <div class="">
          <TaskList />
        </div>
      </div>
    </div>
  </div>
</template>
