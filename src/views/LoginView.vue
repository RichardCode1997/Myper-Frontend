<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">
        <div class="logo-icon">M</div>
        <div>
          <div class="logo-title">MYPER Software</div>
          <div class="logo-sub">Portal de Acceso</div>
        </div>
      </div>

      <h2 class="login-heading">Iniciar Sesión</h2>
      <p class="login-desc">Ingresa tu username y contraseña para continuar.</p>

      <div class="login-error" v-if="errorMsg">⚠️ {{ errorMsg }}</div>

      <div class="form-group">
        <label>Username</label>
        <input v-model="form.username" type="text" placeholder="Ej: Bret"
          :class="{ 'input-error': errors.username }" @keyup.enter="handleLogin" />
        <div class="field-error" v-if="errors.username">{{ errors.username }}</div>
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input v-model="form.password" type="password" placeholder="Ingresa tu contraseña"
          :class="{ 'input-error': errors.password }" @keyup.enter="handleLogin" />
        <div class="field-error" v-if="errors.password">{{ errors.password }}</div>
      </div>

      <div class="login-hint">
        💡 Usa cualquier username de la lista de usuarios. Contraseña: <strong>1234</strong>
      </div>

      <button class="btn-login" @click="handleLogin" :disabled="loading">
        <span v-if="loading" class="spinner-sm"></span>
        <span v-else>INGRESAR</span>
      </button>
    </div>

    <div class="login-bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router   = useRouter()
const loading  = ref(false)
const errorMsg = ref('')
const form     = reactive({ username: '', password: '' })
const errors   = reactive({ username: '', password: '' })

function validate() {
  errors.username = form.username.trim() ? '' : 'El username es obligatorio.'
  errors.password = form.password.trim() ? '' : 'La contraseña es obligatoria.'
  return !errors.username && !errors.password
}

async function handleLogin() {
  errorMsg.value = ''
  if (!validate()) return
  loading.value = true
  try {
    const res   = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    const found = users.find(
      u => u.username.toLowerCase() === form.username.trim().toLowerCase()
    )
    if (!found) {
      errorMsg.value = 'Username no encontrado. Verifica tus credenciales.'
      return
    }
    if (form.password !== '1234') {
      errorMsg.value = 'Contraseña incorrecta.'
      return
    }
    localStorage.setItem('myper_user', JSON.stringify({
      id: found.id, name: found.name,
      username: found.username, email: found.email
    }))
    router.push('/home')
  } catch {
    errorMsg.value = 'Error de conexión. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  position: fixed;
  inset: 0;
  background: #0f1626;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  overflow: hidden;
}

.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 2;
  box-shadow: 0 24px 64px rgba(0,0,0,0.4);
}

.login-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }

.logo-icon {
  width: 40px; height: 40px; background: #1a2d6e;
  border-radius: 10px; display: flex; align-items: center;
  justify-content: center; font-weight: 700; font-size: 18px; color: #fff;
}

.logo-title { font-weight: 700; font-size: 1rem; color: #1a1d2e; }
.logo-sub   { font-size: 0.78rem; color: #7a82a0; }

.login-heading { font-size: 1.5rem; font-weight: 700; color: #1a1d2e; margin-bottom: 6px; }
.login-desc    { font-size: 0.85rem; color: #7a82a0; margin-bottom: 24px; }

.login-error {
  background: #fef2f2; border: 1px solid #fecaca;
  border-radius: 8px; padding: 10px 14px;
  font-size: 0.83rem; color: #dc2626; margin-bottom: 16px;
}

.form-group { margin-bottom: 16px; }

label {
  display: block; font-size: 0.78rem; font-weight: 600;
  color: #374151; margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: 0.6px;
}

input[type="text"], input[type="password"] {
  width: 100%; background: #f9fafb;
  border: 1.5px solid #e5e7eb; border-radius: 8px;
  padding: 11px 14px; color: #1a1d2e; font-size: 0.9rem;
  outline: none; transition: border-color 0.18s;
}

input:focus { border-color: #4f6ef7; background: #fff; }
input.input-error { border-color: #ef4444; }
.field-error { color: #ef4444; font-size: 0.77rem; margin-top: 4px; }

.login-hint {
  background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 8px; padding: 10px 14px;
  font-size: 0.8rem; color: #1d4ed8; margin-bottom: 20px;
}

.btn-login {
  width: 100%; background: #1a2d6e; color: #fff;
  border: none; border-radius: 8px; padding: 13px;
  font-size: 0.9rem; font-weight: 700; letter-spacing: 1px;
  transition: background 0.18s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}

.btn-login:hover:not(:disabled) { background: #253d8f; }
.btn-login:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner-sm {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff; border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.login-bg-shapes { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.shape { position: absolute; border-radius: 50%; opacity: 0.15; }
.shape-1 { width: 400px; height: 400px; background: #4f6ef7; top: -100px; right: -100px; }
.shape-2 { width: 300px; height: 300px; background: #1a2d6e; bottom: -80px; left: -80px; }
</style>
