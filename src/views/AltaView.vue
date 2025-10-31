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
      <h1 class="text-h3 font-weight-bold mb-2">Nuevo Cliente</h1>
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
      @guardar="guardarCliente"
      @cancelar="volver"
    />
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FormularioCliente from '@/components/FormularioCliente.vue'

export default {
  name: 'AltaView',
  components: { FormularioCliente },

  setup() {
    const store = useStore()
    const router = useRouter()
    const snackbar = ref({ mostrar: false, mensaje: '', color: 'success' })

    const mostrarMensaje = (mensaje, color = 'success') => {
      snackbar.value = { mostrar: true, mensaje, color }
    }

    const guardarCliente = async (cliente) => {
      try {
        await store.dispatch('agregarCliente', cliente)
        mostrarMensaje('Cliente agregado exitosamente')

        // Redirigir al listado después de 1 segundo
        setTimeout(() => {
          router.push({ name: 'listado' })
        }, 1000)
      } catch (error) {
        mostrarMensaje('Error al guardar el cliente', 'error')
        console.error(error)
      }
    }

    const volver = () => {
      router.push({ name: 'listado' })
    }

    return {
      snackbar,
      guardarCliente,
      volver
    }
  }
}
</script>
