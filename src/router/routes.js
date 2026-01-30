import MainLayout from 'layouts/MainLayout.vue'
import Dashboard from 'pages/Dashboard/DashboardPage.vue'
import Courses from 'pages/Courses/CoursesPage.vue'
import Enrollment from 'pages/Enrollment/enrollmentPage.vue'
import Admin from 'pages/Admin/AdminPage.vue'
import Reports from 'pages/Reports/ReportsPage.vue'
import Settings from 'pages/Settings/SettingsPage.vue'
import ErrorNotFound from 'pages/ErrorNotFound.vue'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'dashboard', component: Dashboard },
      { path: 'courses', name: 'courses', component: Courses },
      { path: 'enrollment', name: 'enrollment', component: Enrollment },
      { path: 'admin', name: 'admin', component: Admin },
      { path: 'reports', name: 'reports', component: Reports },
      { path: 'settings', name: 'settings', component: Settings },
    ]
  },
  { path: '/:catchAll(.*)*', component: ErrorNotFound },
]
