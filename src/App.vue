<template>
  <div id="app-root">
    <template v-if="isAuthenticated">
      <AppSidebar :isOpen="!isMobile || sidebarOpen" @close="sidebarOpen = false" />
      <div class="app-content">
        <AppHeader @toggleSidebar="sidebarOpen = !sidebarOpen" />
        <main class="main-content">
          <router-view />
        </main>
      </div>
      <div class="sidebar-overlay" v-if="sidebarOpen" @click="sidebarOpen = false"></div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'

const route = useRoute()
const sidebarOpen = ref(false)
const isMobile = ref(window.innerWidth <= 768)

const isAuthenticated = ref(!!localStorage.getItem('myper_user'))

function handleResize() {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) sidebarOpen.value = false
}

watch(() => route.path, () => {
  isAuthenticated.value = !!localStorage.getItem('myper_user')
  sidebarOpen.value = false
})

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<style>
#app-root {
  display: flex;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 32px;
  background: var(--bg);
}

.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 40;
}

@media (max-width: 768px) {
  .app-content {
    margin-left: 0 !important;
  }
  .main-content {
    padding: 20px 16px;
  }
  .sidebar-overlay {
    display: block;
  }
}
</style>
