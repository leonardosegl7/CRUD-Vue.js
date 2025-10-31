<template>
  <v-card class="mb-6">
    <v-card-title class="bg-primary text-white">
      <v-icon class="mr-2">{{ modoEdicion ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
      {{ modoEdicion ? 'Editar Cliente' : 'Nuevo Cliente' }}
    </v-card-title>

    <v-card-text class="pt-6">
      <v-form ref="formulario" v-model="formularioValido">
        <!-- Campo Nombre -->
        <v-text-field
          v-model="formData.nombre"
          :rules="reglasNombre"
          label="Nombre Completo"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          required
          class="mb-2"
        />

        <!-- Campo Email -->
        <v-text-field
          v-model="formData.email"
          :rules="reglasEmail"
          label="Correo Electrónico"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          type="email"
          required
          class="mb-2"
        />

        <!-- Campo Teléfono -->
        <v-text-field
          v-model="formData.telefono"
          :rules="reglasTelefono"
          label="Teléfono"
          prepend-inner-icon="mdi-phone"
          variant="outlined"
          required
        />
      </v-form>
    </v-card-text>

    <v-card-actions class="px-6 pb-4">
      <v-btn
        color="primary"
        :disabled="!formularioValido"
        @click="guardarCliente"
        prepend-icon="mdi-content-save"
        block
        size="large"
      >
        {{ modoEdicion ? 'Actualizar' : 'Guardar' }}
      </v-btn>

      <v-btn
        v-if="modoEdicion"
        color="grey"
        @click="cancelarEdicion"
        prepend-icon="mdi-close"
        block
        size="large"
        class="ml-2"
      >
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: 'FormularioCliente',

  props: {
    clienteEditar: {
      type: Object,
      default: null
    }
  },

  emits: ['guardar', 'cancelar'],

  setup(props, { emit }) {
    const formulario = ref(null)
    const formularioValido = ref(false)

    const formData = ref({
      nombre: '',
      email: '',
      telefono: ''
    })

    const reglasNombre = [
      v => !!v || 'El nombre es obligatorio',
      v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 caracteres'
    ]

    const reglasEmail = [
      v => !!v || 'El correo electrónico es obligatorio',
      v => /.+@.+\..+/.test(v) || 'El correo electrónico no es válido'
    ]

    const reglasTelefono = [
      v => !!v || 'El teléfono es obligatorio',
      v => /^[\d\s\-+()]{8,}$/.test(v) || 'El teléfono no es válido'
    ]

    const modoEdicion = computed(() => props.clienteEditar !== null)

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
      formData.value = {
        nombre: '',
        email: '',
        telefono: ''
      }
      if (formulario.value) {
        formulario.value.reset()
        formulario.value.resetValidation()
      }
    }

    // Watch para cargar datos al editar
    watch(() => props.clienteEditar, (nuevoValor) => {
      if (nuevoValor) {
        formData.value = { ...nuevoValor }
      } else {
        limpiarFormulario()
      }
    }, { immediate: true })

    // Función para guardar cliente
    const guardarCliente = async () => {
      if (!formulario.value) return

      const { valid } = await formulario.value.validate()

      if (valid) {
        console.log('Guardando cliente:', formData.value)
        emit('guardar', { ...formData.value })

        // Solo limpiar si es un nuevo cliente (no edición)
        if (!modoEdicion.value) {
          limpiarFormulario()
        }
      }
    }

    // Función para cancelar edición
    const cancelarEdicion = () => {
      console.log('Cancelando edición')
      limpiarFormulario()
      emit('cancelar')
    }

    return {
      formulario,
      formularioValido,
      formData,
      reglasNombre,
      reglasEmail,
      reglasTelefono,
      modoEdicion,
      guardarCliente,
      cancelarEdicion
    }
  }
}
</script>
