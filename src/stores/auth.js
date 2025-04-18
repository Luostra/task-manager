import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // Состояние
  const user = ref(JSON.parse(localStorage.getItem('user')) || { 
    items: [],
    tasksId: 0 // Добавляем поле для хранения максимального ID
  })
  const isAuthenticated = computed(() => !!user.value)

  // Действия
  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      items: [],  // Добавляем пустой массив при регистрации
      ...userData
    }
    user.value = newUser
    saveUser()
  }
  const login = (credentials) => {
    // В реальном приложении здесь была бы проверка с сервером
    // Для демо просто проверяем наличие пользователя в localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser && storedUser.username === credentials.username && storedUser.password === credentials.password) {
      user.value = storedUser
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    //localStorage.removeItem('user')
  }

  const saveUser = () => {
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  
  const replaceItems = (newArray) => { // добавить обновление id
    if (!Array.isArray(newArray)) {
      console.error('Метод replaceItems ожидает массив в качестве аргумента')
      return
    }
  
    // Обновляем массив items
    user.value.items = [...newArray]
  
    // Вычисляем новый maxId
    if (newArray.length === 0) {
      user.value.tasksId = 0 // Если массив пуст, сбрасываем maxId
    } else {
      // Находим максимальный ID среди всех элементов
      user.value.tasksId = Math.max(...newArray.map(item => item?.id ?? 0))
    }
  
    saveUser() // Сохраняем изменени
  }

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    replaceItems,
  }
})