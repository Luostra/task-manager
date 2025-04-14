<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Button, Menubar } from 'primevue'
import { ref } from 'vue'
//    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
const items = ref([
  {
    label: 'Задачи',
    icon: 'pi pi-pen-to-square',
    path: '/',
  },
  {
    label: 'О программе',
    icon: 'pi pi-info',
    path: '/about',
  },
  {
    label: 'Войти',
    icon: 'pi pi-user',
    path: '/login',
  },
])
</script>

<template>
  <Menubar
    :model="items"
    class="!fixed !backdrop-blur-sm !bg-emerald-500/40 w-full h-auto z-10000 !border-0"
    :pt="{
      root: { class: '!flex !justify-between !gap-4' },
      rootList: { class: 'order-2 !ml-auto' },
      itemContent: { class: '' },
      button: {
        class: 'order-2 !ml-auto !text-white hover:!bg-emerald-600 active:!bg-emerald-700',
      },
    }"
  >
    <template #start>
      <img width="115" height="35" viewBox="0 0 115 35" fill="none" src="./assets/logoFull.png" class="" />
    </template>
    <template #item="{ item, props }">
      <a class="flex items-center" v-bind="props.action">
        <RouterLink :to="item.path">
          <span :class="item.icon" />
          <span class="pl-1">{{ item.label }}</span>
        </RouterLink>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2"></div>
    </template>
  </Menubar>

  <RouterView />
</template>

<style scoped></style>
