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


      <template v-slot:no-data="{ icon, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>Loading...</span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>

    <AddCourses
      v-model="showAddCourseModal"
      @saved="handleCourseSaved"
    />


    <DeleteCourse
      v-model="showDeleteCourseModal"
      :course="selectedCourse"
      @deleted="handleCourseDeleted"
    />


    <EditCourse
      v-model="showEditCourseModal"
      :course="selectedCourse"
      @updated="handleCourseUpdated"
    />


    <ViewCourse
      v-model="showViewCourseModal"
      :course="selectedCourse"
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
import DeleteCourse from './Modal/DeleteCourse.vue'
import EditCourse from './Modal/EditCourse.vue'
import ViewCourse from './Modal/ViewCourse.vue'

const rows = ref<CourseModel[]>([])
const loading = ref(false)
const showAddCourseModal = ref(false)
const showDeleteCourseModal = ref(false)
const showEditCourseModal = ref(false)
const showViewCourseModal = ref(false)
const selectedCourse = ref<CourseModel | null>(null)


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

function viewCourse(course: CourseModel) {
  selectedCourse.value = course;
  showViewCourseModal.value = true;
}
function editCourse(course: CourseModel) {
  selectedCourse.value = course;
  showEditCourseModal.value = true;
}

function deleteCourse(course: CourseModel) {
  selectedCourse.value = course;
  showDeleteCourseModal.value = true;
}

function handleCourseDeleted() {
  onRequest({ pagination: pagination.value });
}

function handleCourseUpdated( ) {
  onRequest({ pagination: pagination.value });
  showEditCourseModal.value = false;
}

async function handleCourseSaved(courseData: CourseModel) {
  try {
    const courseForInsertion = {
      ...courseData,
      students: parseInt(courseData.students || '0'),
      rating: parseFloat(courseData.rating || '0')
    };

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
