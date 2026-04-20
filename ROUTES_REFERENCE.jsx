// ─── ARYAAN's Routes — add these inside your <Routes> in App.jsx ──────────────
//
// Import the pages:
//
//   import DepartmentsPage       from "./pages/DepartmentPage/DepartmentsPage";
//   import DepartmentDetailPage  from "./pages/DepartmentPage/DepartmentDetailPage";
//   import SubjectPage           from "./pages/SubjectPage/SubjectPage";
//   import CoursePage            from "./pages/CoursePage/CoursePage";
//
// Then add inside <Routes>:
//
//   <Route path="/departments"                                                  element={<DepartmentsPage />} />
//   <Route path="/departments/:deptId"                                          element={<DepartmentDetailPage />} />
//   <Route path="/departments/:deptId/subjects/:subjectId"                      element={<SubjectPage />} />
//   <Route path="/departments/:deptId/subjects/:subjectId/courses/:courseId"    element={<CoursePage />} />
//
// The lecture watch route below is for GouraV's WatchPage — kept here for reference:
//   <Route
//     path="/departments/:deptId/subjects/:subjectId/courses/:courseId/lecture/:lectureId"
//     element={<WatchPage />}
//   />
//
// Navigation flow:
//   /departments
//     → /departments/:deptId                                        (DepartmentDetailPage)
//       → /departments/:deptId/subjects/:subjectId                  (SubjectPage)
//         → /departments/:deptId/subjects/:subjectId/courses/:courseId  (CoursePage)
//           → /departments/:deptId/subjects/:subjectId/courses/:courseId/lecture/:lectureId  (GouraV's WatchPage)

// ─── Example minimal App.jsx ────────────────────────────────────────────────────
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DepartmentsPage      from "./pages/DepartmentPage/DepartmentsPage";
import DepartmentDetailPage from "./pages/DepartmentPage/DepartmentDetailPage";
import SubjectPage          from "./pages/SubjectPage/SubjectPage";
import CoursePage           from "./pages/CoursePage/CoursePage";

export default function App() {
  return (
    <BrowserRouter>
      {/* hi's Navbar goes here */}
      <Routes>
        <Route path="/" element={<Navigate to="/departments" replace />} />

        {/* ── ARYAAN's pages ── */}
        <Route path="/departments"                                               element={<DepartmentsPage />} />
        <Route path="/departments/:deptId"                                       element={<DepartmentDetailPage />} />
        <Route path="/departments/:deptId/subjects/:subjectId"                   element={<SubjectPage />} />
        <Route path="/departments/:deptId/subjects/:subjectId/courses/:courseId" element={<CoursePage />} />

        {/* ── GouraV's WatchPage goes here ── */}
        {/* <Route path="/departments/:deptId/subjects/:subjectId/courses/:courseId/lecture/:lectureId" element={<WatchPage />} /> */}
      </Routes>
      {/* hi's Footer goes here */}
    </BrowserRouter>
  );
}
