interface ProgressBarProps {
  total: number;
  current: number;
}

export default function ProgressBar({ total, current }: ProgressBarProps) {
  return (
    <div className="flex justify-between items-start w-full">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="h-1 flex-1"
          style={{
            background: index < current ? '#7F56D9' : '#7F56D9',
            opacity: index < current ? 1 : 0.2,
          }}
        />
      ))}
    </div>
  );
}
