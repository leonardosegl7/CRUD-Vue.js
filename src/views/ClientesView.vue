<template>
  <v-container>
    <!-- Encabezado -->
    <div class="text-center mb-8">
      <h1 class="text-h3 font-weight-bold mb-2">Gestión de Clientes</h1>
    </div>

    <!-- Snackbar para mensajes -->
    <v-snackbar
      v-model="snackbar.mostrar"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
      {{ snackbar.mensaje }}
    </v-snackbar>

    <!-- Formulario -->
    <formulario-cliente
      :cliente-editar="clienteEditar"
      @guardar="guardarCliente"
      @cancelar="cancelarEdicion"
    />

    <!-- Listado -->
    <listado-clientes
      :clientes="clientes"
      @editar="editarCliente"
      @eliminar="mostrarDialogoEliminar"
    />

    <!-- Diálogo de confirmación -->
    <dialogo-confirmacion
      :mostrar="dialogo.mostrar"
      :cliente="clienteEliminar"
      @confirmar="eliminarCliente"
      @cancelar="cerrarDialogo"
    />
  </v-container>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import FormularioCliente from '@/components/FormularioCliente.vue'
import ListadoClientes from '@/components/ListadoClientes.vue'
import DialogoConfirmacion from '@/components/DialogoConfirmacion.vue'

export default {
  name: 'ClientesView',

  components: {
    FormularioCliente,
    ListadoClientes,
    DialogoConfirmacion
  },

  setup() {
    const store = useStore()

    // Estado local
    const clienteEditar = ref(null)
    const clienteEliminar = ref(null)
    const dialogo = ref({ mostrar: false })
    const snackbar = ref({
      mostrar: false,
      mensaje: '',
      color: 'success'
    })

    // Computed property para obtener clientes del store
    const clientes = computed(() => store.getters.todosLosClientes)

    // Mostrar mensaje
    const mostrarMensaje = (mensaje, color = 'success') => {
      snackbar.value = { mostrar: true, mensaje, color }
    }

    // Guardar cliente (crear o actualizar)
    const guardarCliente = async (cliente) => {
      try {
        if (clienteEditar.value) {
          // Actualizar
          await store.dispatch('actualizarCliente', cliente)
          mostrarMensaje('Cliente actualizado exitosamente')
          clienteEditar.value = null
        } else {
          // Crear
          await store.dispatch('agregarCliente', cliente)
          mostrarMensaje('Cliente agregado exitosamente')
        }
      } catch (error) {
        mostrarMensaje('Error al guardar el cliente', 'error')
        console.error(error)
      }
    }

    // Editar cliente
    const editarCliente = (cliente) => {
      clienteEditar.value = { ...cliente }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Cancelar edición
    const cancelarEdicion = () => {
      clienteEditar.value = null
    }

    // Mostrar diálogo de eliminación
    const mostrarDialogoEliminar = (cliente) => {
      clienteEliminar.value = cliente
      dialogo.value.mostrar = true
    }

    // Eliminar cliente
    const eliminarCliente = async () => {
      try {
        await store.dispatch('eliminarCliente', clienteEliminar.value.id)
        mostrarMensaje('Cliente eliminado exitosamente')
        cerrarDialogo()
      } catch (error) {
        mostrarMensaje('Error al eliminar el cliente', 'error')
        console.error(error)
      }
    }

    // Cerrar diálogo
    const cerrarDialogo = () => {
      dialogo.value.mostrar = false
      clienteEliminar.value = null
    }

    return {
      clientes,
      clienteEditar,
      clienteEliminar,
      dialogo,
      snackbar,
      guardarCliente,
      editarCliente,
      cancelarEdicion,
      mostrarDialogoEliminar,
      eliminarCliente,
      cerrarDialogo
    }
  }
}
</script>
