import { ref } from 'vue'

export function useUsers() {
  const users   = ref([])
  const loading = ref(false)
  const error   = ref(null)

  async function fetchUsers() {
    loading.value = true
    error.value   = null
    try {
      const res  = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error('Error al obtener usuarios')
      const data = await res.json()
      users.value = data.map(u => ({
        id:       u.id,
        name:     u.name,
        username: u.username,
        email:    u.email,
        phone:    u.phone,
        _isNew:   false
      }))
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  function nextId() {
    return users.value.length
      ? Math.max(...users.value.map(u => u.id)) + 1
      : 1
  }

  function addUser(userData) {
    users.value.push({
      id:       nextId(),
      name:     userData.name.trim(),
      username: userData.username.trim(),
      email:    userData.email.trim(),
      phone:    userData.phone.trim(),
      _isNew:   true
    })
    setTimeout(() => {
      const u = users.value.find(u => u._isNew)
      if (u) u._isNew = false
    }, 1800)
  }

  function updateUser(id, userData) {
    const idx = users.value.findIndex(u => u.id === id)
    if (idx !== -1) {
      users.value[idx] = {
        ...users.value[idx],
        name:     userData.name.trim(),
        username: userData.username.trim(),
        email:    userData.email.trim(),
        phone:    userData.phone.trim(),
        _isNew:   false
      }
    }
  }

  function deleteUser(id) {
    users.value = users.value.filter(u => u.id !== id)
  }

  return { users, loading, error, fetchUsers, addUser, updateUser, deleteUser }
}
