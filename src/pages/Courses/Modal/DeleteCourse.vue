<template>
  <q-dialog v-model="localModelValue">
    <q-card style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">O'chirishni tasdiqlang</div>
      </q-card-section>

      <q-card-section>
        <p>"{{ course?.title }}" kursini haqiqatdan ham o'chirmoqchimisiz?</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Bekor qilish" color="negative" @click="cancel" />
        <q-btn label="Ha, o'chirish" color="primary" @click="confirmDelete" :loading="deleting" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useQuasar } from 'quasar'
import type { CourseModel } from 'src/services/Courses/model'
import { deleteCourse as deleteCourseApi } from 'src/services/Courses/api'

const props = defineProps<{
  modelValue: boolean
  course: CourseModel | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  deleted: []
}>()

const localModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const deleting = ref(false);
const $q = useQuasar();

watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
//
  }
})

function cancel() {
  localModelValue.value = false;
}

async function confirmDelete() {
  if (!props.course?.id) return;

  deleting.value = true;
  try {
    const success = await deleteCourseApi(props.course.id);

    if (success) {
      $q.notify({ type: 'positive', message: 'Muvaffaqiyatli o\'chirildi!' });
      emit('deleted');

      localModelValue.value = false;
    } else {
      $q.notify({ type: 'negative', message: 'O\'chirish amalga oshmadi.' });
    }
  } catch (err) {
    console.error("Xato:", err);
  } finally {
    deleting.value = false;
  }
}
</script>