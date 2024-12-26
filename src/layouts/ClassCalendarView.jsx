import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Table } from 'lucide-react';

const ClassCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState('day');
  
  // Time slots for timetable
  const timeSlots = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
    "2:00 - 3:00",
    "3:00 - 4:00"
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Sample class schedules data
  const classSchedules = [
    {
      id: 1,
      subject: "Mathematics",
      class: "10A",
      room: "301",
      time: "10:00 AM - 11:00 AM",
      type: "class",
      date: "2024-12-16",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      id: 2,
      subject: "Physics Lab",
      class: "11B",
      room: "Lab 2",
      time: "11:30 AM - 1:00 PM",
      type: "class",
      date: "2024-12-17",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600"
    }
  ];

  // Sample regular timetable data
  const regularClasses = [
    {
      id: 1,
      subject: "Mathematics",
      class: "10A",
      room: "301",
      day: "Monday",
      timeSlot: "9:00 - 10:00",
      color: "bg-blue-100 border-blue-300 text-blue-700"
    },
    {
      id: 2,
      subject: "Physics",
      class: "10A",
      room: "Lab 2",
      day: "Monday",
      timeSlot: "11:00 - 12:00",
      color: "bg-indigo-100 border-indigo-300 text-indigo-700"
    },
    {
      id: 3,
      subject: "Chemistry",
      class: "10A",
      room: "Lab 1",
      day: "Wednesday",
      timeSlot: "9:00 - 10:00",
      color: "bg-purple-100 border-purple-300 text-purple-700"
    }
  ];

  const academicEvents = [
    {
      id: 1,
      title: "Mid-Term Exam",
      description: "Mathematics Mid-Term for Class 10",
      date: "2024-12-18",
      type: "exam",
      color: "bg-gradient-to-r from-rose-500 to-rose-600"
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      description: "Term 1 Progress Discussion",
      date: "2024-12-20",
      type: "event",
      color: "bg-gradient-to-r from-violet-500 to-violet-600"
    }
  ];

  // Function to get class for a specific time slot and day
  const getClassForSlot = (timeSlot, day) => {
    return regularClasses.find(cls => cls.timeSlot === timeSlot && cls.day === day);
  };

  // Function to format date for comparison
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const formattedDate = formatDate(date);
    return [...classSchedules, ...academicEvents].filter(
      event => formatDate(event.date) === formattedDate
    );
  };

  // Get dates for the current week
  const getWeekDates = (date) => {
    const week = [];
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 7; i++) {
      week.push(new Date(new Date(start).setDate(start.getDate() + i)));
    }
    return week;
  };

  // Get dates for the current month
  const getMonthDates = (date) => {
    const month = [];
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 42; i++) {
      month.push(new Date(new Date(start).setDate(start.getDate() + i)));
    }
    return month;
  };

  // Timetable View Component
  const TimetableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 border text-left font-medium text-gray-500">Time</th>
            {weekDays.map(day => (
              <th key={day} className="p-3 border text-left font-medium text-gray-700">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(timeSlot => (
            <tr key={timeSlot} className="hover:bg-gray-50">
              <td className="p-3 border text-sm text-gray-500 font-medium">
                {timeSlot}
              </td>
              {weekDays.map(day => {
                const classInfo = getClassForSlot(timeSlot, day);
                return (
                  <td key={`${day}-${timeSlot}`} className="p-3 border">
                    {classInfo ? (
                      <div className={`rounded-lg p-2 ${classInfo.color} border`}>
                        <div className="font-medium text-sm">{classInfo.subject}</div>
                        <div className="text-xs mt-1">Class {classInfo.class}</div>
                        <div className="text-xs mt-1">Room {classInfo.room}</div>
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Day View Component
  const DayView = () => (
    <div className="space-y-2">
      {getEventsForDate(selectedDate).length > 0 ? (
        getEventsForDate(selectedDate).map(event => (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium">{event.type === 'class' ? `${event.subject} - ${event.class}` : event.title}</h3>
            <p className="text-sm text-gray-600">{event.time || event.description}</p>
          </div>
        ))
      ) : (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
          <p className="text-sm">No events scheduled for this date.</p>
        </div>
      )}
    </div>
  );

  // Week View Component
  const WeekView = () => {
    const weekDates = getWeekDates(selectedDate);
    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map(date => (
          <div key={date.toISOString()} 
               className={`min-h-[200px] p-2 rounded-lg ${
                 formatDate(date) === formatDate(selectedDate) ? 'bg-blue-50' : 'bg-white'
               }`}>
            <div className="text-center mb-2">
              <div className="text-sm text-gray-500">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="text-lg font-semibold">{date.getDate()}</div>
            </div>
            {getEventsForDate(date).map(event => (
              <div key={event.id} className="text-sm p-1 mb-1 rounded bg-blue-100">
                {event.type === 'class' ? `${event.subject} - ${event.class}` : event.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Month View Component
  const MonthView = () => {
    const monthDates = getMonthDates(selectedDate);
    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center p-2 font-medium text-gray-600">
            {day}
          </div>
        ))}
        {monthDates.map(date => (
          <div key={date.toISOString()} 
               className={`min-h-[100px] p-2 rounded-lg ${
                 date.getMonth() !== selectedDate.getMonth() ? 'bg-gray-50 text-gray-400' :
                 formatDate(date) === formatDate(selectedDate) ? 'bg-blue-50' : 'bg-white'
               }`}>
            <div className="text-right mb-1">
              <span className="text-sm font-medium">{date.getDate()}</span>
            </div>
            {getEventsForDate(date).map(event => (
              <div key={event.id} className="text-xs p-1 mb-1 rounded bg-blue-100">
                {event.type === 'class' ? `${event.subject}` : event.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Calendar Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm sticky top-6">
            <div className="border-b p-4 bg-gradient-to-br from-gray-50 to-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
            </div>
            <div className="p-4">
              <div className="space-y-6">
                {/* Date Navigation */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h2>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">
                      {selectedDate.getDate()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                  </div>
                </div>

                {/* View Type Selector */}
                <div className="space-y-1">
                  {[
                    { id: 'day', icon: Calendar, label: 'Day View' },
                    { id: 'week', icon: Calendar, label: 'Week View' },
                    { id: 'month', icon: Calendar, label: 'Month View' },
                    { id: 'timetable', icon: Table, label: 'Timetable View' }
                  ].map(({ id, icon: Icon, label }) => (
                    <button 
                      key={id}
                      className={`w-full p-3 text-left rounded-lg transition-colors flex items-center gap-2 ${
                        viewType === id 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                      onClick={() => setViewType(id)}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b p-4 bg-gradient-to-br from-gray-50 to-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {viewType === 'timetable' 
                  ? 'Weekly Class Schedule' 
                  : viewType === 'day'
                  ? `Schedule for ${selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}`
                  : viewType === 'week'
                  ? `Week of ${selectedDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}`
                  : `${selectedDate.toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}`
                }
              </h2>
            </div>
            <div className="p-6">
              {viewType === 'day' && <DayView />}
              {viewType === 'week' && <WeekView />}
              {viewType === 'month' && <MonthView />}
              {viewType === 'timetable' && <TimetableView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCalendarView;