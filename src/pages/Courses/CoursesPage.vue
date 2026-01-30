<script setup lang="ts">
import { ref } from 'vue'
import { getCourses } from 'src/services/Courses/api'
import type { CourseModel } from 'src/services/Courses/model'

const rows = ref<CourseModel[]>([])
const loading = ref(false)

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
  sortBy: 'id',
  descending: false
})

const columns = [
  { name: 'title', label: 'Title', field: 'title', sortable: true },
  { name: 'author', label: 'Author', field: 'author', sortable: true },
  { name: 'category', label: 'Category', field: 'category', sortable: true },
  { name: 'students', label: 'Students', field: 'students', sortable: true },
  { name: 'rating', label: 'Rating', field: 'rating', sortable: true },
  { name: 'level', label: 'Level', field: 'level', sortable: true },
  { name: 'color', label: 'Color', field: 'color', sortable: false },
  { name: 'action', label: 'Action', field: 'action', sortable: false }
]


async function onRequest(props: any) {
  loading.value = true

  const { page, rowsPerPage, sortBy, descending } = props.pagination

  const res = await getCourses({
    page,
    rowsPerPage,
    sortBy,
    descending
  })

  rows.value = res.rows
  pagination.value.rowsNumber = res.total

  loading.value = false
}

function viewCourse(course: CourseModel) {
  console.log('View', course)
}

function editCourse(course: CourseModel) {
  console.log('Edit', course)
}

function deleteCourse(course: CourseModel) {
  console.log('Delete', course)
}
</script>

<template>
  <q-page padding>
    <q-table
      title="Courses"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
      binary-state-sort
      :dense="$q.screen.lt.md"
    >
      
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn dense flat icon="visibility" color="primary" @click="viewCourse(props.row)" />
          <q-btn dense flat icon="edit" color="secondary" @click="editCourse(props.row)" />
          <q-btn dense flat icon="delete" color="negative" @click="deleteCourse(props.row)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
