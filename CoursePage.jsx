import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  getDept,
  subjects as allSubjects,
  courses as allCourses,
  getLecturesForCourse,
} from "../../data/dummyData";

// ─── Helpers ────────────────────────────────────────────────────────────────────
function findCourse(subjectId, courseId) {
  const list = allCourses[subjectId] || [];
  return list.find((c) => c.id === courseId) || null;
}

const levelColor = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

// ─── Lecture Row ────────────────────────────────────────────────────────────────
function LectureRow({ lecture, index, deptId, subjectId, courseId, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
        isActive
          ? "bg-indigo-50 border border-indigo-200"
          : "hover:bg-gray-50 border border-transparent"
      }`}
    >
      {/* Index / play icon */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isActive ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {isActive ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <span>{index + 1}</span>
        )}
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? "text-indigo-700" : "text-gray-800"}`}>
          {lecture.title}
        </p>
        {lecture.isPreview && (
          <span className="text-xs text-emerald-600 font-semibold">Free Preview</span>
        )}
      </div>

      {/* Duration */}
      <span className="shrink-0 text-xs text-gray-400">{lecture.duration}</span>

      {/* Watch link (only for preview or active) */}
      {(lecture.isPreview || isActive) && (
        <Link
          to={`/departments/${deptId}/subjects/${subjectId}/courses/${courseId}/lecture/${lecture.id}`}
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 text-xs text-indigo-600 font-semibold hover:underline"
        >
          Watch
        </Link>
      )}
    </button>
  );
}

// ─── Course Page ────────────────────────────────────────────────────────────────
export default function CoursePage() {
  const { deptId, subjectId, courseId } = useParams();
  const dept = getDept(deptId);
  const subject = allSubjects[subjectId];
  const course = findCourse(subjectId, courseId);
  const [activeLecture, setActiveLecture] = useState(null);

  if (!dept || !subject || !course) return <Navigate to="/departments" replace />;

  const lectures = getLecturesForCourse(courseId);
  const totalDuration = lectures.reduce((acc, l) => {
    const [m, s] = l.duration.split(":").map(Number);
    return acc + m * 60 + s;
  }, 0);
  const totalMin = Math.floor(totalDuration / 60);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${dept.color} text-white`}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-1.5 text-sm text-white/70 mb-6">
            <Link to="/departments" className="hover:text-white">Departments</Link>
            <span>/</span>
            <Link to={`/departments/${deptId}`} className="hover:text-white">{dept.shortName}</Link>
            <span>/</span>
            <Link to={`/departments/${deptId}/subjects/${subjectId}`} className="hover:text-white">{subject.name}</Link>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-xs">{course.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: info */}
            <div className="flex-1">
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${levelColor[course.level]} bg-opacity-90`}>
                {course.level}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{course.title}</h1>
              <p className="text-white/80 mb-5 max-w-xl">{course.description}</p>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  {course.instructor.split(" ").pop()[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{course.instructor}</p>
                  <p className="text-white/60 text-xs">Instructor</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Stars rating={course.rating} />
                <span className="text-white/70">·</span>
                <span>{course.enrolled.toLocaleString()} students enrolled</span>
                <span className="text-white/70">·</span>
                <span>{course.lectureCount} lectures</span>
                <span className="text-white/70">·</span>
                <span>{course.duration} total</span>
              </div>
            </div>

            {/* Right: thumbnail card */}
            <div className="lg:w-80 shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
                <div className="bg-white p-4">
                  <Link
                    to={`/departments/${deptId}/subjects/${subjectId}/courses/${courseId}/lecture/${lectures[0]?.id}`}
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
                  >
                    {lectures[0]?.isPreview ? "▶ Watch Free Preview" : "▶ Start Course"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lecture List */}
          <div className="flex-1">
            {/* Summary bar */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
              <span className="text-sm text-gray-500">
                {lectures.length} lectures · {totalMin} min
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
              {lectures.length === 0 ? (
                <p className="text-center text-gray-400 py-10">No lectures added yet.</p>
              ) : (
                lectures.map((lecture, idx) => (
                  <LectureRow
                    key={lecture.id}
                    lecture={lecture}
                    index={idx}
                    deptId={deptId}
                    subjectId={subjectId}
                    courseId={courseId}
                    isActive={activeLecture === lecture.id}
                    onClick={() => setActiveLecture(lecture.id === activeLecture ? null : lecture.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-4">
            {/* What you'll learn */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3">What you'll learn</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Core concepts from scratch",
                  "Hands-on coding examples",
                  "Interview-ready problem solving",
                  "Best practices & patterns",
                  "Real-world applications",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3">Requirements</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Basic programming knowledge", "Laptop / PC", "Enthusiasm to learn"].map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subject link */}
            <Link
              to={`/departments/${deptId}/subjects/${subjectId}`}
              className="text-center text-sm text-indigo-600 font-semibold hover:underline"
            >
              ← Back to {subject.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
