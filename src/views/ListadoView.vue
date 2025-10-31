<template>
  <v-container>
    <div class="text-center mb-8">
      <h1 class="text-h3 font-weight-bold mb-2">Gestión de Clientes</h1>
    </div>

    <!-- Botón para agregar nuevo cliente -->
    <v-card class="mb-6">
      <v-card-text class="text-center py-6">
        <v-btn
          color="primary"
          size="large"
          prepend-icon="mdi-plus"
          @click="irANuevo"
        >
          Agregar Nuevo Cliente
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Snackbar para mensajes -->
    <v-snackbar
      v-model="snackbar.mostrar"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
      {{ snackbar.mensaje }}
    </v-snackbar>

    <!-- Listado -->
    <listado-clientes
      :clientes="clientes"
      @editar="irAEditar"
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
import { useRouter } from 'vue-router'
import ListadoClientes from '@/components/ListadoClientes.vue'
import DialogoConfirmacion from '@/components/DialogoConfirmacion.vue'

export default {
  name: 'ListadoView',
  components: { ListadoClientes, DialogoConfirmacion },

  setup() {
    const store = useStore()
    const router = useRouter()

    const clienteEliminar = ref(null)
    const dialogo = ref({ mostrar: false })
    const snackbar = ref({ mostrar: false, mensaje: '', color: 'success' })

    const clientes = computed(() => store.getters.todosLosClientes)

    const mostrarMensaje = (mensaje, color = 'success') => {
      snackbar.value = { mostrar: true, mensaje, color }
    }

    const irANuevo = () => {
      router.push({ name: 'alta' })
    }

    const irAEditar = (cliente) => {
      router.push({ name: 'edicion', params: { id: cliente.id } })
    }

    const mostrarDialogoEliminar = (cliente) => {
      clienteEliminar.value = cliente
      dialogo.value.mostrar = true
    }

    const eliminarCliente = async () => {
      try {
        await store.dispatch('eliminarCliente', clienteEliminar.value.id)
        mostrarMensaje('Cliente eliminado exitosamente')
        cerrarDialogo()
      } catch (error) {
        mostrarMensaje('Error al eliminar el cliente', 'error')
      }
    }

    const cerrarDialogo = () => {
      dialogo.value.mostrar = false
      clienteEliminar.value = null
    }

    return {
      clientes,
      clienteEliminar,
      dialogo,
      snackbar,
      irANuevo,
      irAEditar,
      mostrarDialogoEliminar,
      eliminarCliente,
      cerrarDialogo
    }
  }
}
</script>
