<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">Kursni Tahrirlash</div>
      </q-card-section>

      <q-card-section>
        <q-input filled v-model="localFormData.title" label="Title" />
        <q-input filled v-model="localFormData.author" label="Author" class="q-mt-sm" />
        <q-input filled v-model="localFormData.category" label="Category" class="q-mt-sm" />
        <q-input filled v-model="localFormData.students" label="Students" type="number" class="q-mt-sm" />
        <q-input filled v-model="localFormData.rating" label="Rating" type="number" step="0.1" class="q-mt-sm" />
        <q-input filled v-model="localFormData.level" label="Level" class="q-mt-sm" />
        <q-input filled v-model="localFormData.color" label="Color (hex)" class="q-mt-sm" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" @click="cancel" />
        <q-btn label="Save" color="primary" @click="saveCourse" :loading="saving" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import type { CourseModel } from 'src/services/Courses/model'
import { updateCourse } from 'src/services/Courses/api'

const $q = useQuasar()

const props = defineProps<{
  modelValue: boolean
  course: CourseModel | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  updated: [data: CourseModel]
}>()

const saving = ref(false)
const showModal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const localFormData = ref({
  id: '',
  title: '',
  author: '',
  category: '',
  students: 0,
  rating: 0,
  level: '',
  color: '#3B82F6'
})

watch(() => props.course, (newCourse) => {
  if (newCourse) {
    localFormData.value = {
      id: newCourse.id || '',
      title: newCourse.title || '',
      author: newCourse.author || '',
      category: newCourse.category || '',
      students: parseInt(newCourse.students) || 0,
      rating: parseFloat(newCourse.rating) || 0,
      level: newCourse.level || '',
      color: newCourse.color || '#3B82F6'
    }
  }
}, { immediate: true })

watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    saving.value = false
  }
})

function cancel() {
  showModal.value = false
}

async function saveCourse() {
  if (!props.course?.id) return

  saving.value = true
  try {
    const courseForUpdate = {
      id: localFormData.value.id,
      title: localFormData.value.title,
      author: localFormData.value.author,
      category: localFormData.value.category,
      students: localFormData.value.students.toString(),
      rating: localFormData.value.rating.toString(),
      level: localFormData.value.level,
      color: localFormData.value.color,
      created_at: props.course.created_at
    }

    const updatedCourse = await updateCourse(courseForUpdate)
    if (updatedCourse) {
      $q.notify({ type: 'positive', message: 'Kurs muvaffaqiyatli tahrirlandi!' })
      emit('updated', updatedCourse)
      showModal.value = false
    } else {
      $q.notify({ type: 'negative', message: 'Kurs tahrirlashda xatolik yuz berdi!' })
    }
  } catch (err) {
    console.error('Course tahrirlashda xatolik:', err)
    $q.notify({ type: 'negative', message: 'Serverda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.' })
  } finally {
    saving.value = false
  }
}
</script>
