<template>
  <div class="construccion-view">
    <div class="construccion-card">
      <div style="font-size:3.5rem;margin-bottom:20px">🔧</div>
      <h2>Módulo en Construcción</h2>
      <p>Este módulo está actualmente en desarrollo. Pronto estará disponible con todas sus funcionalidades.</p>
      <router-link to="/home" class="btn-back">← Volver al Dashboard</router-link>
    </div>
  </div>
</template>

<style scoped>
.construccion-view {
  display: flex; align-items: center;
  justify-content: center; min-height: 60vh;
}

.construccion-card {
  text-align: center; background: var(--surface);
  border: 1px solid var(--border); border-radius: var(--radius);
  padding: 60px 48px; max-width: 440px;
  box-shadow: var(--shadow);
}

h2 { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; }
p  { color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 28px; }

.btn-back {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: #fff;
  text-decoration: none; padding: 10px 22px;
  border-radius: 8px; font-size: 0.88rem; font-weight: 500;
  transition: background 0.18s;
}

.btn-back:hover { background: #3d5de0; }
</style>
