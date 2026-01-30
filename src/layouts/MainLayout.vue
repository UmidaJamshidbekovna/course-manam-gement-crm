<template>
  <q-layout view="lHh Lpr lFf">

    <q-header bordered class="q-pa-sm bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title>
          Courses Management 
        </q-toolbar-title>

        <q-btn flat round icon="notifications" />
        <q-btn flat round icon="account_circle" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above bordered :width="220">
      <div class="q-pa-sm flex flex-center">
        <q-img :src="logo" fit="contain" />
      </div>

      <q-list padding>
        <q-item clickable v-ripple :to="{ name: 'dashboard' }" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'courses' }">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>Courses</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'enrollment' }">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>Enrollment</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'admin' }">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Admin Users</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'reports' }">
          <q-item-section avatar>
            <q-icon name="bar_chart" />
          </q-item-section>
          <q-item-section>Reports</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'settings' }">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import logo from 'assets/logo.svg'
</script>
