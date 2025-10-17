import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import TopBar from '@/components/TopBar';
import ProgressBar from '@/components/ProgressBar';
import BottomNav from '@/components/BottomNav';

export default function WorkoutFinished() {
  const navigate = useNavigate();
  const { settings, workoutHistory } = useApp();

  const latestSession = workoutHistory[0];
  const previousSession = workoutHistory[1];

  const getDiff = (exerciseId: string) => {
    const current = latestSession?.entries.find(e => e.exerciseId === exerciseId)?.reps || 0;
    const previous = previousSession?.entries.find(e => e.exerciseId === exerciseId)?.reps || 0;
    const diff = current - previous;
    if (diff > 0) return `+${diff}`;
    if (diff < 0) return `${diff}`;
    return '–';
  };

  return (
    <div className="flex flex-col items-start h-screen bg-white max-w-[402px] mx-auto">
      <TopBar title="Workout" />
      <ProgressBar total={settings.exercises.length} current={settings.exercises.length} />

      <div className="flex flex-col items-center gap-12 flex-1 w-full px-6 py-12 overflow-y-auto">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="text-black text-center text-[32px] font-bold leading-normal" style={{ fontFamily: 'Lexend Deca' }}>
            Yay, done!
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-12 w-full">
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="text-black text-center text-[96px] leading-normal" style={{ fontFamily: 'Lexend' }}>
              {latestSession?.score || 0}
            </div>
            <div className="text-black text-center text-lg font-medium leading-normal" style={{ fontFamily: 'Lexend' }}>
              Score
            </div>
          </div>

          <div className="flex items-center w-full">
            <div className="flex flex-col items-start flex-1">
              <div className="flex items-center gap-3 px-4 py-3 w-full border-b border-[#E9EAEB] bg-white">
                <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                  Übung
                </div>
              </div>
              {latestSession?.entries.map((entry, index) => {
                const exercise = settings.exercises.find(e => e.id === entry.exerciseId);
                return (
                  <div key={index} className={`flex px-4 py-3 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                    <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                      {exercise?.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 px-4 py-3 w-full border-b border-[#E9EAEB] bg-white">
                <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                  Score
                </div>
              </div>
              {latestSession?.entries.map((entry, index) => (
                <div key={index} className={`flex px-4 py-3 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                  <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                    {entry.reps}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 px-4 py-3 w-full border-b border-[#E9EAEB] bg-white">
                <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                  +/-
                </div>
              </div>
              {latestSession?.entries.map((entry, index) => (
                <div key={index} className={`flex px-4 py-3 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                  <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                    {getDiff(entry.exerciseId)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <button
            onClick={() => navigate('/history')}
            className="flex justify-center items-center gap-1.5 w-full px-6 py-4.5 rounded-lg border border-[#D5D7DA] bg-white"
          >
            <div className="text-[#414651] text-lg font-normal leading-6" style={{ fontFamily: 'Lexend' }}>
              Fortschritte ansehen
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
