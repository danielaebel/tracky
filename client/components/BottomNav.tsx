import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Rocket, Ruler, Award, Settings } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useApp();

  const tabs = [
    { id: 'workout', label: 'Workout', icon: Rocket, path: '/workout', enabled: settings.workoutEnabled },
    { id: 'measurements', label: 'Maße', icon: Ruler, path: '/measurements', enabled: settings.measurementEnabled },
    { id: 'history', label: 'History', icon: Award, path: '/history', enabled: true },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', enabled: true },
  ].filter(tab => tab.enabled);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="flex items-center bg-white border-t border-gray-100">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(tab.path);
        
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center gap-1.5 flex-1 py-3 px-4 rounded-lg transition-colors"
          >
            <Icon
              size={24}
              strokeWidth={2}
              className={active ? 'text-black' : 'text-black'}
              style={{ opacity: active ? 1 : 0.4 }}
            />
            <div className="flex items-center justify-center px-0.5">
              <div className="text-[#535862] text-base leading-6" style={{ fontFamily: 'Lexend' }}>
                {tab.label}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
