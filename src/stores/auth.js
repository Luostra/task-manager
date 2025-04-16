import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // Состояние
  const user = ref(JSON.parse(localStorage.getItem('user'))  || { items: [] })
  const isAuthenticated = computed(() => !!user.value)

  // Действия
  const register = (userData) => {
    // В реальном приложении здесь был бы запрос к API
    const newUser = {
      id: Date.now(),
      ...userData
    }
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
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

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
  }
})