<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <q-icon name="settings" size="32px" class="q-mr-sm" />
      <div>
        <div class="text-h5 text-weight-bold">Settings</div>
        <div class="text-subtitle2 text-grey-7">
          Configure system preferences
        </div>
      </div>
    </div>

    <q-card flat bordered class="q-pa-xl flex flex-center">
      <div class="text-center">
        <q-icon
          name="tune"
          size="64px"
          color="grey-4"
          class="q-mb-md"
        />

        <div class="text-h6 text-weight-bold q-mb-sm">
          System Settings
        </div>

        <div class="text-body1 text-grey-7 q-mb-sm">
          Manage application settings and configurations
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
