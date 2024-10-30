"use client";

import React, { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import {
  createComment,
  getCommentsByFeedbackId,
} from "@/lib/actions/comment.actions";

interface Comment {
  id: string;
  text: string;
  date: string; // Adjust according to your actual date format
}

const Comments = ({ feedbackId }: { feedbackId: string }) => {
  const { userId } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const { comments: fetchedComments } = await getCommentsByFeedbackId(
        feedbackId
      );
      setComments(fetchedComments as Comment[]);
    };
    fetchComments();
  }, [feedbackId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { state, data } = await createComment(
        feedbackId,
        userId as string,
        newComment
      );

      if (state === "success") {
        const { comments: updatedComments } = await getCommentsByFeedbackId(
          feedbackId
        );
        setComments(updatedComments as Comment[]);
      } else {
        console.error("Failed to add comment:", state, data);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }

    setNewComment("");
  };

  return (
    <div className="mt-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 hover:bg-transparent mb-3"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{comments.length}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4 bg-white shadow-lg rounded-lg">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Comments</h3>
            <div className="space-y-4 mt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-2">
                  <p className="text-sm text-gray-600">{comment.text}</p>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              onClick={handleAddComment}
              className="flex items-center justify-center p-2 hover:bg-transparent"
            >
              <Send className="w-5 h-5 text-green-600" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Comments;
