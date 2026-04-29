interface IProps {
  timeLeft: number;
}

export default function Timer({ timeLeft }: IProps) {
  const formatTime = (time: number) => time.toString().padStart(2, "0");
  const minutes = formatTime(Math.floor(timeLeft / 60));
  const seconds = formatTime(timeLeft % 60);

  return (
    <>
      <div className="num center-time">
        <span>
          {minutes}:{seconds}
        </span>
      </div>
    </>
  );
}
