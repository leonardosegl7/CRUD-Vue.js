<template>
  <v-dialog v-model="dialogoVisible" max-width="500">
    <v-card>
      <v-card-title class="bg-error text-white">
        <v-icon class="mr-2">mdi-alert</v-icon>
        Confirmar Eliminación
      </v-card-title>

      <v-card-text class="pt-4">
        ¿Está seguro que desea eliminar al cliente
        <strong>{{ cliente?.nombre }}</strong>?
        <br><br>
        Esta acción no se puede deshacer.
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" @click="cancelar">Cancelar</v-btn>
        <v-btn color="error" @click="confirmar">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'DialogoConfirmacion',

  props: {
    mostrar: {
      type: Boolean,
      default: false
    },
    cliente: {
      type: Object,
      default: null
    }
  },

  emits: ['confirmar', 'cancelar'],

  setup(props, { emit }) {
    const dialogoVisible = ref(false)

    watch(() => props.mostrar, (nuevoValor) => {
      dialogoVisible.value = nuevoValor
    })

    const confirmar = () => {
      emit('confirmar')
    }

    const cancelar = () => {
      emit('cancelar')
    }

    return {
      dialogoVisible,
      confirmar,
      cancelar
    }
  }
}
</script>
