import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Menu, Plus, X } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [newExercise, setNewExercise] = useState('');
  const [newBodyPart, setNewBodyPart] = useState('');

  const handleAddExercise = () => {
    if (newExercise.trim()) {
      updateSettings({
        exercises: [...settings.exercises, { id: Date.now().toString(), name: newExercise.trim() }]
      });
      setNewExercise('');
    }
  };

  const handleAddBodyPart = () => {
    if (newBodyPart.trim()) {
      updateSettings({
        bodyParts: [...settings.bodyParts, { id: Date.now().toString(), name: newBodyPart.trim() }]
      });
      setNewBodyPart('');
    }
  };

  const handleDeleteExercise = (id: string) => {
    updateSettings({
      exercises: settings.exercises.filter(e => e.id !== id)
    });
  };

  const handleDeleteBodyPart = (id: string) => {
    updateSettings({
      bodyParts: settings.bodyParts.filter(bp => bp.id !== id)
    });
  };

  return (
    <div className="flex flex-col items-start h-screen bg-white max-w-[402px] mx-auto">
      <TopBar title="Settings" showBack={false} />

      <div className="flex flex-col gap-6 flex-1 w-full px-6 py-12 overflow-y-auto">
        <div className="text-black text-xl font-bold" style={{ fontFamily: 'Lexend' }}>
          Settings
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-black text-lg font-semibold" style={{ fontFamily: 'Lexend' }}>
              Über dich
            </div>
            <div className="flex items-center gap-3">
              <div className="text-black" style={{ fontFamily: 'Lexend' }}>Name</div>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => updateSettings({ name: e.target.value })}
                className="flex-1 px-4 py-2 border border-[#D5D7DA] rounded-lg"
                style={{ fontFamily: 'Lexend' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-black text-lg font-semibold" style={{ fontFamily: 'Lexend' }}>
              Bereiche
            </div>
            <div className="flex items-center justify-between">
              <div className="text-black" style={{ fontFamily: 'Lexend' }}>Workout</div>
              <button
                onClick={() => updateSettings({ workoutEnabled: !settings.workoutEnabled })}
                className={`relative w-12 h-6 rounded-full transition-colors ${settings.workoutEnabled ? 'bg-[#7F56D9]' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.workoutEnabled ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-black" style={{ fontFamily: 'Lexend' }}>Maße</div>
              <button
                onClick={() => updateSettings({ measurementEnabled: !settings.measurementEnabled })}
                className={`relative w-12 h-6 rounded-full transition-colors ${settings.measurementEnabled ? 'bg-[#7F56D9]' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.measurementEnabled ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-black text-lg font-semibold" style={{ fontFamily: 'Lexend' }}>
              Workout
            </div>
            {settings.exercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center gap-3 py-3 border-b border-[#DDD]">
                <Menu size={24} className="text-black" />
                <div className="flex-1 text-black" style={{ fontFamily: 'Lexend' }}>{exercise.name}</div>
                <button onClick={() => handleDeleteExercise(exercise.id)}>
                  <X size={24} className="text-black" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3 py-3 border-b border-[#DDD]">
              <input
                type="text"
                value={newExercise}
                onChange={(e) => setNewExercise(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddExercise()}
                placeholder="Neue Übung"
                className="flex-1 text-[#AAA]"
                style={{ fontFamily: 'Lexend', fontSize: '18px' }}
              />
              <button onClick={handleAddExercise}>
                <Plus size={24} className="text-black" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-black text-lg font-semibold" style={{ fontFamily: 'Lexend' }}>
              Maße
            </div>
            {settings.bodyParts.map((bodyPart) => (
              <div key={bodyPart.id} className="flex items-center gap-3 py-3 border-b border-[#DDD]">
                <Menu size={24} className="text-black" />
                <div className="flex-1 text-black" style={{ fontFamily: 'Lexend' }}>{bodyPart.name}</div>
                <button onClick={() => handleDeleteBodyPart(bodyPart.id)}>
                  <X size={24} className="text-black" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3 py-3 border-b border-[#DDD]">
              <input
                type="text"
                value={newBodyPart}
                onChange={(e) => setNewBodyPart(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddBodyPart()}
                placeholder="Neues Körperteil"
                className="flex-1 text-[#AAA]"
                style={{ fontFamily: 'Lexend', fontSize: '18px' }}
              />
              <button onClick={handleAddBodyPart}>
                <Plus size={24} className="text-black" />
              </button>
            </div>
          </div>

          <button
            onClick={() => {}}
            className="flex justify-center items-center gap-1.5 w-full px-6 py-4.5 rounded-lg mt-6"
            style={{ background: '#7F56D9' }}
          >
            <div className="text-white text-lg font-normal leading-6" style={{ fontFamily: 'Lexend' }}>
              Speichern
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
