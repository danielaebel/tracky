import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import TopBar from '@/components/TopBar';
import ProgressBar from '@/components/ProgressBar';
import BottomNav from '@/components/BottomNav';
import { Minus, Plus } from 'lucide-react';

export default function Workout() {
  const navigate = useNavigate();
  const { settings, currentWorkout, setCurrentWorkout, addWorkoutSession } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState(0);

  const exercises = settings.exercises;
  const currentExercise = exercises[currentIndex];
  const isLastExercise = currentIndex === exercises.length - 1;

  useEffect(() => {
    if (currentWorkout.length === 0) {
      setCurrentWorkout(exercises.map(ex => ({ exerciseId: ex.id, reps: 0 })));
    }
    const existing = currentWorkout.find(e => e.exerciseId === currentExercise?.id);
    setValue(existing?.reps || 0);
  }, [currentIndex, exercises, currentWorkout, currentExercise, setCurrentWorkout]);

  const handleNext = () => {
    const updated = currentWorkout.map(e =>
      e.exerciseId === currentExercise.id ? { ...e, reps: value } : e
    );
    setCurrentWorkout(updated);

    if (isLastExercise) {
      const score = updated.reduce((sum, e) => sum + e.reps, 0);
      addWorkoutSession({ entries: updated, score });
      navigate('/workout-finished');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleEnd = () => {
    const updated = currentWorkout.map(e =>
      e.exerciseId === currentExercise.id ? { ...e, reps: value } : e
    );
    setCurrentWorkout(updated);
    const score = updated.reduce((sum, e) => sum + e.reps, 0);
    addWorkoutSession({ entries: updated, score });
    navigate('/workout-finished');
  };

  const increment = () => setValue(v => v + 1);
  const decrement = () => setValue(v => Math.max(0, v - 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setValue(Math.max(0, val));
  };

  return (
    <div className="flex flex-col items-start h-screen bg-white max-w-[402px] mx-auto">
      <TopBar title="Workout" />
      <ProgressBar total={exercises.length} current={currentIndex + 1} />

      <div className="flex flex-col items-center gap-12 flex-1 w-full px-6 py-12">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="text-black text-center text-[32px] font-bold leading-normal" style={{ fontFamily: 'Lexend Deca' }}>
            {currentExercise?.name}
          </div>
        </div>

        <div className="flex flex-col items-start gap-12 flex-1 w-full">
          <div className="flex justify-center items-center w-full">
            <button onClick={decrement} className="flex items-center justify-center w-20 h-20 p-4.5 rounded-lg">
              <Minus size={44} strokeWidth={2} className="text-black" />
            </button>

            <div className="flex flex-col items-start min-w-[96px]">
              <div className="flex flex-col justify-center items-center gap-2 h-24 min-w-[96px] min-h-[96px] rounded-xl bg-white">
                <input
                  type="number"
                  value={value}
                  onChange={handleInputChange}
                  className="flex flex-col justify-center flex-1 w-full text-black text-center text-[64px] leading-[72px] tracking-[3.2px] bg-transparent border-none outline-none"
                  style={{ fontFamily: 'Lexend' }}
                />
              </div>
            </div>

            <button onClick={increment} className="flex items-center justify-center w-20 h-20 p-4.5 rounded-lg">
              <Plus size={44} strokeWidth={2} className="text-black" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            {!isLastExercise && (
              <button
                onClick={handleNext}
                className="flex justify-center items-center gap-1.5 w-full px-6 py-4.5 rounded-lg"
                style={{ background: '#7F56D9' }}
              >
                <div className="text-white text-lg font-normal leading-6" style={{ fontFamily: 'Lexend' }}>
                  Weiter
                </div>
              </button>
            )}

            <button
              onClick={handleEnd}
              className="flex justify-center items-center gap-1.5 w-full px-6 py-4.5 rounded-lg border border-[#D5D7DA] bg-white"
            >
              <div className="text-[#414651] text-lg font-normal leading-6" style={{ fontFamily: 'Lexend' }}>
                Workout beenden
              </div>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
