import React, { useState } from 'react';
import { Calendar, Clock, Users, Book, ClipboardList, Bell, ChevronRight, Search, Menu, X, ChevronDown, LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const navigationItems = [
    { icon: Home, label: 'AdminDashboard', path: '/admin' },
    { icon: Home, label: 'Dashboard', path: '/teacher' },
    { icon: Users, label: 'My Classes', path: '/teacher/classes' },
    { icon: Calendar, label: 'Attendance', path: '/teacher/attendance' },
    { icon: ClipboardList, label: 'Grades', path: '/teacher/grades' },
    { icon: Book, label: 'Assignments', path: '/teacher/assignments' },
    { icon: ClipboardList, label: 'Student Reports', path: '/teacher/studentreports' },
    { icon: Users, label: 'Classroom Reports', path: '/teacher/ClassroomReports' }
  ];

  const upcomingClasses = [
    { id: 1, class: "10A", subject: "Mathematics", time: "10:00 AM", room: "301" },
    { id: 2, class: "9B", subject: "Physics", time: "11:30 AM", room: "Lab 2" },
    { id: 3, class: "11C", subject: "Mathematics", time: "2:00 PM", room: "405" },
  ];

  const assignments = [
    { id: 1, class: "10A", subject: "Mathematics", title: "Quadratic Equations", dueDate: "Dec 18" },
    { id: 2, class: "9B", subject: "Physics", title: "Newton's Laws", dueDate: "Dec 20" },
  ];

  const studentRequests = [
    { id: 1, student: "Alex Johnson", type: "Assignment Extension", status: "Pending" },
    { id: 2, student: "Sarah Smith", type: "Grade Review", status: "Pending" },
  ];

  const quickStats = [
    { title: 'Classes Today', count: '5', icon: Clock, color: 'bg-blue-500' },
    { title: 'Total Students', count: '156', icon: Users, color: 'bg-green-500' },
    { title: 'Assignments Due', count: '8', icon: ClipboardList, color: 'bg-purple-500' },
    { title: 'Average Attendance', count: '94%', icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 fixed w-full z-50">
        <div className="px-4">
          <div className="flex justify-between h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-lg"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <span className="text-lg font-bold text-white">EduManager</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="p-2 text-white hover:bg-white/10 rounded-full">
                  <Bell size={20} />
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2 bg-white/10 rounded-full p-1.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                  T
                </div>
                <ChevronDown size={16} className="text-white mr-1" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Layout Container */}
      <div className="relative flex pt-14">
        {/* Sidebar */}
        <aside 
          className={`fixed md:relative top-14 h-[calc(100vh-3.5rem)] 
            ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0'} 
            transition-all duration-300 ease-in-out z-40`}
        >
          <div className="h-full bg-white shadow-lg overflow-hidden">
            <nav className="flex-1 px-3 py-2 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="p-3 border-t">
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}`}>
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-lg font-bold">{stat.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule and Tasks */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Schedule */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-3 border-b">
                <h2 className="text-base font-semibold">Today's Schedule</h2>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  {upcomingClasses.map(cls => (
                    <div key={cls.id} className="flex items-center gap-3 p-2 rounded-lg border hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-sm">{cls.subject}</p>
                          <span className="text-xs text-gray-500">{cls.time}</span>
                        </div>
                        <p className="text-xs text-gray-600">Class {cls.class} • Room {cls.room}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-3 border-b">
                <h2 className="text-base font-semibold">Pending Tasks</h2>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="p-2 rounded-lg border hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{assignment.title}</p>
                        <span className="text-xs text-orange-500">Due {assignment.dueDate}</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        {assignment.class} • {assignment.subject}
                      </p>
                    </div>
                  ))}
                  {studentRequests.map(request => (
                    <div key={request.id} className="p-2 rounded-lg border hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{request.student}</p>
                        <span className="text-xs text-blue-500">{request.status}</span>
                      </div>
                      <p className="text-xs text-gray-600">{request.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 border-b">
              <h2 className="text-base font-semibold">Quick Actions</h2>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-4 gap-3">
                <button className="p-3 rounded-lg border hover:bg-indigo-50 flex flex-col items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs">Take Attendance</span>
                </button>
                <button className="p-3 rounded-lg border hover:bg-indigo-50 flex flex-col items-center gap-2">
                  <Book className="w-5 h-5 text-green-500" />
                  <span className="text-xs">Add Assignment</span>
                </button>
                <button className="p-3 rounded-lg border hover:bg-indigo-50 flex flex-col items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span className="text-xs">Student Reports</span>
                </button>
                <button className="p-3 rounded-lg border hover:bg-indigo-50 flex flex-col items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span className="text-xs">Schedule Test</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;