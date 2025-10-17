import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  showHome?: boolean;
}

export default function TopBar({ title, showBack = true, showHome = true }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-3 py-0 border-b border-[#F5F5F5] bg-white">
      <button
        onClick={() => showBack && navigate(-1)}
        className="flex items-center justify-center w-[60px] h-[60px] p-4.5 rounded-lg"
      >
        {showBack && <ArrowLeft size={24} strokeWidth={2} className="text-[#A4A7AE]" />}
      </button>
      
      <div className="flex flex-col justify-center items-center flex-1 px-6">
        <div className="text-black text-center text-lg leading-normal" style={{ fontFamily: 'Lexend' }}>
          {title}
        </div>
      </div>
      
      <button
        onClick={() => showHome && navigate('/')}
        className="flex items-center justify-center w-[60px] h-[60px] p-4.5 rounded-lg"
      >
        {showHome && <Home size={24} strokeWidth={2} className="text-[#A4A7AE]" />}
      </button>
    </div>
  );
}
