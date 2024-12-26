import React, { useState } from 'react';
import { Search, Plus, Calendar, Clock, Users, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssignmentsPage = () => {

  const navigate = useNavigate(); // Move this to the main component
  
  const handleCreateClick = () => {
    navigate('/teacher/addassignments');
  };

  // Sample data with more fields
  const initialAssignments = [
    {
      id: 1,
      title: "Mathematics Quiz - Algebra Basics",
      class: "Grade 10-A",
      subject: "Mathematics",
      dueDate: "2024-12-20",
      status: "Active",
      submissions: 18,
      totalStudents: 25,
      createdAt: "2024-12-10",
      completionRate: 72
    },
    {
      id: 2,
      title: "English Essay - Shakespeare Analysis",
      class: "Grade 11-B",
      subject: "English",
      dueDate: "2024-12-22",
      status: "Draft",
      submissions: 0,
      totalStudents: 28,
      createdAt: "2024-12-12",
      completionRate: 0
    },
    {
      id: 3,
      title: "Science Project - Ecosystem Study",
      class: "Grade 10-C",
      subject: "Science",
      dueDate: "2024-12-25",
      status: "Active",
      submissions: 15,
      totalStudents: 27,
      createdAt: "2024-12-08",
      completionRate: 55
    }
  ];
  

  // State for filtering and sorting
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortConfig, setSortConfig] = useState({
    key: 'dueDate',
    direction: 'asc'
  });
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  // Get unique classes and subjects
  const classes = [...new Set(initialAssignments.map(a => a.class))];
  const subjects = [...new Set(initialAssignments.map(a => a.subject))];

  // Sorting function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (key === 'completionRate') {
        return direction === 'asc' 
          ? a.submissions/a.totalStudents - b.submissions/b.totalStudents
          : b.submissions/b.totalStudents - a.submissions/b.totalStudents;
      }
      return direction === 'asc' 
        ? a[key] > b[key] ? 1 : -1
        : a[key] < b[key] ? 1 : -1;
    });
  };

  // Handle sort changes
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    
    const sortedData = sortData(assignments, key, direction);
    setAssignments(sortedData);
  };

  // Filter assignments
  const filterAssignments = () => {
    let filtered = [...initialAssignments];
    
    if (selectedClass !== 'all') {
      filtered = filtered.filter(a => a.class === selectedClass);
    }
    
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(a => a.subject === selectedSubject);
    }
    
    return sortData(filtered, sortConfig.key, sortConfig.direction);
  };

  // Update assignments when filters change
  React.useEffect(() => {
    setAssignments(filterAssignments());
  }, [selectedClass, selectedSubject]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

 
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <button onClick={handleCreateClick} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Class Filter */}
        <div className="relative">
          <button
            onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
            className="w-[180px] px-4 py-2 bg-white border rounded-lg flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">{selectedClass === 'all' ? 'Filter by Class' : selectedClass}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          
          {isClassDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              <div className="py-1">
                <button
                  onClick={() => {
                    setSelectedClass('all');
                    setIsClassDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  All Classes
                </button>
                {classes.map(cls => (
                  <button
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls);
                      setIsClassDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Subject Filter */}
        <div className="relative">
          <button
            onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
            className="w-[180px] px-4 py-2 bg-white border rounded-lg flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">{selectedSubject === 'all' ? 'Filter by Subject' : selectedSubject}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          
          {isSubjectDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              <div className="py-1">
                <button
                  onClick={() => {
                    setSelectedSubject('all');
                    setIsSubjectDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  All Subjects
                </button>
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => {
                      setSelectedSubject(subject);
                      setIsSubjectDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex gap-4 mb-4 text-sm">
        <span className="text-gray-600">Sort by:</span>
        <button
          onClick={() => handleSort('dueDate')}
          className="flex items-center gap-1 hover:text-blue-600"
        >
          Due Date
          <SortIcon columnKey="dueDate" />
        </button>
        <button
          onClick={() => handleSort('completionRate')}
          className="flex items-center gap-1 hover:text-blue-600"
        >
          Completion Rate
          <SortIcon columnKey="completionRate" />
        </button>
        <button
          onClick={() => handleSort('createdAt')}
          className="flex items-center gap-1 hover:text-blue-600"
        >
          Creation Date
          <SortIcon columnKey="createdAt" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Stats cards */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Pending</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold">33</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600">Due This Week</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{assignment.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {assignment.class} - {assignment.subject}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      Due: {assignment.dueDate}
                    </span>
                    <span>
                      Submissions: {assignment.submissions}/{assignment.totalStudents}
                      {' '}({Math.round(assignment.completionRate)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    assignment.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {assignment.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;