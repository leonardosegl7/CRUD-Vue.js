import { createStore } from 'vuex'

// Plugin para persistir el estado en localStorage
const localStoragePlugin = (store) => {
  // Cargar estado inicial desde localStorage
  const savedState = localStorage.getItem('clientesStore')
  if (savedState) {
    store.replaceState(JSON.parse(savedState))
  }

  // Guardar en localStorage después de cada mutación
  store.subscribe((mutation, state) => {
    localStorage.setItem('clientesStore', JSON.stringify(state))
  })
}

export default createStore({
  state: {
    // Estado inicial - solo se usa si no hay datos en localStorage
    clientes: [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '555-0101' },
      { id: 2, nombre: 'María García', email: 'maria@example.com', telefono: '555-0102' }
    ]
  },

  getters: {
    // Obtener todos los clientes
    todosLosClientes: (state) => state.clientes,

    // Obtener cliente por ID
    clientePorId: (state) => (id) => {
      return state.clientes.find(cliente => cliente.id === id)
    },

    // Contar clientes
    totalClientes: (state) => state.clientes.length
  },

  mutations: {
    // Agregar nuevo cliente
    AGREGAR_CLIENTE(state, cliente) {
      const nuevoCliente = {
        ...cliente,
        id: Date.now() // Generar ID único basado en timestamp
      }
      state.clientes.push(nuevoCliente)
      console.log('Cliente agregado:', nuevoCliente)
    },

    // Actualizar cliente existente
    ACTUALIZAR_CLIENTE(state, clienteActualizado) {
      const index = state.clientes.findIndex(c => c.id === clienteActualizado.id)
      if (index !== -1) {
        // Usar splice para mantener la reactividad
        state.clientes.splice(index, 1, clienteActualizado)
        console.log('Cliente actualizado:', clienteActualizado)
      }
    },

    // Eliminar cliente
    ELIMINAR_CLIENTE(state, id) {
      const clienteEliminado = state.clientes.find(c => c.id === id)
      state.clientes = state.clientes.filter(c => c.id !== id)
      console.log('Cliente eliminado:', clienteEliminado)
    },

    // Limpiar todos los clientes (útil para pruebas)
    LIMPIAR_CLIENTES(state) {
      state.clientes = []
      console.log('Todos los clientes eliminados')
    }
  },

  actions: {
    // Action para agregar cliente
    agregarCliente({ commit }, cliente) {
      return new Promise((resolve, reject) => {
        try {
          commit('AGREGAR_CLIENTE', cliente)
          resolve()
        } catch (error) {
          console.error('Error al agregar cliente:', error)
          reject(error)
        }
      })
    },

    // Action para actualizar cliente
    actualizarCliente({ commit }, cliente) {
      return new Promise((resolve, reject) => {
        try {
          commit('ACTUALIZAR_CLIENTE', cliente)
          resolve()
        } catch (error) {
          console.error('Error al actualizar cliente:', error)
          reject(error)
        }
      })
    },

    // Action para eliminar cliente
    eliminarCliente({ commit }, id) {
      return new Promise((resolve, reject) => {
        try {
          commit('ELIMINAR_CLIENTE', id)
          resolve()
        } catch (error) {
          console.error('Error al eliminar cliente:', error)
          reject(error)
        }
      })
    },

    // Action para limpiar todos los clientes
    limpiarClientes({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('LIMPIAR_CLIENTES')
          resolve()
        } catch (error) {
          console.error('Error al limpiar clientes:', error)
          reject(error)
        }
      })
    }
  },

  // Registrar el plugin de persistencia
  plugins: [localStoragePlugin]
})
