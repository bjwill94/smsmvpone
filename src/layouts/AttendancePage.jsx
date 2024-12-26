import { useState } from 'react';
import { Calendar, Check, X, ChevronDown, Clock, CheckSquare } from 'lucide-react';

const AttendancePage = () => {
  const classes = [
    { id: 1, name: 'Class 10A', subject: 'Mathematics' },
    { id: 2, name: 'Class 9B', subject: 'Science' },
    { id: 3, name: 'Class 11C', subject: 'Physics' }
  ];

  const students = [
    { id: 1, name: 'John Doe', rollNo: '101' },
    { id: 2, name: 'Jane Smith', rollNo: '102' },
    { id: 3, name: 'Mike Johnson', rollNo: '103' },
    { id: 4, name: 'Sarah Williams', rollNo: '104' },
    { id: 5, name: 'Alex Brown', rollNo: '105' }
  ];

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [session, setSession] = useState('morning');
  const [selectedStudents, setSelectedStudents] = useState({});
  const [attendance, setAttendance] = useState({});

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSelectAll = () => {
    const allSelected = students.every(student => selectedStudents[student.id]);
    const newSelected = {};
    students.forEach(student => {
      newSelected[student.id] = !allSelected;
    });
    setSelectedStudents(newSelected);
  };

  const handleBulkAttendance = (status) => {
    const newAttendance = { ...attendance };
    Object.keys(selectedStudents).forEach(studentId => {
      if (selectedStudents[studentId]) {
        if (!newAttendance[studentId]) {
          newAttendance[studentId] = {};
        }
        newAttendance[studentId][session] = status;
      }
    });
    setAttendance(newAttendance);
    setSelectedStudents({});
  };

  const handleAttendance = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [session]: status
      }
    }));
  };

  const getAttendanceStatus = (studentId, currentSession) => {
    return attendance[studentId]?.[currentSession] || null;
  };

  const getSelectedCount = () => {
    return Object.values(selectedStudents).filter(Boolean).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-100 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Attendance Management
              </h1>
              <p className="text-gray-500 mt-1">Track and manage student attendance</p>
            </div>
            <button
              onClick={() => console.log('Saving attendance:', attendance)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Save Attendance
            </button>
          </div>
        </div>

        <div className="space-y-8 p-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Class Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Class
              </label>
              <div className="relative">
                <select
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 text-base transition-colors duration-200"
                >
                  <option value="">Select a class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} - {cls.subject}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 text-base transition-colors duration-200"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Session Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Session
              </label>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <button
                  onClick={() => setSession('morning')}
                  className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${
                    session === 'morning'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  Morning
                </button>
                <button
                  onClick={() => setSession('afternoon')}
                  className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${
                    session === 'afternoon'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  Afternoon
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Grid */}
          {selectedClass && (
            <div className="space-y-4">
              {/* Bulk Actions */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {getSelectedCount()} students selected
                  </span>
                  <button
                    onClick={() => handleBulkAttendance('present')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    disabled={getSelectedCount() === 0}
                  >
                    Mark Selected Present
                  </button>
                  <button
                    onClick={() => handleBulkAttendance('absent')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    disabled={getSelectedCount() === 0}
                  >
                    Mark Selected Absent
                  </button>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={students.every(student => selectedStudents[student.id])}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Morning
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Afternoon
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedStudents[student.id] || false}
                            onChange={() => handleSelectStudent(student.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleAttendance(student.id, 'present')}
                              className={`p-2.5 rounded-lg transition-all duration-200 ${
                                getAttendanceStatus(student.id, 'morning') === 'present'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleAttendance(student.id, 'absent')}
                              className={`p-2.5 rounded-lg transition-all duration-200 ${
                                getAttendanceStatus(student.id, 'morning') === 'absent'
                                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleAttendance(student.id, 'present')}
                              className={`p-2.5 rounded-lg transition-all duration-200 ${
                                getAttendanceStatus(student.id, 'afternoon') === 'present'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleAttendance(student.id, 'absent')}
                              className={`p-2.5 rounded-lg transition-all duration-200 ${
                                getAttendanceStatus(student.id, 'afternoon') === 'absent'
                                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;