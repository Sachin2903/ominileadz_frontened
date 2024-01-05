const Loader = () => {
  return (
    <div className="flex justify-center py-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#fff"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#4939FF"
          strokeWidth="10"
          fill="none"
          strokeDasharray="140 300"
          strokeDashoffset="90"
          transform="rotate(360 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
