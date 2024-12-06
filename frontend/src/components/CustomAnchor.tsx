import React from "react";
import { useNavigate } from "react-router-dom";

interface CustomAnchorProps {
  href?: string;
  children: React.ReactNode;
}

const CustomAnchor: React.FC<CustomAnchorProps> = ({ href, children }) => {
  const navigate = useNavigate();

  // Return a plain span if href is not provided
  if (!href) return <span>{children}</span>;

  // Extract tag or question ID from the href
  const tagMatch = href.match(/^#tag-(\d+)$/);
  const questionMatch = href.match(/^#q-(\d+)$/);

  // Handle click event for navigation
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (tagMatch) {
      const tagId = tagMatch[1];
      navigate(`/tag/${tagId}`); // Navigate to the tag page
    } else if (questionMatch) {
      const questionId = questionMatch[1];
      navigate(`/question/${questionId}`); // Navigate to the question page
    }
  };

  // Display tooltip as title directly on the anchor for now, without async fetching
  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-blue-500 underline"
      title={tagMatch ? `Tag: ${tagMatch[1]}` : questionMatch ? `Question: ${questionMatch[1]}` : "Loading..."}
    >
      {children}
    </a>
  );
};

export default CustomAnchor;