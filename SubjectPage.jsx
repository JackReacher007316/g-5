import { Link, useParams, Navigate } from "react-router-dom";
import { getDept, subjects as allSubjects, getCoursesForSubject } from "../../data/dummyData";

const levelColor = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

// ─── Star Rating ────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

// ─── Course Card ────────────────────────────────────────────────────────────────
function CourseCard({ course, dept }) {
  return (
    <Link
      to={`/departments/${dept.id}/subjects/${course.subjectId}/courses/${course.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-700 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full ${levelColor[course.level] || "bg-gray-100 text-gray-600"}`}>
          {course.level}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-indigo-700 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed flex-1">{course.description}</p>

        {/* Instructor */}
        <p className="text-xs text-gray-400">{course.instructor}</p>

        {/* Rating */}
        <Stars rating={course.rating} />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
          <span>{course.lectureCount} lectures · {course.duration}</span>
          <span>{course.enrolled.toLocaleString()} enrolled</span>
        </div>
      </div>
    </Link>
  );
}

// ─── Subject Page ───────────────────────────────────────────────────────────────
export default function SubjectPage() {
  const { deptId, subjectId } = useParams();
  const dept = getDept(deptId);
  const subject = allSubjects[subjectId];

  if (!dept || !subject) return <Navigate to="/departments" replace />;

  const courses = getCoursesForSubject(subjectId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className={`bg-gradient-to-br ${dept.color} text-white`}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-1.5 text-sm text-white/70 mb-6">
            <Link to="/departments" className="hover:text-white transition-colors">Departments</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to={`/departments/${deptId}`} className="hover:text-white transition-colors">{dept.name}</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">{subject.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{subject.name}</h1>
          <p className="text-white/80 text-base max-w-2xl mb-6">{subject.description}</p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm`}>
              {subject.instructor.split(" ").pop()[0]}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{subject.instructor}</p>
              <p className="text-white/60 text-xs">Subject Coordinator</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Courses", value: subject.totalCourses },
              { label: "Lectures", value: subject.totalLectures },
              { label: "Level", value: subject.level },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 rounded-xl px-4 py-2.5">
                <p className="font-black text-xl">{s.value}</p>
                <p className="text-white/70 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Courses in {subject.name}</h2>
          <span className="text-sm text-gray-500">{courses.length} courses</span>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg font-medium">No courses added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} dept={dept} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
