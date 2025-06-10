interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`rounded-lg shadow-sm ${className}`}>{children}</div>;
};
