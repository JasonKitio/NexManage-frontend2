"use client";

import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { v4 as uuidv4 } from "uuid";

// Type pour un commentaire (avec récursivité sur replies)
interface CommentType {
  id: string;
  author: string;
  authorInitial: string;
  authorAvatarUrl: string | null;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  likedByCurrentUser: boolean;
  dislikedByCurrentUser: boolean;
  replies: CommentType[];
  parentId?: string | null;
}

// Données initiales (dummy)
const initialComments: CommentType[] = [
  {
    id: "c1",
    author: "Alice Martin",
    authorInitial: "AM",
    authorAvatarUrl: null,
    text: "Ça c'est fait. Bon travail à l'équipe !",
    timestamp: "2025-07-07T10:00:00Z",
    likes: 15,
    dislikes: 2,
    likedByCurrentUser: false,
    dislikedByCurrentUser: false,
    replies: [
      {
        id: "r1-1",
        parentId: "c1",
        author: "Bob Dupont",
        authorInitial: "BD",
        authorAvatarUrl: null,
        text: "Merci Alice ! On a mis les bouchées doubles.",
        timestamp: "2025-07-07T11:30:00Z",
        likes: 5,
        dislikes: 0,
        likedByCurrentUser: false,
        dislikedByCurrentUser: false,
        replies: [],
      },
      {
        id: "r1-2",
        parentId: "c1",
        author: "Charlie Brown",
        authorInitial: "CB",
        authorAvatarUrl: null,
        text: "Super ! Est-ce qu'on peut avoir un point sur le next step ?",
        timestamp: "2025-07-07T12:00:00Z",
        likes: 8,
        dislikes: 1,
        likedByCurrentUser: false,
        dislikedByCurrentUser: false,
        replies: [
          {
            id: "r1-2-1",
            parentId: "r1-2",
            author: "Alice Martin",
            authorInitial: "AM",
            authorAvatarUrl: null,
            text: "Oui Charlie, je prépare ça pour demain matin.",
            timestamp: "2025-07-07T14:00:00Z",
            likes: 2,
            dislikes: 0,
            likedByCurrentUser: false,
            dislikedByCurrentUser: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    author: "David S.",
    authorInitial: "DS",
    authorAvatarUrl: null,
    text: "Je confirme, c'est validé de mon côté.",
    timestamp: "2025-07-07T15:45:00Z",
    likes: 10,
    dislikes: 0,
    likedByCurrentUser: false,
    dislikedByCurrentUser: false,
    replies: [],
  },
];

// Utilisateur courant (dummy)
const currentUser = {
  id: "user123",
  name: "Tsague Inares",
  initial: "TI",
  avatarUrl: null,
};

const Commantaires: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);

  // Fonction typée pour mettre à jour un commentaire par son id
  const updateCommentById = (
    commentList: CommentType[],
    id: string,
    updateFn: (comment: CommentType) => CommentType
  ): CommentType[] => {
    return commentList.map((comment) => {
      if (comment.id === id) {
        return updateFn(comment);
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentById(comment.replies, id, updateFn),
        };
      }
      return comment;
    });
  };

  // Ajouter un nouveau commentaire ou une réponse
  const handleNewComment = (text: string, parentId: string | null = null) => {
    const newComment: CommentType = {
      id: uuidv4(),
      author: currentUser.name,
      authorInitial: currentUser.initial,
      authorAvatarUrl: currentUser.avatarUrl,
      text,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      likedByCurrentUser: false,
      dislikedByCurrentUser: false,
      replies: [],
      parentId,
    };

    if (parentId) {
      setComments((prevComments) =>
        updateCommentById(prevComments, parentId, (commentToUpdate) => ({
          ...commentToUpdate,
          replies: [...commentToUpdate.replies, newComment],
        }))
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  // Gestion du like
  const handleLike = (commentId: string) => {
    setComments((prevComments) =>
      updateCommentById(prevComments, commentId, (comment) => {
        const newLikes = comment.likedByCurrentUser ? comment.likes - 1 : comment.likes + 1;
        const newDislikes = comment.dislikedByCurrentUser ? comment.dislikes - 1 : comment.dislikes;

        return {
          ...comment,
          likes: newLikes,
          dislikes: newDislikes,
          likedByCurrentUser: !comment.likedByCurrentUser,
          dislikedByCurrentUser: false,
        };
      })
    );
  };

  // Gestion du dislike
  const handleDislike = (commentId: string) => {
    setComments((prevComments) =>
      updateCommentById(prevComments, commentId, (comment) => {
        const newDislikes = comment.dislikedByCurrentUser ? comment.dislikes - 1 : comment.dislikes + 1;
        const newLikes = comment.likedByCurrentUser ? comment.likes - 1 : comment.likes;

        return {
          ...comment,
          dislikes: newDislikes,
          likes: newLikes,
          dislikedByCurrentUser: !comment.dislikedByCurrentUser,
          likedByCurrentUser: false,
        };
      })
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold p-4 border-b">Commentaires</h2>
      <ScrollArea className="p-4 space-y-4" style={{ maxHeight: "400px" }}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleNewComment}
            onLike={handleLike}
            onDislike={handleDislike}
            currentUser={currentUser}
          />
        ))}
      </ScrollArea>
      <div className="border-t p-4">
        <CommentForm placeholder="Ajouter un commentaire..." onCommentSubmit={handleNewComment} parentCommentId={""} className={""} />
      </div>
    </div>
  );
};

export default Commantaires;
