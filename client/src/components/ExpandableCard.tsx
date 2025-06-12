import type { FC } from "react";
import { useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";

interface ExpandableCardProps {
  title?: string; // Optional title for the card
  content: string;
  maxLength: number;
  name?: string; // For testimonials
  role?: string; // For testimonials
  className?: string; // For styling the card itself
}

export const ExpandableCard: FC<ExpandableCardProps> = ({
  title,
  content,
  maxLength,
  name,
  role,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const showReadMoreButton = content.length > maxLength;

  const displayedContent =
    isExpanded || !showReadMoreButton
      ? content
      : `${content.substring(0, maxLength)}...`;

  return (
    <Card
      className={`p-8 hover:shadow-lg transition-shadow rounded-2xl bg-white ${className}`}
    >
      {title && (
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      )}
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {displayedContent}
      </p>
      {showReadMoreButton && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:underline text-sm p-0 bg-transparent shadow-none border-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
      {(name || role) && (
        <div>
          {name && <p className="font-semibold text-gray-900">{name}</p>}
          {role && <p className="text-sm text-gray-500">{role}</p>}
        </div>
      )}
    </Card>
  );
};
