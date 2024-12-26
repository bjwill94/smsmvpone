import React, { useState } from 'react';
import { Calendar, ChevronDown, Award, TrendingUp, User, BookOpen, Search } from 'lucide-react';

const StudentReport = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [searchQuery, setSearchQuery] = useState('');

  // Data definitions remain the same
  const studentInfo = {
    name: "Alex Johnson",
    class: "10A",
    rollNo: "1234",
    academicYear: "2023-24"
  };

  const performanceData = [
    { subject: 'Mathematics', marks: 92, grade: 'A+', classAvg: 78 },
    { subject: 'Physics', marks: 88, grade: 'A', classAvg: 75 },
    { subject: 'Chemistry', marks: 85, grade: 'A', classAvg: 72 },
    { subject: 'English', marks: 90, grade: 'A+', classAvg: 76 },
    { subject: 'History', marks: 82, grade: 'B+', classAvg: 70 }
  ];

  const monthlyProgress = [
    { month: 'Jul', marks: 82, attendance: 95 },
    { month: 'Aug', marks: 85, attendance: 92 },
    { month: 'Sep', marks: 88, attendance: 96 },
    { month: 'Oct', marks: 86, attendance: 94 },
    { month: 'Nov', marks: 90, attendance: 98 }
  ];

  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'text-green-600',
      'A': 'text-green-500',
      'B+': 'text-blue-500',
      'B': 'text-blue-400',
      'C': 'text-yellow-500'
    };
    return colors[grade] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with Search */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Academic Report</h1>
            <p className="text-gray-600">Academic Year {studentInfo.academicYear}</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search student..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              Download Report
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{studentInfo.name}</h2>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium">{studentInfo.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Roll Number</p>
                  <p className="font-medium">{studentInfo.rollNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Term</p>
                  <select 
                    className="font-medium bg-transparent"
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                  >
                    <option>Term 1</option>
                    <option>Term 2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side - Subject Performance */}
        <div className="bg-white rounded-lg shadow-sm h-full">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Subject Performance</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {performanceData.map((subject, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{subject.subject}</p>
                      <p className={`text-sm ${getGradeColor(subject.grade)}`}>Grade {subject.grade}</p>
                    </div>
                    <p className="text-2xl font-bold">{subject.marks}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${subject.marks}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Class Average: {subject.classAvg}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Stats Container */}
        <div className="bg-white rounded-lg shadow-sm h-full">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Performance Overview</h2>
          </div>
          <div className="p-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Grade</p>
                    <p className="text-xl font-bold">A</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-xl font-bold">87.4%</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Attendance</p>
                    <p className="text-xl font-bold">95%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Progress Table */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Progress Over Time</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm text-gray-600">Month</th>
                      <th className="text-right text-sm text-gray-600">Marks</th>
                      <th className="text-right text-sm text-gray-600">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyProgress.map((progress, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 text-sm">{progress.month}</td>
                        <td className="py-2 text-sm text-right">{progress.marks}%</td>
                        <td className="py-2 text-sm text-right">{progress.attendance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Areas for Improvement */}
            <div>
              <h3 className="text-sm font-medium mb-2">Areas for Improvement</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    <p className="font-medium text-sm">Chemistry Lab Work</p>
                  </div>
                  <p className="text-xs text-gray-600">Focus on improving practical skills and documentation.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    <p className="font-medium text-sm">History Essays</p>
                  </div>
                  <p className="text-xs text-gray-600">Work on including more detailed analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;