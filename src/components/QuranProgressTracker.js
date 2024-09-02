'use client';

import React, { useState, useEffect } from 'react';

const ClassRecordForm = ({ studentId, onAddRecord }) => {
  const [date, setDate] = useState('');
  const [reviewMistakes, setReviewMistakes] = useState(0);
  const [memorizeMistakes, setMemorizeMistakes] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecord(studentId, { date, reviewMistakes: parseInt(reviewMistakes), memorizeMistakes: parseInt(memorizeMistakes) });
    setDate('');
    setReviewMistakes(0);
    setMemorizeMistakes(0);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        value={reviewMistakes}
        onChange={(e) => setReviewMistakes(e.target.value)}
        placeholder="Review Mistakes"
        required
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        value={memorizeMistakes}
        onChange={(e) => setMemorizeMistakes(e.target.value)}
        placeholder="Memorize Mistakes"
        required
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Add Class Record
      </button>
    </form>
  );
};

const QuranProgressTracker = ({ students, setStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [reviewSurah, setReviewSurah] = useState('');
  const [reviewVerseStart, setReviewVerseStart] = useState('');
  const [reviewVerseEnd, setReviewVerseEnd] = useState('');
  const [memorizeSurah, setMemorizeSurah] = useState('');
  const [memorizeVerseStart, setMemorizeVerseStart] = useState('');
  const [memorizeVerseEnd, setMemorizeVerseEnd] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    console.log("Students state updated:", students);
  }, [students]);

  const handleUpdateProgress = () => {
    console.log("Update Progress clicked");
    console.log("Selected student:", selectedStudent);
    console.log("Review Surah:", reviewSurah);
    console.log("Review Verse Start:", reviewVerseStart);
    console.log("Review Verse End:", reviewVerseEnd);
    console.log("Memorize Surah:", memorizeSurah);
    console.log("Memorize Verse Start:", memorizeVerseStart);
    console.log("Memorize Verse End:", memorizeVerseEnd);
    console.log("Notes:", notes);

    if (selectedStudent) {
      setStudents(prevStudents => {
        console.log("Updating students...");
        return prevStudents.map(student => 
          student.name === selectedStudent 
            ? { 
                ...student, 
                reviewSurah: reviewSurah || student.reviewSurah,
                reviewVerseStart: reviewVerseStart ? parseInt(reviewVerseStart) : student.reviewVerseStart,
                reviewVerseEnd: reviewVerseEnd ? parseInt(reviewVerseEnd) : student.reviewVerseEnd,
                memorizeSurah: memorizeSurah || student.memorizeSurah,
                memorizeVerseStart: memorizeVerseStart ? parseInt(memorizeVerseStart) : student.memorizeVerseStart,
                memorizeVerseEnd: memorizeVerseEnd ? parseInt(memorizeVerseEnd) : student.memorizeVerseEnd,
                lastUpdated: new Date().toISOString().split('T')[0],
                notes: notes || student.notes
              }
            : student
        );
      });

      // Reset form fields
      setSelectedStudent('');
      setReviewSurah('');
      setReviewVerseStart('');
      setReviewVerseEnd('');
      setMemorizeSurah('');
      setMemorizeVerseStart('');
      setMemorizeVerseEnd('');
      setNotes('');

      console.log("Update complete");
    } else {
      console.log("No student selected");
    }
  };

  const handleToggle = (id, field) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id
          ? { ...student, [field]: !student[field], lastUpdated: new Date().toISOString().split('T')[0] }
          : student
      )
    );
  };

  const handleNotesChange = (id, newNotes) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id
          ? { ...student, notes: newNotes, lastUpdated: new Date().toISOString().split('T')[0] }
          : student
      )
    );
  };

  const handleAddClassRecord = (studentId, record) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, classRecords: [...student.classRecords, record].slice(-40) }
          : student
      )
    );
  };

  return (
    <div className="p-4 bg-white min-h-screen max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quran Progress Tracker</h1>
      
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <select 
          value={selectedStudent} 
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select student</option>
          {students.map(student => (
            <option key={student.id} value={student.name}>{student.name}</option>
          ))}
        </select>
        <input
          value={reviewSurah}
          onChange={(e) => setReviewSurah(e.target.value)}
          placeholder="Review Surah"
          className="w-full p-2 border rounded"
        />
        <input
          value={reviewVerseStart}
          onChange={(e) => setReviewVerseStart(e.target.value)}
          placeholder="Review Start Verse"
          type="number"
          className="w-full p-2 border rounded"
        />
        <input
          value={reviewVerseEnd}
          onChange={(e) => setReviewVerseEnd(e.target.value)}
          placeholder="Review End Verse"
          type="number"
          className="w-full p-2 border rounded"
        />
        <input
          value={memorizeSurah}
          onChange={(e) => setMemorizeSurah(e.target.value)}
          placeholder="Memorize Surah"
          className="w-full p-2 border rounded"
        />
        <input
          value={memorizeVerseStart}
          onChange={(e) => setMemorizeVerseStart(e.target.value)}
          placeholder="Memorize Start Verse"
          type="number"
          className="w-full p-2 border rounded"
        />
        <input
          value={memorizeVerseEnd}
          onChange={(e) => setMemorizeVerseEnd(e.target.value)}
          placeholder="Memorize End Verse"
          type="number"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          className="w-full p-2 border rounded col-span-full"
        />
        <button onClick={handleUpdateProgress} className="col-span-full bg-blue-500 text-white p-2 rounded">
          Update Progress
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student.id} className="border p-4 rounded">
            <h3 className="font-bold">{student.name}</h3>
            <p>Review: {student.reviewSurah} ({student.reviewVerseStart}-{student.reviewVerseEnd})</p>
            <p>Memorize: {student.memorizeSurah} ({student.memorizeVerseStart}-{student.memorizeVerseEnd})</p>
            <p>Last Updated: {student.lastUpdated}</p>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  checked={student.reviewed} 
                  onChange={() => handleToggle(student.id, 'reviewed')}
                /> Reviewed
              </label>
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  checked={student.memorized} 
                  onChange={() => handleToggle(student.id, 'memorized')}
                /> Memorized
              </label>
            </div>
            <textarea
              value={student.notes}
              onChange={(e) => handleNotesChange(student.id, e.target.value)}
              placeholder="Notes"
              className="w-full p-2 border rounded mt-2"
            />
            <h4 className="font-bold mt-4">Class Records</h4>
            <div className="max-h-40 overflow-y-auto">
              {student.classRecords.map((record, index) => (
                <div key={index} className="text-sm">
                  {record.date}: Review Mistakes: {record.reviewMistakes}, Memorize Mistakes: {record.memorizeMistakes}
                </div>
              ))}
            </div>
            <ClassRecordForm studentId={student.id} onAddRecord={handleAddClassRecord} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranProgressTracker;