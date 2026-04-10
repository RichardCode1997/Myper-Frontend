<template>
  <div class="home-view">
    <div class="page-header">
      <h1 class="page-title">Panel de Control</h1>
      <p class="page-sub">Bienvenido al sistema de gestión de MYPER Software 👋</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label" :style="{ borderTopColor: stat.color }">
        <div class="stat-icon" :style="{ background: stat.bg }">{{ stat.icon }}</div>
        <div class="stat-info">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="welcome-banner">
      <div class="banner-content">
        <h2>Bienvenido al Sistema de Gestión</h2>
        <p>Administra los usuarios del sistema, consulta reportes y gestiona la información de tu organización desde este panel centralizado.</p>
      </div>
      <div class="banner-icon">🏢</div>
    </div>

    <div class="modules-section">
      <h3 class="section-title">Módulos del Sistema</h3>
      <p class="section-sub">Accede rápidamente a cualquier sección</p>
      <div class="modules-grid">
        <router-link v-for="mod in modules" :key="mod.title" :to="mod.route" class="module-card">
          <div class="module-icon" :style="{ background: mod.bg }">{{ mod.icon }}</div>
          <div class="module-info">
            <div class="module-title">{{ mod.title }}</div>
            <div class="module-desc">{{ mod.desc }}</div>
          </div>
          <span class="module-arrow">→</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { icon: '👥', label: 'Usuarios Registrados', value: '10', color: '#4f6ef7', bg: '#eef1fe' },
  { icon: '✅', label: 'Módulos Activos',       value: '1',  color: '#22c55e', bg: '#f0fdf4' },
  { icon: '🔧', label: 'En Construcción',       value: '4',  color: '#f59e0b', bg: '#fffbeb' },
  { icon: '🌐', label: 'API Conectada',         value: '1',  color: '#06b6d4', bg: '#ecfeff' },
]

const modules = [
  { icon: '👥', title: 'Usuarios',       desc: 'Gestiona los usuarios del sistema.',    route: '/usuarios',     bg: '#eef1fe' },
  { icon: '📋', title: 'Reportes',       desc: 'Consulta reportes y estadísticas.',     route: '/construccion', bg: '#f0fdf4' },
  { icon: '🏢', title: 'Empresas',       desc: 'Administra las empresas registradas.',  route: '/construccion', bg: '#fff7ed' },
  { icon: '⚙️', title: 'Ajustes',        desc: 'Configura los parámetros del sistema.', route: '/construccion', bg: '#fdf4ff' },
  { icon: '🔔', title: 'Notificaciones', desc: 'Gestiona alertas y notificaciones.',    route: '/construccion', bg: '#fffbeb' },
  { icon: '📊', title: 'Dashboard',      desc: 'Panel de control y métricas.',          route: '/home',         bg: '#ecfeff' },
]
</script>

<style scoped>
.home-view { max-width: 1100px; }
.page-header { margin-bottom: 28px; }
.page-title  { font-size: 1.7rem; font-weight: 700; color: var(--text); }
.page-sub    { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 3px solid;
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow);
}

.stat-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; flex-shrink: 0;
}

.stat-value { font-size: 1.5rem; font-weight: 700; color: var(--text); }
.stat-label { font-size: 0.78rem; color: var(--text-muted); margin-top: 2px; }

.welcome-banner {
  background: #1a2d6e;
  border-radius: var(--radius);
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  color: #fff;
}

.banner-content h2 { font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; }
.banner-content p  { font-size: 0.85rem; color: rgba(255,255,255,0.75); max-width: 500px; line-height: 1.6; }
.banner-icon       { font-size: 3.5rem; opacity: 0.6; }

.section-title { font-size: 1.1rem; font-weight: 700; }
.section-sub   { font-size: 0.83rem; color: var(--text-muted); margin-top: 2px; margin-bottom: 16px; }

.modules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.module-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.18s ease;
  box-shadow: var(--shadow);
}

.module-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.module-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; flex-shrink: 0;
}

.module-info  { flex: 1; }
.module-title { font-weight: 600; font-size: 0.9rem; }
.module-desc  { font-size: 0.78rem; color: var(--text-muted); margin-top: 2px; }
.module-arrow { color: var(--text-muted); }

@media (max-width: 900px) {
  .stats-grid   { grid-template-columns: repeat(2, 1fr); }
  .modules-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
