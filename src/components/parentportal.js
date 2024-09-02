'use client';

import React, { useState, useEffect } from 'react';

const WeeklyCheckInForm = ({ studentId, onAddCheckIn }) => {
  const [date, setDate] = useState('');
  const [reviewProgress, setReviewProgress] = useState('');
  const [memorizeProgress, setMemorizeProgress] = useState('');
  const [parentFeedback, setParentFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCheckIn(studentId, { date, reviewProgress, memorizeProgress, parentFeedback });
    setDate('');
    setReviewProgress('');
    setMemorizeProgress('');
    setParentFeedback('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={reviewProgress}
        onChange={(e) => setReviewProgress(e.target.value)}
        placeholder="Review Progress"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={memorizeProgress}
        onChange={(e) => setMemorizeProgress(e.target.value)}
        placeholder="Memorization Progress"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={parentFeedback}
        onChange={(e) => setParentFeedback(e.target.value)}
        placeholder="Parent Feedback"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Submit Weekly Check-In
      </button>
    </form>
  );
};

const ParentPortal = ({ students, setStudents }) => {
  const [selectedParent, setSelectedParent] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const parentLastNames = [...new Set(students.map(student => student.name.split(' ').slice(1).join(' ')))];

  useEffect(() => {
    if (selectedParent) {
      const filtered = students.filter(student => student.name.includes(selectedParent));
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [selectedParent, students]);

  const handleAddWeeklyCheckIn = (studentId, checkIn) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, weeklyCheckIns: [...(student.weeklyCheckIns || []), checkIn] }
          : student
      )
    );
  };

  return (
    <div className="p-4 bg-white min-h-screen max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Parent Portal</h1>
      
      <select 
        value={selectedParent} 
        onChange={(e) => setSelectedParent(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select Family</option>
        {parentLastNames.map((lastName, index) => (
          <option key={index} value={lastName}>{lastName}</option>
        ))}
      </select>

      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map(student => (
            <div key={student.id} className="border p-4 rounded">
              <h3 className="font-bold">{student.name}</h3>
              <p>Review: {student.reviewSurah} ({student.reviewVerseStart}-{student.reviewVerseEnd})</p>
              <p>Memorize: {student.memorizeSurah} ({student.memorizeVerseStart}-{student.memorizeVerseEnd})</p>
              <p>Last Updated: {student.lastUpdated}</p>
              <p>Reviewed: {student.reviewed ? 'Yes' : 'No'}</p>
              <p>Memorized: {student.memorized ? 'Yes' : 'No'}</p>
              
              <h4 className="font-bold mt-4">Class Records</h4>
              <div className="max-h-40 overflow-y-auto">
                {student.classRecords.map((record, index) => (
                  <div key={index} className="text-sm">
                    {record.date}: Review Mistakes: {record.reviewMistakes}, Memorize Mistakes: {record.memorizeMistakes}
                  </div>
                ))}
              </div>
              
              <h4 className="font-bold mt-4">Weekly Check-Ins</h4>
              <div className="max-h-40 overflow-y-auto mb-4">
                {student.weeklyCheckIns && student.weeklyCheckIns.map((checkIn, index) => (
                  <div key={index} className="text-sm border-b pb-2 mb-2">
                    <p>Date: {checkIn.date}</p>
                    <p>Review Progress: {checkIn.reviewProgress}</p>
                    <p>Memorization Progress: {checkIn.memorizeProgress}</p>
                    <p>Parent Feedback: {checkIn.parentFeedback}</p>
                  </div>
                ))}
              </div>
              
              <h4 className="font-bold">Add Weekly Check-In</h4>
              <WeeklyCheckInForm studentId={student.id} onAddCheckIn={handleAddWeeklyCheckIn} />
              
              <h4 className="font-bold mt-4">Notes</h4>
              <p className="text-sm">{student.notes}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Please select a family to view student progress.</p>
      )}
    </div>
  );
};

export default ParentPortal;