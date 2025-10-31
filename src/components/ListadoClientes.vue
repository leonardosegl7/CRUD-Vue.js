<template>
  <v-card>
    <v-card-title class="bg-gradient-to-r from-primary to-secondary text-white">
      <v-icon class="mr-2">mdi-account-group</v-icon>
      Listado de Clientes ({{ clientes.length }})
    </v-card-title>

    <!-- Sin clientes -->
    <v-card-text v-if="clientes.length === 0" class="text-center py-12">
      <v-icon size="80" color="grey-lighten-2">mdi-account-off</v-icon>
      <p class="text-h6 text-grey mt-4">No hay clientes registrados</p>
      <p class="text-body-2 text-grey">Agregue el primer cliente usando el formulario</p>
    </v-card-text>

    <!-- Tabla de clientes -->
    <v-table v-else>
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Correo Electrónico</th>
          <th class="text-left">Teléfono</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id" class="hover">
          <td>
            <v-icon size="small" class="mr-2">mdi-account</v-icon>
            {{ cliente.nombre }}
          </td>
          <td>
            <v-icon size="small" class="mr-2">mdi-email</v-icon>
            {{ cliente.email }}
          </td>
          <td>
            <v-icon size="small" class="mr-2">mdi-phone</v-icon>
            {{ cliente.telefono }}
          </td>
          <td class="text-center">
            <v-btn
              color="warning"
              size="small"
              icon="mdi-pencil"
              @click="editar(cliente)"
              class="mr-2"
            />
            <v-btn
              color="error"
              size="small"
              icon="mdi-delete"
              @click="confirmarEliminar(cliente)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
export default {
  name: 'ListadoClientes',

  props: {
    clientes: {
      type: Array,
      required: true
    }
  },

  emits: ['editar', 'eliminar'],

  setup(props, { emit }) {
    const editar = (cliente) => {
      emit('editar', cliente)
    }

    const confirmarEliminar = (cliente) => {
      emit('eliminar', cliente)
    }

    return {
      editar,
      confirmarEliminar
    }
  }
}
</script>

<style scoped>
.hover:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
