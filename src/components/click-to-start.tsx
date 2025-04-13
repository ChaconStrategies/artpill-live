'use client';

const ClickToStart = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-40 bg-[#ececec] flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <div className="text-lg font-light">CLICK TO START</div>
    </div>
  );
};

export default ClickToStart;
