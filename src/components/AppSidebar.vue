<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">M</div>
      <span class="logo-text">MYPER <span>Software</span></span>
    </div>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <div class="nav-section-label">PRINCIPAL</div>
      <router-link to="/home" class="nav-item" active-class="nav-item--active" @click="$emit('close')">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        Dashboard
      </router-link>

      <div class="nav-section-label">GESTIÓN</div>
      <router-link to="/usuarios" class="nav-item" active-class="nav-item--active" @click="$emit('close')">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Usuarios
      </router-link>
      <router-link to="/construccion" class="nav-item" active-class="nav-item--active" @click="$emit('close')">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Reportes
      </router-link>
      <router-link to="/construccion" class="nav-item" active-class="nav-item--active" @click="$emit('close')">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Empresas
      </router-link>

      <div class="nav-section-label">CONFIGURACIÓN</div>
      <router-link to="/construccion" class="nav-item" active-class="nav-item--active" @click="$emit('close')">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        Ajustes
      </router-link>
      <router-link to="/construccion" class="nav-item" active-class="nav-item--active" @click="$emit('close')">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        Notificaciones
      </router-link>
    </nav>

    <!-- Logout -->
    <button class="sidebar-logout" @click="logout">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;flex-shrink:0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Cerrar Sesión
    </button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({ isOpen: Boolean })
defineEmits(['close'])

const router = useRouter()

function logout() {
  localStorage.removeItem('myper_user')
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s ease;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  margin-bottom: 8px;
  flex-shrink: 0;
}

.logo-icon {
  width: 32px; height: 32px;
  background: var(--sidebar-accent);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 16px; color: #fff; flex-shrink: 0;
}

.logo-text { font-size: 0.92rem; font-weight: 700; color: #fff; letter-spacing: 0.3px; }
.logo-text span { color: #8aa4f8; font-weight: 400; }

.sidebar-nav {
  flex: 1; padding: 8px 10px;
  display: flex; flex-direction: column; gap: 2px;
  overflow-y: auto;
}

.nav-section-label {
  font-size: 0.68rem; font-weight: 600;
  letter-spacing: 1.2px; color: rgba(160,168,192,0.45);
  padding: 14px 10px 6px;
}

.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px;
  color: var(--sidebar-text); text-decoration: none;
  font-size: 0.875rem; font-weight: 500;
  transition: all 0.18s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover { background: var(--sidebar-hover); color: #fff; }

.nav-item--active {
  background: var(--sidebar-active);
  color: var(--sidebar-text-active) !important;
  border-left-color: var(--sidebar-accent);
}

.nav-icon { width: 17px; height: 17px; flex-shrink: 0; opacity: 0.8; }
.nav-item--active .nav-icon, .nav-item:hover .nav-icon { opacity: 1; }

.sidebar-logout {
  display: flex; align-items: center; gap: 10px;
  padding: 16px 22px; background: none; border: none;
  border-top: 1px solid rgba(255,255,255,0.07);
  color: #f87171; font-size: 0.875rem; font-weight: 500;
  width: 100%; text-align: left; transition: background 0.18s; flex-shrink: 0;
}

.sidebar-logout:hover { background: rgba(248,113,113,0.1); }

/* Responsive — oculto por defecto en móvil */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar--open {
    transform: translateX(0);
  }
}
</style>
