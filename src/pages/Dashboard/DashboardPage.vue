<template>
  <q-page padding class="bg-grey-1">
    <div class="row q-gutter-md justify-between">
      <!-- Stats Cards (static yoki dynamic) -->
    </div>

    <q-card flat bordered class="q-mt-xl q-pa-md">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-subtitle1 text-weight-bold">
          Top Performing Courses
        </div>
        <q-icon name="bar_chart" size="20px" color="grey-6" />
      </div>

      <div v-if="loading" class="text-center q-pa-md">Loading...</div>

      <div v-else v-for="(course, index) in courses" :key="course.id" class="row items-center q-py-md course-row">
        <div class="rank">#{{ index + 1 }}</div>
        <div class="icon-box" :style="{ background: course.color }">
          <q-icon name="book" color="white" size="20px" />
        </div>
        <div class="col q-ml-md">
          <div class="text-subtitle2 text-weight-medium">{{ course.title }}</div>
          <div class="text-grey-6 text-caption">{{ course.category }}</div>
        </div>
        <div class="text-right">
          <div class="text-subtitle2 text-weight-bold">{{ course.students.toLocaleString() }}</div>
          <div class="text-caption text-grey-6">students</div>
          <div class="row items-center justify-end q-mt-xs">
            <q-icon name="star" color="amber" size="16px" />
            <span class="q-ml-xs text-weight-medium">{{ course.rating }}</span>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CourseModel } from 'src/services/Courses/model'
import { getTopCourses } from 'src/services/Courses/api'

const courses = ref<CourseModel[]>([])
const loading = ref(false)

async function fetchTopCourses() {
  loading.value = true
  courses.value = await getTopCourses()
  loading.value = false
}

onMounted(() => {
  fetchTopCourses()
})
</script>

<style scoped>
.course-row:not(:last-child) {
  border-bottom: 1px solid #f1f1f1;
}

.rank {
  width: 40px;
  font-size: 18px;
  font-weight: 700;
  color: #cbd5e1;
}

.icon-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
