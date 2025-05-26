<script setup>
import { ref, computed, onMounted } from 'vue'
import CreateTask from '@/components/CreateTask.vue'
import { Panel, Button, ToggleButton, Checkbox, Menu, Tag, Dialog, InputText, Message, Textarea, FloatLabel, DatePicker, MultiSelect, Rating } from 'primevue'
import { format, formatISO } from 'date-fns'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const authStore = useAuthStore()
const API_URL = 'http://localhost:3000/api'

// Состояния
const hideCompleted = ref(false)
const todos = ref([])
const isEditDialogVisible = ref(false)
const selectedCard = ref(null)
const tags = ref(['Работа', 'Учёба', 'Повседневное', 'Личное', 'Путешествия', 'Другое'])

// Получение задач с сервера
const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        'x-auth-token': authStore.token,
      },
    })
    todos.value = response.data.map((task) => ({
      id: task.id,
      name: task.title,
      description: task.description,
      time: task.deadline ? new Date(task.deadline) : null,
      rating: task.rating || 0,
      tags: task.tags || [],
      done: task.is_completed,
    }))
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error)
  }
}

// Добавление новой задачи
const addTodo = async (value) => {
  try {
    // Преобразуем Date объект в строку ISO без временной зоны
    const deadline = value.date ? formatISO(value.date, { representation: 'complete' }).slice(0, 19) : null
    const response = await axios.post(
      `${API_URL}/tasks`,
      {
        title: value.name,
        description: value.description,
        rating: value.rating,
        deadline: deadline,
        tags: value.tags,
      },
      {
        headers: {
          'x-auth-token': authStore.token,
        },
      },
    )

    todos.value.push({
      id: response.data.id,
      name: response.data.title,
      description: response.data.description,
      time: response.data.deadline ? new Date(response.data.deadline) : null,
      rating: response.data.rating || 0,
      tags: response.data.tags || [],
      done: response.data.is_completed,
    })
  } catch (error) {
    console.error('Ошибка при создании задачи:', error)
  }
}

// Удаление задачи
const removeTodo = async (todo) => {
  try {
    await axios.delete(`${API_URL}/tasks/${todo.id}`, {
      headers: {
        'x-auth-token': authStore.token,
      },
    })
    todos.value = todos.value.filter((t) => t.id !== todo.id)
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error)
  }
}

// Обновление задачи
const updateTask = async (task) => {
  try {
    const deadline = task.time ? formatISO(task.time, { representation: 'complete' }).slice(0, 19) : null
    await axios.put(
      `${API_URL}/tasks/${task.id}`,
      {
        title: task.name,
        description: task.description,
        is_completed: task.done,
        rating: task.rating,
        deadline: deadline,
        tags: task.tags,
      },
      {
        headers: {
          'x-auth-token': authStore.token,
        },
      },
    )
    console.log({
      title: task.name,
      description: task.description,
      is_completed: task.done,
      rating: task.rating,
      deadline: task.time,
      tags: task.tags,
    })
    const index = todos.value.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      todos.value[index] = task
    }
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error)
  }
}

// Переключение статуса выполнения
const toggleComplete = async (todo) => {
  //todo.done = !todo.done
  await updateTask(todo)
}

// Выбор задачи для редактирования
const selectCard = (card) => {
  isEditDialogVisible.value = true
  selectedCard.value = { ...card }
}

// Сохранение изменений
const saveChanges = async () => {
  if (selectedCard.value) {
    await updateTask(selectedCard.value)
    isEditDialogVisible.value = false
  }
}

let today = new Date()

// Фильтрация задач
const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value
})

// Загрузка задач при монтировании компонента
onMounted(() => {
  fetchTasks()
})

const tag_colors = ['secondary', 'success', 'info', 'warn', 'danger', 'contrast']
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
              <Checkbox inputId="size_normal" name="size" value="Normal" v-model="todo.done" binary @change="toggleComplete(todo)" />
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
                {{ !todo.time ? '' : 'До ' + format(todo.time, 'dd.MM.yyyy') }}
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
              <h1 class="font-medium text-gray-500">{{ todo.tags.length ? 'Теги:' : '' }}</h1>
              <ul class="flex flex-row gap-2">
                <li v-for="tag in todo.tags" :key="tag">
                  <Tag :severity="tag_colors[tags.indexOf(tag, 0)]" rounded>{{ tag }}</Tag>
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
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Обновите информацию и подтвердите</span>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="in" class="w-full">
          <InputText name="newTask" id="new_task" type="text" class="w-full h-full" v-model="selectedCard.name" />
          <label for="new_task">Название задачи</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="in" class="w-full">
          <DatePicker v-model="selectedCard.time" :manualInput="false" :minDate="today" showIcon iconDisplay="input" class="w-full" showButtonBar dateFormat="dd.mm.yy" :showTime="true" hourFormat="24" />
          <label for="date">Выполнить до</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="in" class="w-full">
          <MultiSelect id="tags" v-model="selectedCard.tags" :options="tags" filter :maxSelectedLabels="3" class="w-full" variant="filled" />
          <label for="tags">Теги</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <div class="flex 1 mx-auto gap-2">
          <p class="text-sm md:text-base font-medium text-gray-500">Приоритет:</p>
          <Rating v-model="selectedCard.rating" :cancel="false" />
        </div>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <FloatLabel variant="on" class="w-full">
          <Textarea name="taskDescription" id="task_description" class="w-full" style="resize: none" rows="4" v-model="selectedCard.description" />
          <label for="task_description">Описание</label>
        </FloatLabel>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <Button label="Сохранить изменения" @click="saveChanges"></Button>
      </div>
    </Dialog>
  </div>
</template>
