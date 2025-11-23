export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);
