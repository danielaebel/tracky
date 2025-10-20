import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';

export default function History() {
  const { settings, workoutHistory, measurementHistory } = useApp();
  const [activeTab, setActiveTab] = useState<'workout' | 'measurements'>('workout');

  return (
    <div className="flex flex-col items-start h-screen bg-white max-w-[402px] mx-auto w-full">
      <TopBar title="History" />

      <div className="flex flex-col items-center gap-12 flex-1 w-full px-6 py-12 overflow-y-auto">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="text-black text-center text-[32px] font-bold leading-normal" style={{ fontFamily: 'Lexend Deca' }}>
            Fortschritte
          </div>
        </div>

        <div className="flex flex-col items-start gap-12 flex-1 w-full">
          <div className="flex p-1.5 justify-center items-center gap-1 w-full rounded-xl border border-[#E9EAEB] bg-[#FAFAFA]">
            <button
              onClick={() => setActiveTab('workout')}
              className={`flex h-11 px-3 py-2 justify-center items-center gap-2 flex-1 rounded-md ${
                activeTab === 'workout' ? 'bg-white shadow' : ''
              }`}
            >
              <div className={`text-base font-medium leading-6 ${activeTab === 'workout' ? 'text-[#414651]' : 'text-[#717680]'}`} style={{ fontFamily: 'Lexend' }}>
                Workout
              </div>
            </button>
            <button
              onClick={() => setActiveTab('measurements')}
              className={`flex h-11 px-3 py-2 justify-center items-center gap-2 flex-1 rounded-md ${
                activeTab === 'measurements' ? 'bg-white shadow' : ''
              }`}
            >
              <div className={`text-base font-medium leading-6 ${activeTab === 'measurements' ? 'text-[#414651]' : 'text-[#717680]'}`} style={{ fontFamily: 'Lexend' }}>
                Maße
              </div>
            </button>
          </div>

          {activeTab === 'workout' ? (
            <div className="flex items-start w-full gap-0">
              <div className="flex flex-col items-start flex-1">
                <div className="flex items-center px-6 py-3 w-full border-b border-[#E9EAEB] bg-white">
                  <div className="text-black text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                    Datum
                  </div>
                </div>
                {workoutHistory.map((session, index) => (
                  <div key={session.id} className={`flex px-6 py-4 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                    <div className="text-black text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                      {session.date}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center min-w-[90px]">
                <div className="flex justify-center items-center px-6 py-3 w-full border-b border-[#E9EAEB] bg-white">
                  <div className="text-black text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                    Score
                  </div>
                </div>
                {workoutHistory.map((session, index) => (
                  <div key={session.id} className={`flex justify-center px-6 py-4 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                    <div className="text-black text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                      {session.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-start w-full gap-0 overflow-x-auto">
              <div className="flex flex-col items-start min-w-[140px] flex-shrink-0">
                <div className="flex items-center px-6 py-3 w-full border-b border-[#E9EAEB] bg-white">
                  <div className="text-black text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                    Datum
                  </div>
                </div>
                {measurementHistory.map((session, index) => (
                  <div key={session.id} className={`flex px-6 py-4 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                    <div className="text-black text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                      {session.date}
                    </div>
                  </div>
                ))}
              </div>

              {settings.bodyParts.map((bodyPart) => (
                <div key={bodyPart.id} className="flex flex-col items-center min-w-[100px] flex-shrink-0">
                  <div className="flex justify-center items-center px-4 py-3 w-full border-b border-[#E9EAEB] bg-white">
                    <div className="text-black text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                      {bodyPart.name}
                    </div>
                  </div>
                  {measurementHistory.map((session, index) => {
                    const entry = session.entries.find(e => e.bodyPartId === bodyPart.id);
                    return (
                      <div key={session.id} className={`flex justify-center px-4 py-4 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                        <div className="text-black text-center text-base leading-[25.2px]" style={{ fontFamily: 'Lexend' }}>
                          {entry?.value || 0}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
