import api from "./Api";

export const getAllComments = () =>
  api.get("/comments").then((res) => res.data);

export const getCommentById = (id) =>
  api.get(`/comments/${id}`).then((res) => res.data);

export const createComment = (commentData) =>
  api.post("/comments", commentData).then((res) => res.data);

export const deleteComment = (id) =>
  api.delete(`/comments/${id}`);

export const updateComment = (id, commentData) =>
  api.put(`/comments/${id}`, commentData).then((res) => res.data);
    