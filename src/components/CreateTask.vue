<script setup>
import { InputText, Message, Button, Textarea, FloatLabel, DatePicker, MultiSelect, Rating } from 'primevue'
import { Form } from '@primevue/forms'
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['form-submited'])
let today = new Date()

const initialFormData = {
  name: undefined,
  description: undefined,
  date: undefined,
  rating: undefined,
  tags: undefined,
}
const formData = ref({ ...initialFormData })

const resolver = ({ values }) => {
  const errors = {}
  if (!values.newTask || formData.value.name == undefined) {
    errors.newTask = [{ message: 'Введите название новой задачи' }]
  }
  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  }
}

const onFormSubmit = ({ valid }) => {
  if (valid) {
    if (formData.value.rating == undefined) {
      formData.value.rating = 0
    }
    console.log(formData.value)
    emit('form-submited', formData.value)
    formData.value = { ...initialFormData }
  }
}

const tags = ref([
  { name: 'Работа', color: 'secondary' },
  { name: 'Учёба', color: 'success' },
  { name: 'Повседневное', color: 'info' },
  { name: 'Личное', color: 'warn' },
  { name: 'Путешествия', color: 'danger' },
  { name: 'Другое', color: 'contrast' },
])
</script>
<template>
  <Form v-slot="$form" :resolver @submit="onFormSubmit" class="w-full p-3 flex flex-col border-1 gap-4 border-gray-200">
    <div class="flex flex-row gap-4">
      <FloatLabel variant="in" class="basis-3/5">
        <InputText name="newTask" id="new_task" type="text" class="w-full h-full" v-model="formData.name" />
        <label for="new_task">Новая задача</label>
      </FloatLabel>
      <FloatLabel variant="in" class="basis-2/5">
        <DatePicker v-model="formData.date" :minDate="today" :manualInput="false" showIcon iconDisplay="input" class="w-full" showButtonBar />
        <label for="date">Выполнить до</label>
      </FloatLabel>
    </div>
    <Message v-if="$form.newTask?.invalid" severity="error" size="small" variant="simple" class="-mt-4">{{ $form.newTask.error?.message }}</Message>
    <div class="flex flex-row gap-4">
      <FloatLabel variant="in" class="basis-3/4">
        <MultiSelect id="tags" v-model="formData.tags" :options="tags" optionLabel="name" filter :maxSelectedLabels="3" class="w-35 md:w-full" variant="filled" />
        <label for="tags">Теги</label>
      </FloatLabel>
      <div class="basis-1/4 flex flex-row">
        <div class="flex 1 mx-auto gap-2">
          <p class="text-sm md:text-base font-medium mt-4 text-gray-500">Приоритет:</p>
          <Rating v-model="formData.rating" />
        </div>
      </div>
    </div>
    <FloatLabel variant="in">
      <Textarea name="taskDescription" id="task_description" class="w-full max-h-100" autoResize v-model="formData.description" />
      <label for="task_description">Описание</label>
    </FloatLabel>
    <Button class="col-span-1 col-start-4 shadow-md" type="submit" icon="pi pi-plus" label="Добавить" />
  </Form>
</template>
