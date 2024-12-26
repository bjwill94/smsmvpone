import React, { useState } from 'react';
import { ChevronLeft, Save, Download, Upload, Search, Plus, X, Edit2, Trash2 } from "lucide-react";

const GradeEntrySystem = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  const [examForm, setExamForm] = useState({
    name: '',
    date: '',
    maxMarks: 100,
    duration: 180,
    type: 'Unit Test'
  });
  
  const [editingExam, setEditingExam] = useState(null);
  const [marks, setMarks] = useState({});

  const classes = ['10A', '10B', '11A', '11B'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English'];
  const examTypes = ['Unit Test', 'Mid Term', 'Final Term'];

  const [exams, setExams] = useState([
    { id: 1, name: 'Unit Test 1', date: '2024-04-15', maxMarks: 100, duration: 180, type: 'Unit Test' },
    { id: 2, name: 'Mid Term', date: '2024-05-20', maxMarks: 100, duration: 180, type: 'Mid Term' }
  ]);

  const students = [
    { id: 1, name: 'Alice Johnson', rollNo: '101', attendance: 95 },
    { id: 2, name: 'Bob Smith', rollNo: '102', attendance: 88 },
    { id: 3, name: 'Charlie Brown', rollNo: '103', attendance: 92 },
    { id: 4, name: 'Diana Ross', rollNo: '104', attendance: 96 },
    { id: 5, name: 'Edward Norton', rollNo: '105', attendance: 85 }
  ];

  const handleAddExam = () => {
    if (editingExam) {
      setExams(exams.map(exam => 
        exam.id === editingExam.id 
          ? { ...examForm, id: exam.id }
          : exam
      ));
      setEditingExam(null);
    } else {
      const newExam = {
        ...examForm,
        id: exams.length + 1
      };
      setExams([...exams, newExam]);
    }
    setExamForm({
      name: '',
      date: '',
      maxMarks: 100,
      duration: 180,
      type: 'Unit Test'
    });
    setShowExamModal(false);
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setExamForm(exam);
    setShowExamModal(true);
  };

  const handleDeleteExam = (exam) => {
    setExamToDelete(exam);
    setShowDeleteModal(true);
  };

  const confirmDeleteExam = () => {
    setExams(exams.filter(exam => exam.id !== examToDelete.id));
    setShowDeleteModal(false);
    setExamToDelete(null);
  };

  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    return 'F';
  };

  const handleMarkChange = (studentId, value) => {
    const numValue = Math.min(Math.max(parseInt(value) || 0, 0), 100);
    setMarks({
      ...marks,
      [studentId]: numValue
    });
  };

  const handleSave = () => {
    setShowSavedAlert(true);
    setTimeout(() => setShowSavedAlert(false), 3000);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <button className="flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold mt-4">Grade Entry System</h1>
      </div>

      {/* Success Alert */}
      {showSavedAlert && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2">
          Grades saved successfully
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            className="w-full p-2 border rounded-lg"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>Class {cls}</option>
            ))}
          </select>

          <select 
            className="w-full p-2 border rounded-lg"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <select 
              className="flex-1 p-2 border rounded-lg"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              <option value="">Select Exam</option>
              {exams.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.name}</option>
              ))}
            </select>
            <button
              onClick={() => setShowExamModal(true)}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Exam Modal */}
      {showExamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingExam ? 'Edit Exam' : 'Add New Exam'}</h2>
              <button onClick={() => {
                setShowExamModal(false);
                setEditingExam(null);
                setExamForm({
                  name: '',
                  date: '',
                  maxMarks: 100,
                  duration: 180,
                  type: 'Unit Test'
                });
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={examForm.name}
                  onChange={(e) => setExamForm({...examForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  value={examForm.date}
                  onChange={(e) => setExamForm({...examForm, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Marks</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={examForm.maxMarks}
                  onChange={(e) => setExamForm({...examForm, maxMarks: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={examForm.duration}
                  onChange={(e) => setExamForm({...examForm, duration: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={examForm.type}
                  onChange={(e) => setExamForm({...examForm, type: e.target.value})}
                >
                  {examTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowExamModal(false);
                  setEditingExam(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExam}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {editingExam ? 'Update Exam' : 'Add Exam'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Exam</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {examToDelete?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteExam}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Entry Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Enter Grades</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium">Roll No</th>
                <th className="px-4 py-3 text-left font-medium">Student Name</th>
                <th className="px-4 py-3 text-center font-medium">Attendance</th>
                <th className="px-4 py-3 text-center font-medium">Marks (/100)</th>
                <th className="px-4 py-3 text-center font-medium">Grade</th>
                <th className="px-4 py-3 text-center font-medium">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="border-b">
                  <td className="px-4 py-3">{student.rollNo}</td>
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3 text-center">{student.attendance}%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-20 p-2 border rounded-lg text-center mx-auto block"
                      value={marks[student.id] || ''}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3 text-center font-medium">
                    {marks[student.id] ? calculateGrade(marks[student.id]) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Add remarks"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 flex justify-end gap-4">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Save as Draft
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            onClick={handleSave}
          >
           <Save className="w-4 h-4" />
            Save Grades
          </button>
        </div>
      </div>

      {/* Grade Guidelines */}
      <div className="bg-white rounded-lg shadow mt-6 p-6">
        <h2 className="text-lg font-semibold mb-4">Grading Guidelines</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">90-100</p>
            <p className="font-medium text-green-600">A+</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">80-89</p>
            <p className="font-medium text-green-500">A</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">70-79</p>
            <p className="font-medium text-blue-500">B+</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">60-69</p>
            <p className="font-medium text-blue-400">B</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">50-59</p>
            <p className="font-medium text-yellow-500">C</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Below 50</p>
            <p className="font-medium text-red-500">F</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeEntrySystem;