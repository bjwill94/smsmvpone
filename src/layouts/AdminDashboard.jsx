import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  School,
  Bell,
  Calendar,
  BookOpen,
  Menu,
  Search,
  ChevronDown,
  UserCircle,
  BarChart3,
  Settings,
  MessageSquare,
  ClipboardList,
  ChevronRight,
  Award,
  Activity,
  UserPlus,
  HomeIcon,
  UserCog
} from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const menuItems = [
    {
      title: 'Overview',
      icon: <BarChart3 className="w-5 h-5" />,
      active: true
    },
    {
      title: 'Academic',
      icon: <School className="w-5 h-5" />,
      submenu: ['Classroom Report', 'Student Report', 'Timetable','Attendance', ' Marks Updates ']
    },
    {
      title: 'Registration',
      icon: <Users className="w-5 h-5" />,
      submenu: ['Add Students', 'Add Teachers', 'Add Admins','Add Classroom','Add Subjects']
    },
    {
      title: 'User Management',
      icon: <Calendar className="w-5 h-5" />,
      submenu: ['Students Gallery', 'Teachers Gallery', 'Admins Gallery']
    },
    {
      title: 'Communication',
      icon: <MessageSquare className="w-5 h-5" />,
      submenu: ['Announcements']
    },
    {
      title: 'Administration',
      icon: <Settings className="w-5 h-5" />,
      submenu: ['School Profile', 'User Management', 'Settings']
    }
  ];

  const quickActions = [
    { icon: <Users className="w-5 h-5" />, title: 'Add New Student' },
    { icon: <UserPlus className="w-5 h-5" />, title: 'Add New Teacher' },
    { icon: <HomeIcon className="w-5 h-5" />, title: 'Add Classroom' },
    { icon: <Bell className="w-5 h-5" />, title: 'Create Announcement' },
    { icon: <ClipboardList className="w-5 h-5" />, title: 'Take Attendance' },
    { icon: <UserCog className="w-5 h-5" />, title: 'Manage User Profile' }
  ];

  const stats = [
    { label: 'Total Students', value: '2,845', change: '+12%', trend: 'up' },
    { label: 'Average Attendance', value: '94%', change: '+3%', trend: 'up' },
    { label: 'Total Teachers', value: '142', change: '+5%', trend: 'up' },
    { label: 'Performance Rate', value: '88%', change: '+7%', trend: 'up' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-xl transition-all duration-300 overflow-hidden fixed h-full z-10`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl text-blue-600 ${!isSidebarOpen && 'hidden'}`}>
            EduAdmin
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <button
                onClick={() => item.submenu && toggleSubmenu(item.title)}
                className={`w-full flex items-center justify-between p-3 rounded-lg ${
                  item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {isSidebarOpen && <span>{item.title}</span>}
                </div>
                {isSidebarOpen && item.submenu && (
                  <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedMenus[item.title] ? 'rotate-90' : ''}`} />
                )}
              </button>
              {isSidebarOpen && item.submenu && expandedMenus[item.title] && (
                <div className="ml-8 space-y-2">
                  {item.submenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-2"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search students, teachers, classes..."
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <h3 className="text-sm font-medium">Sarah Wilson</h3>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, Sarah! 👋</h1>
                <p className="text-gray-500 mt-1">Here's what's happening in your school today.</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Reports
              </button>
            </div>
          </div>

          {/* Stats Grid - Now in a single row */}
          <div className="flex flex-nowrap gap-4 overflow-x-auto mb-6 pb-2">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 min-w-[250px] flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions and Recent Activities in a side-by-side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-blue-600 rounded-xl shadow-sm p-6 text-white h-full">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="w-full bg-blue-500 hover:bg-blue-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    {action.icon}
                    <span className="text-sm">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Activities</h2>
                <button className="text-blue-600 text-sm hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: <Users className="w-5 h-5" />,
                    title: 'New Student Registration',
                    desc: 'Emily Parker was added to Class 10-A',
                    time: '2 hours ago'
                  },
                  {
                    icon: <Award className="w-5 h-5" />,
                    title: 'Exam Results Published',
                    desc: 'Class 9 Mathematics Mid-term results are out',
                    time: '3 hours ago'
                  },
                  {
                    icon: <Bell className="w-5 h-5" />,
                    title: 'New Announcement',
                    desc: 'Parent-Teacher Meeting scheduled for next week',
                    time: '5 hours ago'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <p className="text-sm text-gray-500">{activity.desc}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;