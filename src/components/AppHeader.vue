<template>
  <header class="app-header">
    <div class="header-left">
      <!-- Botón hamburguesa solo en móvil -->
      <button class="hamburger" @click="$emit('toggleSidebar')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div class="header-breadcrumb">
        <span class="breadcrumb-app">MYPER Software</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-page">{{ pageTitle }}</span>
      </div>
    </div>

    <div class="header-right">
      <div class="header-date">📅 {{ currentDate }}</div>
      <div class="header-user">
        <div class="user-avatar">{{ userInitial }}</div>
        <span class="user-name">{{ userName }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineEmits(['toggleSidebar'])

const route = useRoute()

const pageTitle = computed(() => {
  const map = {
    '/home': 'Dashboard',
    '/usuarios': 'Usuarios',
    '/construccion': 'En Construcción'
  }
  return map[route.path] || 'Dashboard'
})

const storedUser  = JSON.parse(localStorage.getItem('myper_user') || '{}')
const userName    = computed(() => storedUser.name || 'Usuario')
const userInitial = computed(() => (storedUser.name || 'U')[0].toUpperCase())

const currentDate = computed(() =>
  new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
)
</script>

<style scoped>
.app-header {
  height: 60px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 40;
}

.header-left { display: flex; align-items: center; gap: 12px; }

.hamburger {
  display: none;
  background: none;
  border: none;
  padding: 6px;
  border-radius: 6px;
  color: var(--text);
  cursor: pointer;
  transition: background 0.18s;
}

.hamburger svg { width: 20px; height: 20px; display: block; }
.hamburger:hover { background: var(--bg); }

.header-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; }
.breadcrumb-app  { color: var(--text-muted); }
.breadcrumb-sep  { color: var(--border); }
.breadcrumb-page { color: var(--text); font-weight: 600; }

.header-right { display: flex; align-items: center; gap: 20px; }

.header-date {
  font-size: 0.8rem; color: var(--text-muted);
  background: var(--bg); border: 1px solid var(--border);
  padding: 5px 12px; border-radius: 6px;
}

.header-user { display: flex; align-items: center; gap: 8px; }

.user-avatar {
  width: 32px; height: 32px; background: var(--accent);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: #fff; font-weight: 600; font-size: 0.85rem;
}

.user-name { font-size: 0.85rem; font-weight: 500; color: var(--text); }

@media (max-width: 768px) {
  .app-header { padding: 0 16px; }

  .hamburger { display: flex; }

  .header-date { display: none; }

  .user-name { display: none; }

  .breadcrumb-app { display: none; }
  .breadcrumb-sep { display: none; }
}
</style>
