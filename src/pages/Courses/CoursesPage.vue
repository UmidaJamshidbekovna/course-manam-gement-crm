<template>
  <q-page padding>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
      binary-state-sort
      card-class="bg-white text-black"
    >
      <template v-slot:top>
        <div class="row items-center full-width">
          <div class="text-h6 text-weight-bold">Courses Management</div>
          <q-space />
          <q-btn
            color="primary"
            label="Qo'shish"
            icon="add"
            push
            rounded
            @click="showAddCourseModal = true"
          />
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn dense flat round icon="visibility" color="primary" @click="viewCourse(props.row)">
            <q-tooltip>Ko'rish</q-tooltip>
          </q-btn>
          <q-btn dense flat round icon="edit" color="secondary" @click="editCourse(props.row)">
            <q-tooltip>Tahrirlash</q-tooltip>
          </q-btn>
          <q-btn dense flat round icon="delete" color="negative" @click="deleteCourse(props.row)">
            <q-tooltip>O'chirish</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>{{ loading ? 'Yuklanmoqda...' : 'Hech qanday kurs topilmadi' }}</span>
          <q-icon size="2em" name="library_books" />
        </div>
      </template>
    </q-table>

    <AddCourses v-model="showAddCourseModal" @saved="handleCourseSaved" />
    <DeleteCourse v-model="showDeleteCourseModal" :course="selectedCourse" @deleted="handleCourseDeleted" />
    <EditCourse v-model="showEditCourseModal" :course="selectedCourse" @updated="handleCourseUpdated" />
    <ViewCourse v-model="showViewCourseModal" :course="selectedCourse" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QTableProps, useQuasar } from 'quasar'
import { getCourses } from 'src/services/Courses/api' // API funksiyalarini import qildik
import type { CourseModel } from 'src/services/Courses/model'
import AddCourses from './Modal/AddCourses.vue'
import DeleteCourse from './Modal/DeleteCourse.vue'
import EditCourse from './Modal/EditCourse.vue'
import ViewCourse from './Modal/ViewCourse.vue'

const $q = useQuasar()
const rows = ref<CourseModel[]>([])
const loading = ref(false)
const showAddCourseModal = ref(false)
const showDeleteCourseModal = ref(false)
const showEditCourseModal = ref(false)
const showViewCourseModal = ref(false)
const selectedCourse = ref<CourseModel | null>(null)

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'id',
  descending: true // Yangi kurslar birinchi chiqishi uchun true
})

const columns: QTableProps['columns'] = [
  { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true },
  { name: 'author', label: 'Author', field: 'author', align: 'left', sortable: true },
  { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
  { name: 'students', label: 'Students', field: 'students', align: 'center', sortable: true },
  { name: 'rating', label: 'Rating', field: 'rating', align: 'center', sortable: true },
  { name: 'level', label: 'Level', field: 'level', align: 'center', sortable: true },
  { name: 'action', label: 'Action', field: 'action', align: 'right', sortable: false }
]

async function onRequest(props: any) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  loading.value = true
  try {
    const res = await getCourses({ page, rowsPerPage, sortBy, descending })
    rows.value = res.rows
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
    pagination.value.rowsNumber = res.total
  } catch (error) {
    console.error('Xato:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  onRequest({ pagination: pagination.value })
})

// YANGI KURS SAQLASH
function handleCourseSaved() {
  $q.notify({ color: 'positive', message: 'Kurs qo\'shildi' })
  showAddCourseModal.value = false

  // MUHIM: Pagination-ni boshiga qaytaramiz va ma'lumotni yangilaymiz
  pagination.value.page = 1
  onRequest({ pagination: pagination.value })
}

// Boshqa funksiyalar
function viewCourse(course: CourseModel) {
  selectedCourse.value = course
  showViewCourseModal.value = true
}
function editCourse(course: CourseModel) {
  selectedCourse.value = { ...course }
  showEditCourseModal.value = true
}
function deleteCourse(course: CourseModel) {
  selectedCourse.value = course
  showDeleteCourseModal.value = true
}
function handleCourseDeleted() {
  onRequest({ pagination: pagination.value })
}
function handleCourseUpdated() {
  onRequest({ pagination: pagination.value })
}
</script>