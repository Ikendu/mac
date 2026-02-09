export default function RoadingIcon() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-blue-800 z-50">
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .loading-spinner {
          width: 150px;
          height: 150px;
          border: 4px solid transparent;
          border-top-color: white;
          border-right-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>
      <div className="loading-spinner"></div>
      <p className="text-white text-xl font-semibold">Loading Transactions</p>
    </div>
  );
}
