<template>
  <q-page class="q-pa-lg">
    <!-- Header -->
    <div class="row items-center q-mb-lg">
      <q-icon name="admin_panel_settings" size="32px" class="q-mr-sm" />
      <div>
        <div class="text-h5 text-weight-bold">Admin Users</div>
        <div class="text-subtitle2 text-grey-7">
          Manage system users and roles
        </div>
      </div>
    </div>

    <!-- Card -->
    <q-card flat bordered class="q-pa-xl flex flex-center">
      <div class="text-center">
        <q-icon
          name="group"
          size="64px"
          color="grey-4"
          class="q-mb-md"
        />

        <div class="text-h6 text-weight-bold q-mb-sm">
          User Management
        </div>

        <div class="text-body1 text-grey-7 q-mb-sm">
          View and manage all users, roles, and permissions
        </div>

        <div class="text-caption text-grey-6">
          This feature is coming soon...
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>

</script>

<style scoped>
.q-card {
  min-height: 320px;
  border-radius: 12px;
}
</style>
