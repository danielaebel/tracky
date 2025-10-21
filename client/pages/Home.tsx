import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft, Home as HomeIcon } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const navigate = useNavigate();
  const { settings } = useApp();

  return (
    <div className="flex flex-col items-start h-screen bg-white max-w-[402px] mx-auto w-full">
      <div className="flex items-center gap-0 px-0 py-0 w-full border-b border-[#F5F5F5] bg-white">
        <button className="flex items-center justify-center w-[60px] h-[60px] px-4.5 py-4.5 rounded-lg flex-shrink-0" />

        <div className="flex flex-col justify-center items-center flex-1 px-6">
          <div
            className="text-black text-center text-lg leading-normal font-normal"
            style={{ fontFamily: "Lexend" }}
          >
            Tracky
          </div>
        </div>

        <button className="flex items-center justify-center w-[60px] h-[60px] px-4.5 py-4.5 rounded-lg flex-shrink-0">
          <HomeIcon size={24} strokeWidth={2} className="text-[#A4A7AE]" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-12 flex-1 w-full px-6 py-12">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <div
            className="text-black text-center text-[32px] font-bold leading-normal"
            style={{ fontFamily: "Lexend Deca" }}
          >
            Hi, {settings.name}!
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-6 flex-1 w-full">
          {settings.workoutEnabled && (
            <button
              onClick={() => navigate("/workout")}
              className="flex justify-center items-center w-full px-6 py-[18px] rounded-lg"
              style={{ background: "#7F56D9" }}
            >
              <div
                className="text-white text-lg font-medium leading-6"
                style={{ fontFamily: "Lexend" }}
              >
                Workout tracken
              </div>
            </button>
          )}

          {settings.measurementEnabled && (
            <button
              onClick={() => navigate("/measurements")}
              className="flex justify-center items-center w-full px-6 py-[18px] rounded-lg border border-[#D5D7DA] bg-white"
            >
              <div
                className="text-[#414651] text-lg font-medium leading-6"
                style={{ fontFamily: "Lexend" }}
              >
                Körpermaße nehmen
              </div>
            </button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
