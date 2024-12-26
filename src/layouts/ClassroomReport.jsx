import React, { useState } from 'react';
import { Calendar, ChevronDown, Award, TrendingUp, Users, Search, Star, Medal, Filter } from 'lucide-react';

const ClassroomReport = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedExam, setSelectedExam] = useState('final');
  
  // Dummy data
  const classes = ["10A", "10B", "10C", "11A", "11B", "11C"];
  const subjects = [
    { id: 'all', name: 'Overall' },
    { id: 'math', name: 'Mathematics' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'english', name: 'English' },
    { id: 'history', name: 'History' }
  ];
  const exams = [
    { id: 'final', name: 'Final Exam' },
    { id: 'midterm', name: 'Midterm' },
    { id: 'unit1', name: 'Unit Test 1' },
    { id: 'unit2', name: 'Unit Test 2' },
    { id: 'practical', name: 'Practical' }
  ];

  // Dummy classroom data
  const classInfo = {
    teacherName: "Mrs. Sarah Parker",
    totalStudents: 35,
    averageAttendance: 92,
    averageScore: 84.5,
    topScore: 95.5,
    lowestScore: 65.8
  };

  // Expanded student data with subject-wise scores
  const studentList = [
    {
      rank: 1,
      name: "Alex Johnson",
      rollNo: "1234",
      attendance: 98,
      achievements: 3,
      scores: {
        math: { final: 98, midterm: 95, unit1: 92, unit2: 94, practical: 96 },
        physics: { final: 95, midterm: 92, unit1: 90, unit2: 93, practical: 95 },
        chemistry: { final: 94, midterm: 93, unit1: 91, unit2: 92, practical: 94 },
        english: { final: 92, midterm: 90, unit1: 89, unit2: 91, practical: 93 },
        history: { final: 96, midterm: 94, unit1: 92, unit2: 95, practical: 95 }
      }
    },
    {
        rank: 2,
        name: "Emma Wilson",
        rollNo: "1235",
        attendance: 96,
        achievements: 2,
        scores: {
          math: { final: 96, midterm: 94, unit1: 91, unit2: 93, practical: 95 },
          physics: { final: 94, midterm: 91, unit1: 89, unit2: 92, practical: 94 },
          chemistry: { final: 95, midterm: 92, unit1: 90, unit2: 93, practical: 95 },
          english: { final: 93, midterm: 91, unit1: 88, unit2: 90, practical: 92 },
          history: { final: 94, midterm: 92, unit1: 90, unit2: 93, practical: 94 }
        }
      },
      {
        rank: 3,
        name: "Michael Brown",
        rollNo: "1236",
        attendance: 97,
        achievements: 2,
        scores: {
          math: { final: 95, midterm: 93, unit1: 90, unit2: 92, practical: 94 },
          physics: { final: 93, midterm: 90, unit1: 88, unit2: 91, practical: 93 },
          chemistry: { final: 94, midterm: 91, unit1: 89, unit2: 92, practical: 94 },
          english: { final: 94, midterm: 92, unit1: 89, unit2: 91, practical: 93 },
          history: { final: 93, midterm: 91, unit1: 89, unit2: 92, practical: 93 }
        }
      },
      {
        rank: 4,
        name: "Sarah Davis",
        rollNo: "1237",
        attendance: 94,
        achievements: 1,
        scores: {
          math: { final: 92, midterm: 90, unit1: 87, unit2: 89, practical: 91 },
          physics: { final: 91, midterm: 88, unit1: 86, unit2: 89, practical: 90 },
          chemistry: { final: 93, midterm: 90, unit1: 88, unit2: 91, practical: 92 },
          english: { final: 90, midterm: 88, unit1: 85, unit2: 87, practical: 89 },
          history: { final: 92, midterm: 89, unit1: 87, unit2: 90, practical: 91 }
        }
      },
      {
        rank: 5,
        name: "James Miller",
        rollNo: "1238",
        attendance: 95,
        achievements: 1,
        scores: {
          math: { final: 91, midterm: 89, unit1: 86, unit2: 88, practical: 90 },
          physics: { final: 90, midterm: 87, unit1: 85, unit2: 88, practical: 89 },
          chemistry: { final: 92, midterm: 89, unit1: 87, unit2: 90, practical: 91 },
          english: { final: 89, midterm: 87, unit1: 84, unit2: 86, practical: 88 },
          history: { final: 91, midterm: 88, unit1: 86, unit2: 89, practical: 90 }
        }
      },
      {
        rank: 6,
        name: "Emily Clark",
        rollNo: "1239",
        attendance: 93,
        achievements: 1,
        scores: {
          math: { final: 89, midterm: 87, unit1: 84, unit2: 86, practical: 88 },
          physics: { final: 88, midterm: 85, unit1: 83, unit2: 86, practical: 87 },
          chemistry: { final: 90, midterm: 87, unit1: 85, unit2: 88, practical: 89 },
          english: { final: 91, midterm: 88, unit1: 86, unit2: 89, practical: 90 },
          history: { final: 89, midterm: 86, unit1: 84, unit2: 87, practical: 88 }
        }
      },
      {
        rank: 7,
        name: "Daniel Lee",
        rollNo: "1240",
        attendance: 91,
        achievements: 0,
        scores: {
          math: { final: 87, midterm: 85, unit1: 82, unit2: 84, practical: 86 },
          physics: { final: 86, midterm: 83, unit1: 81, unit2: 84, practical: 85 },
          chemistry: { final: 88, midterm: 85, unit1: 83, unit2: 86, practical: 87 },
          english: { final: 89, midterm: 86, unit1: 84, unit2: 87, practical: 88 },
          history: { final: 87, midterm: 84, unit1: 82, unit2: 85, practical: 86 }
        }
      },
      {
        rank: 8,
        name: "Sophia Chen",
        rollNo: "1241",
        attendance: 94,
        achievements: 1,
        scores: {
          math: { final: 86, midterm: 84, unit1: 81, unit2: 83, practical: 85 },
          physics: { final: 85, midterm: 82, unit1: 80, unit2: 83, practical: 84 },
          chemistry: { final: 87, midterm: 84, unit1: 82, unit2: 85, practical: 86 },
          english: { final: 88, midterm: 85, unit1: 83, unit2: 86, practical: 87 },
          history: { final: 86, midterm: 83, unit1: 81, unit2: 84, practical: 85 }
        }
      },
      {
        rank: 9,
        name: "Oliver Wang",
        rollNo: "1242",
        attendance: 92,
        achievements: 0,
        scores: {
          math: { final: 84, midterm: 82, unit1: 79, unit2: 81, practical: 83 },
          physics: { final: 83, midterm: 80, unit1: 78, unit2: 81, practical: 82 },
          chemistry: { final: 85, midterm: 82, unit1: 80, unit2: 83, practical: 84 },
          english: { final: 86, midterm: 83, unit1: 81, unit2: 84, practical: 85 },
          history: { final: 84, midterm: 81, unit1: 79, unit2: 82, practical: 83 }
        }
      },
      {
        rank: 10,
        name: "Ava Martinez",
        rollNo: "1243",
        attendance: 90,
        achievements: 0,
        scores: {
          math: { final: 82, midterm: 80, unit1: 77, unit2: 79, practical: 81 },
          physics: { final: 81, midterm: 78, unit1: 76, unit2: 79, practical: 80 },
          chemistry: { final: 83, midterm: 80, unit1: 78, unit2: 81, practical: 82 },
          english: { final: 84, midterm: 81, unit1: 79, unit2: 82, practical: 83 },
          history: { final: 82, midterm: 79, unit1: 77, unit2: 80, practical: 81 }
        }
      },
      {
        rank: 11,
        name: "Lucas Garcia",
        rollNo: "1244",
        attendance: 89,
        achievements: 0,
        scores: {
          math: { final: 80, midterm: 78, unit1: 75, unit2: 77, practical: 79 },
          physics: { final: 79, midterm: 76, unit1: 74, unit2: 77, practical: 78 },
          chemistry: { final: 81, midterm: 78, unit1: 76, unit2: 79, practical: 80 },
          english: { final: 82, midterm: 79, unit1: 77, unit2: 80, practical: 81 },
          history: { final: 80, midterm: 77, unit1: 75, unit2: 78, practical: 79 }
        }
      },
      {
        rank: 12,
        name: "Isabella Kim",
        rollNo: "1245",
        attendance: 93,
        achievements: 1,
        scores: {
          math: { final: 85, midterm: 83, unit1: 80, unit2: 82, practical: 84 },
          physics: { final: 84, midterm: 81, unit1: 79, unit2: 82, practical: 83 },
          chemistry: { final: 86, midterm: 83, unit1: 81, unit2: 84, practical: 85 },
          english: { final: 87, midterm: 84, unit1: 82, unit2: 85, practical: 86 },
          history: { final: 85, midterm: 82, unit1: 80, unit2: 83, practical: 84 }
        }
      },
      {
        rank: 13,
        name: "William Turner",
        rollNo: "1246",
        attendance: 91,
        achievements: 0,
        scores: {
          math: { final: 78, midterm: 76, unit1: 73, unit2: 75, practical: 77 },
          physics: { final: 77, midterm: 74, unit1: 72, unit2: 75, practical: 76 },
          chemistry: { final: 79, midterm: 76, unit1: 74, unit2: 77, practical: 78 },
          english: { final: 80, midterm: 77, unit1: 75, unit2: 78, practical: 79 },
          history: { final: 78, midterm: 75, unit1: 73, unit2: 76, practical: 77 }
        }
      },
      {
        rank: 14,
        name: "Sophie Anderson",
        rollNo: "1247",
        attendance: 88,
        achievements: 0,
        scores: {
          math: { final: 76, midterm: 74, unit1: 71, unit2: 73, practical: 75 },
          physics: { final: 75, midterm: 72, unit1: 70, unit2: 73, practical: 74 },
          chemistry: { final: 77, midterm: 74, unit1: 72, unit2: 75, practical: 76 },
          english: { final: 78, midterm: 75, unit1: 73, unit2: 76, practical: 77 },
          history: { final: 76, midterm: 73, unit1: 71, unit2: 74, practical: 75 }
        }
      },
      {
        rank: 15,
        name: "Ethan Parker",
        rollNo: "1248",
        attendance: 87,
        achievements: 0,
        scores: {
          math: { final: 74, midterm: 72, unit1: 69, unit2: 71, practical: 73 },
          physics: { final: 73, midterm: 70, unit1: 68, unit2: 71, practical: 72 },
          chemistry: { final: 75, midterm: 72, unit1: 70, unit2: 73, practical: 74 },
          english: { final: 76, midterm: 73, unit1: 71, unit2: 74, practical: 75 },
          history: { final: 74, midterm: 71, unit1: 69, unit2: 72, practical: 73 }
        }
      }
    // Add more students with similar structure...
  ];

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'bg-yellow-100 text-yellow-600';
      case 2: return 'bg-gray-100 text-gray-600';
      case 3: return 'bg-orange-100 text-orange-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const getStudentScore = (student, subject, exam) => {
    if (subject === 'all') {
      // Calculate average across all subjects for the selected exam
      const scores = Object.values(student.scores).map(s => s[exam]);
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    return student.scores[subject][exam];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with Filters */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Class Leaderboard</h1>
            <p className="text-gray-600">Academic Year 2023-24</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>Class {cls}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>{exam.name}</option>
                ))}
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              Download Report
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {selectedClass ? (
        <>
          {/* Class Info Card */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-xl font-bold">{classInfo.totalStudents}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class Average</p>
                    <p className="text-xl font-bold">{classInfo.averageScore}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Highest Score</p>
                    <p className="text-xl font-bold">{classInfo.topScore}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Attendance</p>
                    <p className="text-xl font-bold">{classInfo.averageAttendance}%</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Star className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class Teacher</p>
                    <p className="text-xl font-bold">{classInfo.teacherName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-4 text-left">Rank</th>
                    <th className="pb-4 text-left">Student Name</th>
                    <th className="pb-4 text-left">Roll No</th>
                    <th className="pb-4 text-right">Score</th>
                    <th className="pb-4 text-right">Attendance</th>
                    <th className="pb-4 text-center">Achievements</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student) => (
                    <tr key={student.rollNo} className="border-b last:border-0">
                      <td className="py-4">
                        <div className={`w-8 h-8 rounded-full ${getRankColor(student.rank)} flex items-center justify-center font-bold`}>
                          {student.rank}
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="font-medium">{student.name}</p>
                      </td>
                      <td className="py-4 text-gray-600">{student.rollNo}</td>
                      <td className="py-4 text-right font-bold">
                        {getStudentScore(student, selectedSubject, selectedExam)}%
                      </td>
                      <td className="py-4 text-right">{student.attendance}%</td>
                      <td className="py-4">
                        <div className="flex justify-center items-center gap-1">
                          {[...Array(student.achievements)].map((_, i) => (
                            <Medal key={i} className="w-4 h-4 text-yellow-500" />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        // Placeholder when no class is selected
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600">Select a class to view the leaderboard</h2>
          <p className="text-gray-500 mt-2">Choose a class from the dropdown above</p>
        </div>
      )}
    </div>
  );
};

export default ClassroomReport;