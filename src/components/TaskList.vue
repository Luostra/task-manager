<script setup>
import { ref, computed } from 'vue'
import CreateTask from '@/components/CreateTask.vue'
import { Panel, Button, ToggleButton, Checkbox, Menu, Tag, Dialog, InputText, Message, Textarea, FloatLabel, DatePicker, MultiSelect, Rating } from 'primevue'
import { format } from 'date-fns'
import { z } from 'zod'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const items = user.value.items // Реактивная ссылка на массив

let id = user.value.tasksId + 1

const addTodo = (value) => {
  console.log(id)
  todos.value.push({
    id: id++,
    name: value.name,
    description: value.description,
    time: value.date,
    rating: value.rating,
    tags: value.tags,
    done: false,
  })
  authStore.replaceItems(todos.value)
  console.log(id)
  value = ''
}

const hideCompleted = ref(false)
const todos = ref(items)

const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value
})

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
  authStore.replaceItems(todos.value)
}

const isEditDialogVisible = ref(false)

let today = new Date()
const tags = ref([
  { name: 'Работа', color: 'secondary' },
  { name: 'Учёба', color: 'success' },
  { name: 'Повседневное', color: 'info' },
  { name: 'Личное', color: 'warn' },
  { name: 'Путешествия', color: 'danger' },
  { name: 'Другое', color: 'contrast' },
])
const selectedCard = ref(null)
const selectCard = (card) => {
  isEditDialogVisible.value = true
  selectedCard.value = card
}

const replaceCardById = (id, newCard) => {
  const index = todos.value.findIndex((card) => card.id === id)
  if (index !== -1) {
    if (newCard.rating == null) {
      newCard.rating = 0
    }
    todos.value[index] = newCard
    authStore.replaceItems(todos.value)
    isEditDialogVisible.value = false
  }
}

function update() {
  authStore.replaceItems(todos.value)
}
</script>
<template>
  <CreateTask @form-submited="addTodo" />
  <div class="flex flex-col">
    <div class="flex flex-row">
      <ToggleButton v-model="hideCompleted" onLabel="Показать все" offLabel="Скрыть выполненные" onIcon="pi pi-eye" offIcon="pi pi-eye-slash" class="m-4 basis-1/2 shadow-md" aria-label="Do you confirm" />
    </div>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id" class="pl-3 pr-3 pb-3">
        <Panel toggleable :collapsed="true">
          <template #header>
            <div class="flex flex-wrap items-center gap-2">
              <Checkbox inputId="size_normal" name="size" value="Normal" v-model="todo.done" binary @change="update()" />
              <label for="size_normal" class="font-medium truncate max-w-80 text-sm md:text-base">{{ todo.name }}</label>
              <div class="bg-surface-100 p-1 dark:bg-emerald-950" style="border-radius: 30px">
                <div
                  class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2 dark:bg-surface-900"
                  style="
                    border-radius: 30px;
                    box-shadow:
                      0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                      0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                  "
                >
                  <span class="text-surface-900 font-medium text-sm dark:text-white">{{ todo.rating }}</span>
                  <i class="pi pi-star-fill text-emerald-500"></i>
                </div>
              </div>
              <p class="font-medium text-gray-500">
                {{ todo.time == undefined ? '' : 'До ' + format(todo.time, 'dd.MM.yyyy') }}
              </p>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <span class="text-surface-500 dark:text-surface-400"> </span>
            </div>
          </template>
          <template #icons>
            <Button icon="pi pi-trash" severity="danger" rounded text @click="removeTodo(todo)" />
            <Button icon="pi pi-pencil" rounded text @click="selectCard(todo)" />
            <Menu ref="menu" id="config_menu" popup />
          </template>
          <div class="flex flex-col gap-1">
            <div class="flex flex-row gap-2">
              <h1 class="font-medium text-gray-500">{{ todo.tags ? 'Теги:' : '' }}</h1>
              <ul class="flex flex-row gap-2">
                <li v-for="tag in todo.tags">
                  <Tag :severity="tag.color" rounded>{{ tag.name }}</Tag>
                </li>
              </ul>
            </div>
            <div class="flex flex-col gap-1">
              <h1 class="font-medium text-gray-500">{{ !todo.description ? '' : 'Описание:' }}</h1>
              <p class="m-0">{{ todo.description }}</p>
            </div>
          </div>
        </Panel>
      </li>
    </ul>
    <Dialog v-model:visible="isEditDialogVisible" modal header="Изменить задачу" :style="{ width: '25rem' }" pt:mask:class="backdrop-blur-sm backdrop-brightness-100" class="!max-h-155">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Обновите информацию и закройте окно</span>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="in" class="w-full">
          <InputText name="newTask" id="new_task" type="text" class="w-full h-full" v-model="selectedCard.name" :defaultValue="selectedCard.name" />
          <label for="new_task">Название задачи</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="in" class="w-full">
          <DatePicker v-model="selectedCard.time" :minDate="today" :manualInput="false" :defaultValue="selectedCard.time" showIcon iconDisplay="input" class="w-full" showButtonBar />
          <label for="date">Выполнить до</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="in" class="w-full">
          <MultiSelect id="tags" v-model="selectedCard.tags" :defaultValue="selectedCard.tags" :options="tags" optionLabel="name" filter :maxSelectedLabels="3" class="w-full" variant="filled" />
          <label for="tags">Теги</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <div class="flex 1 mx-auto gap-2">
          <p class="text-sm md:text-base font-medium text-gray-500">Приоритет:</p>
          <Rating v-model="selectedCard.rating" :defaultValue="selectedCard.rating" />
        </div>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="on" class="w-full">
          <Textarea name="taskDescription" id="task_description" class="w-full" style="resize: none" rows="4" v-model="selectedCard.description" :defaultValue="selectedCard.description" />
          <label for="task_description">Описание</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <Button label="Сохранить изменения" @click="replaceCardById(selectedCard.id, selectedCard)"></Button>
      </div>
    </Dialog>
  </div>
</template>
