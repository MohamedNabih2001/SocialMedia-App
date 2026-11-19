interface PropsType {
  sizeSpin?: number;
}
function Spinner({ sizeSpin = 15 }: PropsType) {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full">
      <div
        style={{
          height: sizeSpin * 4,
          width: sizeSpin * 4,
        }}
        className={`animate-spin w-15 h-15 rounded-full border-3  border-green-200 border-r-green-600`}
      ></div>
    </div>
  );
}

export default Spinner;
