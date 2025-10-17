import { useState } from 'react';
import { useApp, Exercise, BodyPart } from '@/contexts/AppContext';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { GripVertical, Plus, X } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [newExercise, setNewExercise] = useState('');
  const [newBodyPart, setNewBodyPart] = useState('');
  const [draggedExercise, setDraggedExercise] = useState<string | null>(null);
  const [draggedBodyPart, setDraggedBodyPart] = useState<string | null>(null);

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

  const moveExercise = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= settings.exercises.length) return;
    const newExercises = [...settings.exercises];
    [newExercises[fromIndex], newExercises[toIndex]] = [newExercises[toIndex], newExercises[fromIndex]];
    updateSettings({ exercises: newExercises });
  };

  const moveBodyPart = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= settings.bodyParts.length) return;
    const newBodyParts = [...settings.bodyParts];
    [newBodyParts[fromIndex], newBodyParts[toIndex]] = [newBodyParts[toIndex], newBodyParts[fromIndex]];
    updateSettings({ bodyParts: newBodyParts });
  };

  return (
    <div className="flex flex-col items-start h-screen bg-white max-w-[402px] mx-auto w-full">
      <TopBar title="Settings" showBack={false} />

      <div className="flex flex-col gap-6 flex-1 w-full px-6 py-12 overflow-y-auto">
        <div className="text-black text-lg font-bold" style={{ fontFamily: 'Lexend' }}>
          Settings
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="text-black text-lg font-bold" style={{ fontFamily: 'Lexend' }}>
              Über dich
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-black font-normal" style={{ fontFamily: 'Lexend' }}>Name</div>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => updateSettings({ name: e.target.value })}
                className="w-[200px] px-4 py-2 border border-[#D5D7DA] rounded-lg text-right"
                style={{ fontFamily: 'Lexend' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-black text-lg font-bold" style={{ fontFamily: 'Lexend' }}>
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

          {settings.workoutEnabled && (
            <div className="flex flex-col gap-3">
              <div className="text-black text-lg font-bold" style={{ fontFamily: 'Lexend' }}>
                Workout
              </div>
              {settings.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  draggable
                  onDragStart={() => setDraggedExercise(exercise.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    const draggedIndex = settings.exercises.findIndex(e => e.id === draggedExercise);
                    if (draggedIndex !== index && draggedIndex >= 0) {
                      moveExercise(draggedIndex, index);
                    }
                  }}
                  className="flex items-center gap-3 py-3 px-3 border border-[#DDD] rounded-lg cursor-move hover:bg-gray-50"
                >
                  <GripVertical size={20} className="text-gray-400 flex-shrink-0" />
                  <div className="flex-1 text-black" style={{ fontFamily: 'Lexend' }}>{exercise.name}</div>
                  <button
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="flex-shrink-0 hover:text-red-600"
                  >
                    <X size={20} className="text-black" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-3 py-3 px-3 border border-[#DDD] rounded-lg">
                <input
                  type="text"
                  value={newExercise}
                  onChange={(e) => setNewExercise(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddExercise()}
                  placeholder="Neue Übung"
                  className="flex-1 text-[#AAA] bg-transparent border-none outline-none"
                  style={{ fontFamily: 'Lexend', fontSize: '16px' }}
                />
                <button onClick={handleAddExercise} className="flex-shrink-0">
                  <Plus size={20} className="text-black" />
                </button>
              </div>
            </div>
          )}

          {settings.measurementEnabled && (
            <div className="flex flex-col gap-3">
              <div className="text-black text-lg font-bold" style={{ fontFamily: 'Lexend' }}>
                Maße
              </div>
              {settings.bodyParts.map((bodyPart, index) => (
                <div
                  key={bodyPart.id}
                  draggable
                  onDragStart={() => setDraggedBodyPart(bodyPart.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    const draggedIndex = settings.bodyParts.findIndex(bp => bp.id === draggedBodyPart);
                    if (draggedIndex !== index && draggedIndex >= 0) {
                      moveBodyPart(draggedIndex, index);
                    }
                  }}
                  className="flex items-center gap-3 py-3 px-3 border border-[#DDD] rounded-lg cursor-move hover:bg-gray-50"
                >
                  <GripVertical size={20} className="text-gray-400 flex-shrink-0" />
                  <div className="flex-1 text-black" style={{ fontFamily: 'Lexend' }}>{bodyPart.name}</div>
                  <button
                    onClick={() => handleDeleteBodyPart(bodyPart.id)}
                    className="flex-shrink-0 hover:text-red-600"
                  >
                    <X size={20} className="text-black" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-3 py-3 px-3 border border-[#DDD] rounded-lg">
                <input
                  type="text"
                  value={newBodyPart}
                  onChange={(e) => setNewBodyPart(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddBodyPart()}
                  placeholder="Neues Körperteil"
                  className="flex-1 text-[#AAA] bg-transparent border-none outline-none"
                  style={{ fontFamily: 'Lexend', fontSize: '16px' }}
                />
                <button onClick={handleAddBodyPart} className="flex-shrink-0">
                  <Plus size={20} className="text-black" />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => {}}
            className="flex justify-center items-center gap-1.5 w-full px-6 py-[18px] rounded-lg mt-6"
            style={{ background: '#7F56D9' }}
          >
            <div className="text-white text-lg font-medium leading-6" style={{ fontFamily: 'Lexend' }}>
              Speichern
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
