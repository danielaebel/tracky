import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import TopBar from '@/components/TopBar';
import ProgressBar from '@/components/ProgressBar';
import BottomNav from '@/components/BottomNav';

export default function MeasurementsFinished() {
  const navigate = useNavigate();
  const { settings, measurementHistory } = useApp();

  const latestSession = measurementHistory[0];
  const previousSession = measurementHistory[1];

  const getLastDiff = (bodyPartId: string) => {
    const current = latestSession?.entries.find(e => e.bodyPartId === bodyPartId)?.value || 0;
    const previous = previousSession?.entries.find(e => e.bodyPartId === bodyPartId)?.value || 0;
    const diff = current - previous;
    if (!previousSession) return '–';
    if (diff > 0) return `+${diff} cm`;
    if (diff < 0) return `${diff} cm`;
    return '–';
  };

  const getAllTimeDiff = (bodyPartId: string) => {
    const current = latestSession?.entries.find(e => e.bodyPartId === bodyPartId)?.value || 0;
    const oldest = measurementHistory[measurementHistory.length - 1];
    const initial = oldest?.entries.find(e => e.bodyPartId === bodyPartId)?.value || 0;
    const diff = current - initial;
    if (measurementHistory.length <= 1) return '–';
    if (diff > 0) return `+${diff} cm`;
    if (diff < 0) return `${diff} cm`;
    return '–';
  };

  return (
    <div className="flex flex-col items-start h-screen bg-white max-w-[402px] mx-auto w-full">
      <TopBar title="Körpermaße" />
      <ProgressBar total={settings.bodyParts.length} current={settings.bodyParts.length} />

      <div className="flex flex-col items-center gap-12 flex-1 w-full px-6 py-12 overflow-y-auto">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div className="text-black text-center text-[32px] font-bold leading-normal" style={{ fontFamily: 'Lexend Deca' }}>
            Ergebnisse
          </div>
        </div>

        <div className="flex flex-col items-start gap-12 w-full">
          <div className="flex items-start w-full gap-0 overflow-x-auto">
            <div className="flex flex-col items-start min-w-[140px]">
              <div className="flex items-center px-4 py-3 w-full border-b border-[#E9EAEB] bg-white">
                <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                  Bereich
                </div>
              </div>
              {latestSession?.entries.map((entry, index) => {
                const bodyPart = settings.bodyParts.find(bp => bp.id === entry.bodyPartId);
                return (
                  <div key={index} className={`flex px-4 py-3 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                    <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                      {bodyPart?.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center min-w-[90px]">
              <div className="flex justify-center items-center px-4 py-3 w-full border-b border-[#E9EAEB] bg-white">
                <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                  Last
                </div>
              </div>
              {latestSession?.entries.map((entry, index) => (
                <div key={index} className={`flex justify-center px-4 py-3 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                  <div className="text-black text-center text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                    {getLastDiff(entry.bodyPartId)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center min-w-[100px]">
              <div className="flex justify-center items-center px-4 py-3 w-full border-b border-[#E9EAEB] bg-white">
                <div className="text-black text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                  All-Time
                </div>
              </div>
              {latestSession?.entries.map((entry, index) => (
                <div key={index} className={`flex justify-center px-4 py-3 items-center w-full border-b border-[#E9EAEB] ${index % 2 === 0 ? 'bg-[#FDFDFD]' : ''}`}>
                  <div className="text-black text-center text-base leading-[22.4px]" style={{ fontFamily: 'Lexend' }}>
                    {getAllTimeDiff(entry.bodyPartId)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <button
            onClick={() => navigate('/history')}
            className="flex justify-center items-center gap-1.5 w-full px-6 py-[18px] rounded-lg border border-[#D5D7DA] bg-white"
          >
            <div className="text-[#414651] text-lg font-medium leading-6" style={{ fontFamily: 'Lexend' }}>
              Entwicklung ansehen
            </div>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
