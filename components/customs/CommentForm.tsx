// components/CommentForm.jsx
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Paperclip, Send } from "lucide-react";

interface CommentFormProps {
  onCommentSubmit: (commentText: string, parentCommentId: string) => void;
  placeholder: string;
  parentCommentId: string;
  className: string;
}

const CommentForm = ({
  onCommentSubmit,
  placeholder,
  parentCommentId,
  className,
}: CommentFormProps) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(commentText, parentCommentId);
      setCommentText(""); // Clear input after submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center space-x-2 ${className}`}
    >
      <div className="flex-1 relative">
        <Input
          placeholder={placeholder || "Ajouter un commentaire..."}
          className="pr-10"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          type="button" // Important for not submitting the form
        >
          <Paperclip className="h-4 w-4" />
        </Button>
      </div>
      <Button
        size="icon"
        className="bg-blue-600 hover:bg-blue-700 h-10 w-10 flex-shrink-0" // Adjusted size for better fit
        type="submit"
        disabled={!commentText.trim()}
      >
        <Send className="h-5 w-5" /> {/* Adjusted icon size */}
      </Button>
    </form>
  );
};

export default CommentForm;
