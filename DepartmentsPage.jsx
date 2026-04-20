import { Link } from "react-router-dom";
import { departments } from "../../data/dummyData";

// ─── Department Card ────────────────────────────────────────────────────────────
function DeptCard({ dept }) {
  return (
    <Link
      to={`/departments/${dept.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Gradient banner */}
      <div className={`h-28 bg-gradient-to-br ${dept.color} flex items-center justify-center`}>
        <span className="text-5xl drop-shadow-md select-none">{dept.icon}</span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        {/* Badge */}
        <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full ${dept.badge}`}>
          {dept.shortName}
        </span>

        <h2 className="text-base font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
          {dept.name}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed flex-1">{dept.description}</p>

        {/* Stats row */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{dept.totalCourses}</p>
            <p className="text-xs text-gray-400">Courses</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{dept.totalStudents.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Students</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{dept.subjects.length}</p>
            <p className="text-xs text-gray-400">Subjects</p>
          </div>
        </div>
      </div>

      {/* Arrow hint */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

// ─── Departments Page ───────────────────────────────────────────────────────────
export default function DepartmentsPage() {
  const totalStudents = departments.reduce((acc, d) => acc + d.totalStudents, 0);
  const totalCourses = departments.reduce((acc, d) => acc + d.totalCourses, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <p className="text-indigo-300 text-sm font-semibold tracking-widest uppercase mb-3">
            CGEC Learning Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Choose Your Department
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mb-10">
            Explore video lectures, course material and resources curated for every branch of engineering.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Departments", value: departments.length },
              { label: "Courses", value: totalCourses },
              { label: "Students", value: totalStudents.toLocaleString() },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">All Departments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
      </div>
    </div>
  );
}
