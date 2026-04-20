import { Link, useParams, Navigate } from "react-router-dom";
import { getDept, getSubjectsForDept } from "../../data/dummyData";

// ─── Level Badge ────────────────────────────────────────────────────────────────
const levelColor = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

// ─── Subject Card ───────────────────────────────────────────────────────────────
function SubjectCard({ subject, dept }) {
  return (
    <Link
      to={`/departments/${dept.id}/subjects/${subject.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={subject.thumbnail}
          alt={subject.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColor[subject.level] || "bg-gray-100 text-gray-600"}`}>
          {subject.level}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-indigo-700 transition-colors">
          {subject.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{subject.description}</p>

        {/* Instructor */}
        <div className="flex items-center gap-2 pt-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${dept.color}`}>
            {subject.instructor.split(" ").pop()[0]}
          </div>
          <span className="text-xs text-gray-500">{subject.instructor}</span>
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {subject.totalCourses} courses
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {subject.totalLectures} lectures
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Department Detail Page ─────────────────────────────────────────────────────
export default function DepartmentDetailPage() {
  const { deptId } = useParams();
  const dept = getDept(deptId);

  if (!dept) return <Navigate to="/departments" replace />;

  const subjects = getSubjectsForDept(deptId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className={`bg-gradient-to-br ${dept.color} text-white`}>
        <div className="max-w-6xl mx-auto px-4 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link to="/departments" className="hover:text-white transition-colors">Departments</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">{dept.name}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shrink-0 backdrop-blur-sm">
              {dept.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{dept.name}</h1>
              <p className="text-white/80 text-base max-w-2xl">{dept.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            {[
              { label: "Total Courses", value: dept.totalCourses },
              { label: "Students", value: dept.totalStudents.toLocaleString() },
              { label: "Subjects", value: subjects.length },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Subjects</h2>
          <span className="text-sm text-gray-500">{subjects.length} subjects found</span>
        </div>

        {subjects.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg font-medium">No subjects yet for this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} dept={dept} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
