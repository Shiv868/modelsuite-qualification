const COLORS = [
  "linear-gradient(135deg,#3B82F6,#2563EB)",
  "linear-gradient(135deg,#8B5CF6,#7C3AED)",
  "linear-gradient(135deg,#10B981,#059669)",
  "linear-gradient(135deg,#F59E0B,#D97706)",
];

const Avatar = ({
  name = "",
  size = 32,
  className = "",
}) => {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";

  const background =
    COLORS[initial.charCodeAt(0) % COLORS.length];

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background,
      }}
    >
      {initial}
    </div>
  );
};

export default Avatar;