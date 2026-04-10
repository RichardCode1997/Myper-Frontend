<template>
  <div class="usuarios-view">
    <div class="page-header">
      <div>
        <h1 class="page-title">Gestión de Usuarios</h1>
        <p class="page-sub">Administra los usuarios del sistema</p>
      </div>
      <button class="btn btn-primary" @click="openCreateModal">
        ＋ Nuevo Usuario
      </button>
    </div>

    <div class="table-card">
      <!-- Loader -->
      <div v-if="loading" class="state-wrap">
        <div class="spinner"></div>
        <span>Cargando usuarios...</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="state-wrap">
        <span style="font-size:2rem">❌</span>
        <p>{{ error }}</p>
      </div>

      <!-- Sin datos -->
      <div v-else-if="users.length === 0" class="state-wrap">
        <span style="font-size:2rem">👤</span>
        <p>No hay usuarios registrados.</p>
      </div>

      <template v-else>
        <div class="table-toolbar">
          <span class="table-count"><strong>{{ users.length }}</strong> usuarios encontrados</span>
        </div>

        <!-- TABLA — desktop -->
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Username</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" :class="{ 'row-new': user._isNew }">
                <td><span class="id-badge">{{ user.id }}</span></td>
                <td class="td-name">{{ user.name }}</td>
                <td class="td-accent">@{{ user.username }}</td>
                <td class="td-muted">{{ user.email }}</td>
                <td class="td-muted">{{ user.phone }}</td>
                <td>
                  <div class="action-btns">
                    <button class="btn btn-edit" @click="openEditModal(user)">✏️ Editar</button>
                    <button class="btn btn-delete" @click="openDeleteModal(user)">🗑️ Eliminar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- CARDS — móvil -->
        <div class="cards-wrap">
          <div
            v-for="user in users"
            :key="user.id"
            class="user-card"
            :class="{ 'card-new': user._isNew }"
          >
            <div class="card-header">
              <div class="card-avatar">{{ user.name[0] }}</div>
              <div class="card-info">
                <div class="card-name">{{ user.name }}</div>
                <div class="card-username">@{{ user.username }}</div>
              </div>
              <span class="card-id">#{{ user.id }}</span>
            </div>
            <div class="card-body">
              <div class="card-field">
                <span class="card-label">Email</span>
                <span class="card-value">{{ user.email }}</span>
              </div>
              <div class="card-field">
                <span class="card-label">Teléfono</span>
                <span class="card-value">{{ user.phone }}</span>
              </div>
            </div>
            <div class="card-actions">
              <button class="btn btn-edit" @click="openEditModal(user)">✏️ Editar</button>
              <button class="btn btn-delete" @click="openDeleteModal(user)">🗑️ Eliminar</button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- ===== MODAL CREAR / EDITAR ===== -->
    <Teleport to="body">
      <div class="modal-overlay" v-if="showFormModal" @click.self="closeFormModal">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">{{ isEditing ? '✏️ Editar Usuario' : '➕ Nuevo Usuario' }}</h2>
            <button class="modal-close" @click="closeFormModal">✕</button>
          </div>

          <div class="form-group">
            <label>Nombre completo</label>
            <input type="text" v-model="form.name"
              :class="{ 'input-error': errors.name }"
              placeholder="Ej: Juan Pérez" />
            <div class="field-error" v-if="errors.name">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="form.username"
              :class="{ 'input-error': errors.username }"
              placeholder="Ej: juanperez99" />
            <div class="field-error" v-if="errors.username">{{ errors.username }}</div>
          </div>
          <div class="form-group">
            <label>Correo electrónico</label>
            <input type="email" v-model="form.email"
              :class="{ 'input-error': errors.email }"
              placeholder="Ej: juan@email.com" />
            <div class="field-error" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <input type="tel" v-model="form.phone"
              :class="{ 'input-error': errors.phone }"
              placeholder="Ej: 9534512121" />
            <div class="field-error" v-if="errors.phone">{{ errors.phone }}</div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeFormModal">Cancelar</button>
            <button class="btn btn-primary" @click="submitForm">
              {{ isEditing ? 'Guardar cambios' : 'Crear usuario' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ===== MODAL CONFIRMAR ELIMINAR ===== -->
    <Teleport to="body">
      <div class="modal-overlay" v-if="showDeleteModal" @click.self="showDeleteModal = false">
        <div class="modal modal-sm">
          <div class="confirm-body">
            <div style="font-size:2.5rem;margin-bottom:10px">⚠️</div>
            <h2 class="modal-title">¿Eliminar usuario?</h2>
            <p>Estás a punto de eliminar a <strong>{{ userToDelete?.name }}</strong>. Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showDeleteModal = false">Cancelar</button>
            <button class="btn btn-danger" @click="confirmDelete">Sí, eliminar</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ===== TOASTS ===== -->
    <Teleport to="body">
      <div class="toast-container">
        <div v-for="t in toasts" :key="t.id" :class="['toast', t.type]">
          {{ t.icon }} {{ t.msg }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUsers } from '../composables/useUsers.js'

const { users, loading, error, fetchUsers, addUser, updateUser, deleteUser } = useUsers()

const showFormModal = ref(false)
const isEditing     = ref(false)
const editingId     = ref(null)
const form   = reactive({ name: '', username: '', email: '', phone: '' })
const errors = reactive({ name: '', username: '', email: '', phone: '' })

const showDeleteModal = ref(false)
const userToDelete    = ref(null)

const toasts = ref([])

function showToast(msg, type = 'info', icon = 'ℹ️') {
  const id = Date.now()
  toasts.value.push({ id, msg, type, icon })
  setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 3200)
}

function validate() {
  errors.name     = form.name.trim()     ? '' : 'El nombre es obligatorio.'
  errors.phone    = form.phone.trim()    ? '' : 'El teléfono es obligatorio.'

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  } else {
    errors.email = ''
  }

  if (!form.username.trim()) {
    errors.username = 'El username es obligatorio.'
  } else {
    errors.username = ''
  }

  // Validar unicidad — excluir al usuario actual en edición
  const otrosUsuarios = users.value.filter(u => u.id !== editingId.value)

  if (!errors.username) {
    const usernameExiste = otrosUsuarios.some(
      u => u.username.toLowerCase() === form.username.trim().toLowerCase()
    )
    if (usernameExiste) errors.username = 'Este username ya está registrado.'
  }

  if (!errors.email) {
    const emailExiste = otrosUsuarios.some(
      u => u.email.toLowerCase() === form.email.trim().toLowerCase()
    )
    if (emailExiste) errors.email = 'Este correo ya está registrado.'
  }

  if (!errors.phone) {
    const telefonoExiste = otrosUsuarios.some(
      u => u.phone === form.phone.trim()
    )
    if (telefonoExiste) errors.phone = 'Este teléfono ya está registrado.'
  }

  return !errors.name && !errors.username && !errors.email && !errors.phone
}

function resetForm() {
  form.name = ''; form.username = ''; form.email = ''; form.phone = ''
  errors.name = ''; errors.username = ''; errors.email = ''; errors.phone = ''
}

function openCreateModal() {
  isEditing.value = false
  editingId.value = null
  resetForm()
  showFormModal.value = true
}

function openEditModal(user) {
  isEditing.value = true
  editingId.value = user.id
  form.name = user.name
  form.username = user.username
  form.email = user.email
  form.phone = user.phone
  errors.name = errors.username = errors.email = errors.phone = ''
  showFormModal.value = true
}

function closeFormModal() {
  showFormModal.value = false
  resetForm()
}

function submitForm() {
  if (!validate()) return
  if (isEditing.value) {
    updateUser(editingId.value, form)
    showToast('Usuario actualizado correctamente.', 'success', '✅')
  } else {
    addUser(form)
    showToast('Usuario creado exitosamente.', 'success', '✅')
  }
  closeFormModal()
}

function openDeleteModal(user) {
  userToDelete.value  = user
  showDeleteModal.value = true
}

function confirmDelete() {
  deleteUser(userToDelete.value.id)
  showToast(`"${userToDelete.value.name}" eliminado.`, 'error', '🗑️')
  showDeleteModal.value = false
  userToDelete.value    = null
}

onMounted(() => fetchUsers())
</script>

<style scoped>
.usuarios-view { max-width: 1100px; }

.page-header {
  display: flex; align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
}

.page-title { font-size: 1.7rem; font-weight: 700; }
.page-sub   { color: var(--text-muted); font-size: 0.88rem; margin-top: 4px; }

.table-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.table-toolbar {
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  background: #fafbfd;
}

.table-count { font-size: 0.83rem; color: var(--text-muted); }
.table-count strong { color: var(--accent); }

/* ── TABLA desktop ── */
.table-wrap { overflow-x: auto; }

table { width: 100%; border-collapse: collapse; }
thead tr { background: #f8f9fc; }

th {
  padding: 13px 18px; text-align: left;
  font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
  color: var(--text-muted); border-bottom: 1px solid var(--border);
}

td {
  padding: 13px 18px; font-size: 0.875rem;
  border-bottom: 1px solid var(--border); vertical-align: middle;
}

tr:last-child td { border-bottom: none; }
tbody tr { transition: background 0.15s; }
tbody tr:hover { background: #fafbfd; }

.id-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; border-radius: 6px;
  background: var(--accent-light); color: var(--accent);
  font-size: 0.75rem; font-weight: 700;
}

.td-name   { font-weight: 500; }
.td-accent { color: var(--accent); font-size: 0.83rem; }
.td-muted  { color: var(--text-muted); font-size: 0.83rem; }
.action-btns { display: flex; gap: 8px; }

/* ── CARDS móvil — ocultas en desktop ── */
.cards-wrap { display: none; padding: 12px; gap: 12px; flex-direction: column; }

.user-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
}

.card-header {
  display: flex; align-items: center;
  gap: 12px; margin-bottom: 12px;
}

.card-avatar {
  width: 40px; height: 40px;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1rem; flex-shrink: 0;
}

.card-info { flex: 1; }
.card-name     { font-weight: 600; font-size: 0.95rem; }
.card-username { color: var(--accent); font-size: 0.82rem; margin-top: 2px; }
.card-id       { color: var(--text-muted); font-size: 0.78rem; font-weight: 600; }

.card-body { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }

.card-field { display: flex; flex-direction: column; gap: 2px; }
.card-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text-muted); }
.card-value { font-size: 0.85rem; color: var(--text); }

.card-actions { display: flex; gap: 8px; }
.card-actions .btn { flex: 1; justify-content: center; }

.card-new { animation: highlightCard 1.8s ease forwards; }
@keyframes highlightCard {
  0%   { border-color: var(--accent); background: var(--accent-light); }
  100% { border-color: var(--border); background: var(--surface); }
}

/* ── Estado loader/empty ── */
.state-wrap {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 60px 20px; gap: 12px;
  color: var(--text-muted); font-size: 0.88rem;
}

.spinner {
  width: 36px; height: 36px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.row-new td { animation: highlight 1.8s ease forwards; }
@keyframes highlight {
  0%   { background: var(--accent-light); }
  100% { background: transparent; }
}

/* ── Botones ── */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 18px; border-radius: 8px; border: none;
  font-size: 0.85rem; font-weight: 500;
  font-family: inherit; cursor: pointer; transition: all 0.18s;
}

.btn-primary   { background: var(--accent); color: #fff; }
.btn-primary:hover { background: #3d5de0; }

.btn-secondary { background: var(--bg); color: var(--text); border: 1px solid var(--border); }
.btn-secondary:hover { border-color: #aaa; }

.btn-edit   { background: var(--accent-light); color: var(--accent); padding: 6px 12px; font-size: 0.8rem; }
.btn-edit:hover { background: #dce3fd; }

.btn-delete { background: #fef2f2; color: var(--danger); padding: 6px 12px; font-size: 0.8rem; }
.btn-delete:hover { background: #fee2e2; }

.btn-danger { background: var(--danger); color: #fff; }
.btn-danger:hover { background: #dc2626; }

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; backdrop-filter: blur(3px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal {
  background: #fff; border-radius: 14px;
  width: 90%; max-width: 460px; padding: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  animation: slideUp 0.22s ease;
}

.modal-sm { max-width: 360px; }

@keyframes slideUp {
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.modal-header {
  display: flex; align-items: center;
  justify-content: space-between; margin-bottom: 22px;
}

.modal-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }

.modal-close {
  background: none; border: none; font-size: 1.2rem;
  color: var(--text-muted); cursor: pointer; padding: 4px;
  border-radius: 6px; line-height: 1;
}
.modal-close:hover { color: var(--text); background: var(--bg); }

.form-group { margin-bottom: 16px; }

label {
  display: block; font-size: 0.75rem; font-weight: 600;
  color: #374151; margin-bottom: 5px;
  text-transform: uppercase; letter-spacing: 0.6px;
}

input[type="text"], input[type="email"], input[type="tel"] {
  width: 100%; background: var(--bg);
  border: 1.5px solid var(--border); border-radius: 8px;
  padding: 10px 13px; color: var(--text);
  font-size: 0.88rem; font-family: inherit;
  outline: none; transition: border-color 0.18s;
}

input:focus { border-color: var(--accent); background: #fff; }
input.input-error { border-color: var(--danger); }
.field-error { color: var(--danger); font-size: 0.77rem; margin-top: 4px; }

.modal-footer {
  display: flex; gap: 10px; justify-content: flex-end;
  margin-top: 24px; padding-top: 18px;
  border-top: 1px solid var(--border);
}

.confirm-body { text-align: center; padding: 8px 0 16px; }
.confirm-body p { color: var(--text-muted); font-size: 0.88rem; margin-top: 6px; line-height: 1.5; }

/* ── Toasts ── */
.toast-container {
  position: fixed; bottom: 24px; right: 24px;
  z-index: 200; display: flex; flex-direction: column; gap: 8px;
}

.toast {
  background: #fff; border: 1px solid var(--border);
  border-radius: 10px; padding: 11px 16px;
  font-size: 0.84rem; box-shadow: var(--shadow-lg);
  animation: toastIn 0.25s ease; min-width: 220px;
}

.toast.success { border-left: 3px solid var(--success); }
.toast.error   { border-left: 3px solid var(--danger); }
.toast.info    { border-left: 3px solid var(--accent); }

@keyframes toastIn {
  from { transform: translateX(30px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .page-title { font-size: 1.3rem; }

  /* Ocultar tabla, mostrar cards */
  .table-wrap { display: none; }
  .cards-wrap { display: flex; }
}
</style>
