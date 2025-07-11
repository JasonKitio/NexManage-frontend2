// components/CommentItem.jsx
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { User2Icon, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import CommentForm from './CommentForm'; // Import the new form component

const CommentItem = ({ comment, onReply, onLike, onDislike, currentUser }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  // Helper to format date/time (you can use a library like `date-fns` for robust formatting)
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " ans";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " mois";
    interval = seconds / 604800;
    if (interval > 1) return Math.floor(interval) + " sem";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " j";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " min";
    return Math.floor(seconds) + " sec";
  };

  const handleLike = () => {
    onLike(comment.id);
  };

  const handleDislike = () => {
    onDislike(comment.id);
  };

  const handleReplySubmit = (text) => {
    onReply(comment.id, text);
    setShowReplyForm(false); // Hide form after submitting reply
  };

  return (
    <div className={`flex space-x-3 ${comment.parentId ? 'ml-8' : ''}`}> {/* Indent replies */}
      <Avatar className="h-8 w-8 flex-shrink-0">
        {comment.authorAvatarUrl ? (
          <img src={comment.authorAvatarUrl} alt={comment.authorInitial} />
        ) : (
          <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
            {comment.authorInitial}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold text-gray-900">{comment.author}</span>
          <span className="text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-2 text-gray-800 text-sm mt-1">
          {comment.text}
        </div>
        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-600">
          <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center space-x-1">
            <ThumbsUp className={`h-4 w-4 ${comment.likedByCurrentUser ? 'text-blue-600' : ''}`} />
            <span>{comment.likes > 0 ? comment.likes : ''}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDislike} className="flex items-center space-x-1">
            <ThumbsDown className={`h-4 w-4 ${comment.dislikedByCurrentUser ? 'text-red-600' : ''}`} />
            <span>{comment.dislikes > 0 ? comment.dislikes : ''}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowReplyForm(!showReplyForm)} className="flex items-center space-x-1">
            <MessageSquare className="h-4 w-4" />
            <span>Répondre</span>
          </Button>
        </div>

        {showReplyForm && (
          <div className="mt-3">
            <CommentForm
              placeholder={`Répondre à ${comment.author}...`}
              onCommentSubmit={handleReplySubmit}
              parentCommentId={comment.id}
              className="pl-2" // Adjust padding for reply form
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
              className="text-blue-600 hover:text-blue-700"
            >
              {showReplies ? `Masquer ${comment.replies.length} réponses` : `Afficher ${comment.replies.length} réponses`}
            </Button>
            {showReplies && (
              <div className="mt-3 space-y-4">
                {comment.replies.map(reply => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    onLike={onLike}
                    onDislike={onDislike}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;