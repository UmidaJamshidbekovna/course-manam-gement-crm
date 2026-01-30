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

      <!-- Row actions -->
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

      <!-- No data -->
      <template v-slot:no-data="{ icon, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>Loading...</span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>

    <!-- Add Courses Modal -->
    <AddCourses
      v-model="showAddCourseModal"
      @saved="handleCourseSaved"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QTableProps } from 'quasar'
import { getCourses } from 'src/services/Courses/api'
import { supabase } from 'boot/supabase'
import type { CourseModel } from 'src/services/Courses/model'
import AddCourses from './Modal/AddCourses.vue'

const rows = ref<CourseModel[]>([])
const loading = ref(false)
const showAddCourseModal = ref(false)

type Column = QTableProps['columns'][number]

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'id',
  descending: false
})

const columns: Column[] = [
  { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true },
  { name: 'author', label: 'Author', field: 'author', align: 'left', sortable: true },
  { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
  { name: 'students', label: 'Students', field: 'students', align: 'center', sortable: true },
  { name: 'rating', label: 'Rating', field: 'rating', align: 'center', sortable: true },
  { name: 'level', label: 'Level', field: 'level', align: 'center', sortable: true },
  { name: 'color', label: 'Color', field: 'color', align: 'center', sortable: false },
  { name: 'action', label: 'Action', field: 'action', align: 'right', sortable: false }
]

// Fetch courses with pagination
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
    console.error('Maʼlumot olishda xatolik:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  onRequest({ pagination: pagination.value })
})

// Row actions
function viewCourse(course: CourseModel) { console.log('View', course) }
function editCourse(course: CourseModel) { console.log('Edit', course) }
function deleteCourse(course: CourseModel) { console.log('Delete', course) }

// Handle course saved from modal
async function handleCourseSaved(courseData: CourseModel) {
  try {
    // Prepare data for insertion, excluding the created_at field which will be set by the database
    const courseForInsertion = {
      ...courseData,
      // Convert string numbers to actual numbers for the database
      students: parseInt(courseData.students || '0'),
      rating: parseFloat(courseData.rating || '0')
    };

    // Remove created_at field if it exists to let the database set it
    delete courseForInsertion.created_at;

    const { error } = await supabase.from('courses').insert([courseForInsertion])
    if (error) throw error

    showAddCourseModal.value = false
    onRequest({ pagination: pagination.value })
  } catch (err) {
    console.error('Course qo‘shishda xatolik:', err)
  }
}
</script>
