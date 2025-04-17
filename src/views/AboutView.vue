<script setup>
import { Avatar } from 'primevue'
</script>
<template>
  <div class="flex flex-col bg-[url('../assets/patternBlack.jpg')] bg-[length:65%_auto] lg:bg-[length:25%_auto] bg-repeat w-full min-h-lvh h-full">
    <div class="flex-1 w-full bg-gray-500/20 dark:bg-black/85">
      <div class="w-full max-w-265 mx-auto min-h-min bg-white/85 backdrop-blur-sm rounded-lg mb-10 mt-30 shadow-xl dark:bg-surface-900/75">
        <div class="card flex flex-col items-center overflow-hidden">
          <div class="flex flex-col items-center gap-2">
            <span class="text-xl font-medium text-gray-500 pt-5 pb-3">Промотайте вниз, чтобы узнать больше о менеджере задач uTasks!</span>
            <span class="animate-bounce h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
              <i class="pi pi-arrow-down" />
            </span>
          </div>
          <div class="h-[40rem]"></div>
          <div class="flex flex-wrap justify-center gap-8">
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000',
                leaveClass: 'animate-leave fade-out-0',
              }"
              class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
                <i class="pi pi-pencil !text-2xl"></i>
              </div>
              <span class="text-2xl font-bold text-center">Создавайте задачи легко</span>
              <span class="text-muted-color text-center">С интуитивно понятным конструктором</span>
            </div>
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 animate-duration-1000',
                leaveClass: 'animate-leave fade-out-0',
              }"
              class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
                <i class="pi pi-calendar-clock !text-2xl"></i>
              </div>
              <span class="text-2xl font-bold text-center">Задавайте дедлайны</span>
              <span class="text-muted-color text-center">С поддержкой функционала календаря</span>
            </div>
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 slide-in-from-r-8 animate-duration-1000',
                leaveClass: 'animate-leave fade-out-0',
              }"
              class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
                <i class="pi pi-clipboard !text-2xl"></i>
              </div>
              <span class="text-2xl font-bold text-center">Указывайте подробности</span>
              <span class="text-muted-color text-center">Используйте теги и описание</span>
            </div>
          </div>
          <div class="h-[30rem]"></div>
          <div class="flex flex-wrap justify-center gap-8">
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000',
              }"
              class="flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                <i class="pi pi-sort-amount-up !text-2xl"></i>
              </div>
              <span class="text-2xl font-bold text-center">Расставляйте приоритеты</span>
              <span class="text-center">Используя соответствующий функционал</span>
            </div>
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-1000',
              }"
              class="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                <i class="pi pi-sparkles !text-2xl"></i>
              </div>
              <span class="text-2xl font-bold text-center">Достигайте целей красиво</span>
              <span class="text-center">С современным пользовательским интерфейсом uTasks</span>
            </div>
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-1000',
              }"
              class="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                <i class="pi pi-database !text-2xl"></i>
              </div>
              <span class="text-2xl font-bold text-center">Ваши данные в безопасности</span>
              <span class="text-center">Никто не украдёт Ваши данные из базы данных, которой нет 😎. Пока нет...</span>
            </div>
          </div>
          <div class="h-[30rem]"></div>
          <div class="flex flex-wrap justify-center gap-8">
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 slide-in-from-t-20 animate-duration-1000',
              }"
              class="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <Avatar image="./src/assets/logo.svg" shape="square" size="xlarge" />
              <span class="text-2xl font-medium">Vue.js</span>
              <span class="text-muted-color text-center">Прогрессивный JavaScript-фреймворк, менеджер задач uTasks написан на нём</span>
            </div>
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 slide-in-from-b-20 animate-duration-1000',
              }"
              class="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <Avatar image="./src/assets/primeVueLogo.png" shape="square" size="xlarge" />
              <span class="text-2xl font-medium">PrimeVue</span>
              <span class="text-muted-color text-center">Предоставляет набор из готовых элементов пользовательского интерфейса для Vue.js</span>
            </div>
            <div
              v-animateonscroll="{
                enterClass: 'animate-enter fade-in-10 slide-in-from-t-20 animate-duration-1000',
              }"
              class="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
            >
              <Avatar image="./src/assets/tailwindLogo.png" shape="square" size="xlarge" />
              <span class="text-2xl font-medium">Tailwind CSS</span>
              <span class="text-muted-color text-center">CSS-фреймворк, который позволяет использовать готовые классы прямо в разметке Vue</span>
            </div>
          </div>
          <span class="text-xl font-medium text-gray-500 pt-70 pb-5 text-center">Разработал Ключников А.Д., ЭФБО-09-23</span>
        </div>
      </div>
    </div>
  </div>
</template>
