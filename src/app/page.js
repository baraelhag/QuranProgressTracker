'use client';

import React, { useState } from 'react';
import QuranProgressTracker from '../components/QuranProgressTracker';
import ParentPortal from '../components/parentportal';

export default function Home() {
  const [view, setView] = useState('teacher'); // 'teacher' or 'parent'
  const [students, setStudents] = useState([
    { id: 1, name: 'Iman Fazal', reviewSurah: 'Al-Baqarah', reviewVerseStart: 1, reviewVerseEnd: 5, memorizeSurah: 'Al-Baqarah', memorizeVerseStart: 1, memorizeVerseEnd: 3, reviewed: false, memorized: false, lastUpdated: new Date().toISOString().split('T')[0], notes: '', classRecords: [],  weeklyCheckIns: [] },
    { id: 2, name: 'Arham Aldorisio', reviewSurah: 'Al-Baqarah', reviewVerseStart: 1, reviewVerseEnd: 5, memorizeSurah: 'Al-Baqarah', memorizeVerseStart: 1, memorizeVerseEnd: 3, reviewed: false, memorized: false, lastUpdated: new Date().toISOString().split('T')[0], notes: '', classRecords: [], weeklyCheckIns: [] },
    { id: 3, name: 'Ilyas Bandukda', reviewSurah: 'Al-Baqarah', reviewVerseStart: 1, reviewVerseEnd: 5, memorizeSurah: 'Al-Baqarah', memorizeVerseStart: 1, memorizeVerseEnd: 3, reviewed: false, memorized: false, lastUpdated: new Date().toISOString().split('T')[0], notes: '', classRecords: [], weeklyCheckIns: [] },
    { id: 4, name: 'Anaya Aldorisio', reviewSurah: 'Al-Baqarah', reviewVerseStart: 1, reviewVerseEnd: 5, memorizeSurah: 'Al-Baqarah', memorizeVerseStart: 1, memorizeVerseEnd: 3, reviewed: false, memorized: false, lastUpdated: new Date().toISOString().split('T')[0], notes: '', classRecords: [], weeklyCheckIns: [] },
    { id: 5, name: 'Zayan Muhammad', reviewSurah: 'Al-Baqarah', reviewVerseStart: 1, reviewVerseEnd: 5, memorizeSurah: 'Al-Baqarah', memorizeVerseStart: 1, memorizeVerseEnd: 3, reviewed: false, memorized: false, lastUpdated: new Date().toISOString().split('T')[0], notes: '', classRecords: [], weeklyCheckIns: [] },
    { id: 6, name: 'Jibran Muhammad', reviewSurah: 'Al-Baqarah', reviewVerseStart: 1, reviewVerseEnd: 5, memorizeSurah: 'Al-Baqarah', memorizeVerseStart: 1, memorizeVerseEnd: 3, reviewed: false, memorized: false, lastUpdated: new Date().toISOString().split('T')[0], notes: '', classRecords: [], weeklyCheckIns: [] },
    { id: 7, name: 'Inaya Mohiuddin', reviewSurah: 'Al-Baqarah', reviewVerseStart: 1, reviewVerseEnd: 5, memorizeSurah: 'Al-Baqarah', memorizeVerseStart: 1, memorizeVerseEnd: 3, reviewed: false, memorized: false, lastUpdated: new Date().toISOString().split('T')[0], notes: '', classRecords: [], weeklyCheckIns: [] },
  ]);

  return (
    <main>
      <div className="p-4">
        <button 
          onClick={() => setView('teacher')} 
          className={`mr-2 p-2 ${view === 'teacher' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Teacher View
        </button>
        <button 
          onClick={() => setView('parent')} 
          className={`p-2 ${view === 'parent' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Parent View
        </button>
      </div>
      {view === 'teacher' ? (
  <QuranProgressTracker students={students} setStudents={setStudents} />
) : (
  <ParentPortal students={students} setStudents={setStudents} />
)}
    </main>
  );
}