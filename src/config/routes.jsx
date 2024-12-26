import { createBrowserRouter } from 'react-router-dom';
import TeacherDashboard from '../layouts/TeacherDashboard';
import ClassCalendarView from '../layouts/ClassCalendarView';
import AttendancePage from '../layouts/AttendancePage';
import AssignmentsPage from '../layouts/AssignmentsPage';
import AddAssignment from '../layouts/AddAssignment';
import GradeEntrySystem from '../layouts/GradeEntrySystem';
import StudentReport from '../layouts/StudentReport';
import ClassroomReport from '../layouts/ClassroomReport';
import AdminDashboard from '../layouts/AdminDashboard';



const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>
  },
  {
    path: "/teacher",
    element: <TeacherDashboard />
  },
  {
    path: "/admin",
    element: <AdminDashboard />
  },
  {
    path: "/teacher/classes",
    element: <ClassCalendarView />
  } ,
  {
   path: "/teacher/attendance",
  element: <AttendancePage />
  },
  {
    path: "/teacher/assignments",
   element: <AssignmentsPage />},
   {
    path: "/teacher/addassignments",
   element: <AddAssignment />},
   {
    path: "/teacher/grades",
   element: <GradeEntrySystem />},
   {
    path: "/teacher/studentreports",
   element: <StudentReport />},
   {
    path: "/teacher/classroomreports",
   element: <ClassroomReport />},
]);

export default router;