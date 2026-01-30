<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">Yangi Course Qo'shish</div>
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
        <q-btn label="Save" color="primary" @click="saveCourse" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import type { CourseModel } from 'src/services/Courses/model'
import { addCourse } from 'src/services/Courses/api'

const $q = useQuasar()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  saved: [data: CourseModel]
}>()

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


const formattedData = computed<CourseModel>(() => ({
  id: localFormData.value.id,
  created_at: '',
  title: localFormData.value.title,
  author: localFormData.value.author,
  category: localFormData.value.category,
  students: localFormData.value.students.toString(),
  rating: localFormData.value.rating.toString(),
  level: localFormData.value.level,
  color: localFormData.value.color
}))

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    localFormData.value = {
      id: '',
      title: '',
      author: '',
      category: '',
      students: 0,
      rating: 0,
      level: '',
      color: '#3B82F6'
    }
  }
})

function cancel() {
  showModal.value = false
}

async function saveCourse() {
  try {
    const savedCourse = await addCourse(formattedData.value)
    if (savedCourse) {
      $q.notify({ type: 'positive', message: 'Kurs muvaffaqiyatli qo\'shildi!' })
      emit('saved', savedCourse)
      // Close the modal after successful save
      showModal.value = false
    } else {
      $q.notify({ type: 'negative', message: 'Kurs qo\'shishda xatolik yuz berdi!' })
    }
  } catch (err) {
    console.error('Course qo‘shishda xatolik:', err)
    $q.notify({ type: 'negative', message: 'Serverda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.' })
    // Keeping the modal open so user can try again or fix the issue
  }
}
</script>