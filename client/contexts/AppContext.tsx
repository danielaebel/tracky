import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Exercise {
  id: string;
  name: string;
}

export interface BodyPart {
  id: string;
  name: string;
}

export interface WorkoutEntry {
  exerciseId: string;
  reps: number;
}

export interface MeasurementEntry {
  bodyPartId: string;
  value: number;
}

export interface WorkoutSession {
  id: string;
  date: string;
  entries: WorkoutEntry[];
  score: number;
}

export interface MeasurementSession {
  id: string;
  date: string;
  entries: MeasurementEntry[];
}

interface AppSettings {
  name: string;
  workoutEnabled: boolean;
  measurementEnabled: boolean;
  exercises: Exercise[];
  bodyParts: BodyPart[];
}

interface AppContextType {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  workoutHistory: WorkoutSession[];
  measurementHistory: MeasurementSession[];
  addWorkoutSession: (session: Omit<WorkoutSession, 'id' | 'date'>) => void;
  addMeasurementSession: (session: Omit<MeasurementSession, 'id' | 'date'>) => void;
  currentWorkout: WorkoutEntry[];
  setCurrentWorkout: (entries: WorkoutEntry[]) => void;
  currentMeasurement: MeasurementEntry[];
  setCurrentMeasurement: (entries: MeasurementEntry[]) => void;
}

const defaultExercises: Exercise[] = [
  { id: '1', name: 'Crunches' },
  { id: '2', name: 'Push-Ups' },
  { id: '3', name: 'Jumping Jacks' },
  { id: '4', name: 'Plank (Hold)' },
  { id: '5', name: 'Squat Jumps' },
  { id: '6', name: 'Superwoman' },
];

const defaultBodyParts: BodyPart[] = [
  { id: '1', name: 'Brust' },
  { id: '2', name: 'Taille' },
  { id: '3', name: 'Hüfte' },
  { id: '4', name: 'Oberarm' },
  { id: '5', name: 'Bauch' },
  { id: '6', name: 'Oberschenkel' },
  { id: '7', name: 'Wade' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const stored = localStorage.getItem('tracky-settings');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      name: 'Maus',
      workoutEnabled: true,
      measurementEnabled: true,
      exercises: defaultExercises,
      bodyParts: defaultBodyParts,
    };
  });

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() => {
    const stored = localStorage.getItem('tracky-workout-history');
    return stored ? JSON.parse(stored) : [];
  });

  const [measurementHistory, setMeasurementHistory] = useState<MeasurementSession[]>(() => {
    const stored = localStorage.getItem('tracky-measurement-history');
    return stored ? JSON.parse(stored) : [];
  });

  const [currentWorkout, setCurrentWorkout] = useState<WorkoutEntry[]>([]);
  const [currentMeasurement, setCurrentMeasurement] = useState<MeasurementEntry[]>([]);

  useEffect(() => {
    localStorage.setItem('tracky-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('tracky-workout-history', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem('tracky-measurement-history', JSON.stringify(measurementHistory));
  }, [measurementHistory]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addWorkoutSession = (session: Omit<WorkoutSession, 'id' | 'date'>) => {
    const newSession: WorkoutSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('de-DE'),
    };
    setWorkoutHistory(prev => [newSession, ...prev]);
    setCurrentWorkout([]);
  };

  const addMeasurementSession = (session: Omit<MeasurementSession, 'id' | 'date'>) => {
    const newSession: MeasurementSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('de-DE'),
    };
    setMeasurementHistory(prev => [newSession, ...prev]);
    setCurrentMeasurement([]);
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        workoutHistory,
        measurementHistory,
        addWorkoutSession,
        addMeasurementSession,
        currentWorkout,
        setCurrentWorkout,
        currentMeasurement,
        setCurrentMeasurement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
