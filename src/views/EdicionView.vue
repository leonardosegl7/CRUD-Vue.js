<template>
  <v-container>
    <div class="mb-6">
      <v-btn
        variant="text"
        prepend-icon="mdi-arrow-left"
        @click="volver"
      >
        Volver
      </v-btn>
    </div>

    <div class="text-center mb-8">
      <h1 class="text-h3 font-weight-bold mb-2">Editar Cliente</h1>
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

    <!-- Mensaje de error si no se encuentra el cliente -->
    <v-alert
      v-if="!clienteActual"
      type="error"
      class="mb-6"
    >
      Cliente no encontrado.
      <v-btn variant="text" @click="volver">Volver</v-btn>
    </v-alert>

    <!-- Formulario -->
    <formulario-cliente
      v-if="clienteActual"
      :cliente-editar="clienteActual"
      @guardar="actualizarCliente"
      @cancelar="volver"
    />
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FormularioCliente from '@/components/FormularioCliente.vue'

export default {
  name: 'EdicionView',
  components: { FormularioCliente },

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const snackbar = ref({ mostrar: false, mensaje: '', color: 'success' })
    const clienteActual = ref(null)

    const mostrarMensaje = (mensaje, color = 'success') => {
      snackbar.value = { mostrar: true, mensaje, color }
    }

    // Cargar el cliente cuando se monta el componente
    onMounted(() => {
      const id = parseInt(route.params.id)
      clienteActual.value = store.getters.clientePorId(id)

      if (!clienteActual.value) {
        mostrarMensaje('Cliente no encontrado', 'error')
      }
    })

    const actualizarCliente = async (cliente) => {
      try {
        await store.dispatch('actualizarCliente', cliente)
        mostrarMensaje('Cliente actualizado exitosamente')

        // Redirigir al listado después de 1 segundo
        setTimeout(() => {
          router.push({ name: 'listado' })
        }, 1000)
      } catch (error) {
        mostrarMensaje('Error al actualizar el cliente', 'error')
        console.error(error)
      }
    }

    const volver = () => {
      router.push({ name: 'listado' })
    }

    return {
      snackbar,
      clienteActual,
      actualizarCliente,
      volver
    }
  }
}
</script>
