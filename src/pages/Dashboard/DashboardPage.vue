<template>
  <q-page padding class="bg-grey-1">

    <!-- STATS CARDS -->
    <div class="row q-gutter-md justify-between">
      <q-card class="col-12 col-sm-6 col-md-4 col-lg-3" dense bordered>
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-subtitle2">Total Courses</div>
            <div class="text-h6 q-mt-sm">6</div>
            <div class="text-caption text-positive q-mt-xs">+2 this month</div>
          </div>
          <q-icon name="menu_book" size="36px" class="text-blue" />
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-sm-6 col-md-4 col-lg-3" dense bordered>
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-subtitle2">Total Students</div>
            <div class="text-h6 q-mt-sm">59,564</div>
            <div class="text-caption text-positive q-mt-xs">+12% this month</div>
          </div>
          <q-icon name="people" size="36px" class="text-green" />
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-sm-6 col-md-4 col-lg-3" dense bordered>
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-subtitle2">Revenue</div>
            <div class="text-h6 q-mt-sm">$2,977.6k</div>
            <div class="text-caption text-positive q-mt-xs">+8% this month</div>
          </div>
          <q-icon name="attach_money" size="36px" class="text-purple" />
        </q-card-section>
      </q-card>
    </div>

    <!-- TOP COURSES -->
    <q-card flat bordered class="q-mt-xl q-pa-md">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-subtitle1 text-weight-bold">
          Top Performing Courses
        </div>
        <q-icon name="bar_chart" size="20px" color="grey-6" />
      </div>

      <div
        v-for="(course, index) in courses"
        :key="course.id"
        class="row items-center q-py-md course-row"
      >
        <div class="rank">#{{ index + 1 }}</div>

        <div class="icon-box" :style="{ background: course.color }">
          <q-icon :name="course.icon" color="white" size="20px" />
        </div>

        <div class="col q-ml-md">
          <div class="text-subtitle2 text-weight-medium">
            {{ course.title }}
          </div>
          <div class="text-grey-6 text-caption">
            {{ course.category }}
          </div>
        </div>

        <div class="text-right">
          <div class="text-subtitle2 text-weight-bold">
            {{ course.students.toLocaleString() }}
          </div>
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

<script setup>
const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "Development",
    students: 15234,
    rating: 4.8,
    color: "#3B82F6",
    icon: "code"
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    category: "Data Science",
    students: 12456,
    rating: 4.7,
    color: "#10B981",
    icon: "analytics"
  },
  {
    id: 3,
    title: "Digital Marketing Complete Guide",
    category: "Marketing",
    students: 10543,
    rating: 4.8,
    color: "#8B5CF6",
    icon: "campaign"
  }
]
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
