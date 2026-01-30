<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 400px;">
      <q-card-section>
        <div class="text-h6">Kurs Tafsilotlari</div>
      </q-card-section>

      <q-card-section v-if="course">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Title:</q-item-label>
                <q-item-label caption>{{ course.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Author:</q-item-label>
                <q-item-label caption>{{ course.author }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Category:</q-item-label>
                <q-item-label caption>{{ course.category }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-6">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Students:</q-item-label>
                <q-item-label caption>{{ course.students }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-6">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Rating:</q-item-label>
                <q-item-label caption>{{ course.rating }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-6">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Level:</q-item-label>
                <q-item-label caption>{{ course.level }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-6">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Color:</q-item-label>
                <q-item-label caption>
                  <div class="flex items-center">
                    <div 
                      :style="{ backgroundColor: course.color, width: '20px', height: '20px', borderRadius: '4px', marginRight: '8px' }"
                    ></div>
                    {{ course.color }}
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Created At:</q-item-label>
                <q-item-label caption>{{ formatDate(course.created_at) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Yopish" color="primary" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CourseModel } from 'src/services/Courses/model'

const props = defineProps<{
  modelValue: boolean
  course: CourseModel | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const showModal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function closeModal() {
  showModal.value = false
}

function formatDate(dateString: string) {
  if (!dateString) return 'N/A';
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
</script>
