import api from "./Api";

export const getAllEventParticipants = () =>
  api.get("/event-participants").then((res) => res.data);

export const getEventParticipantById = (id) =>
  api.get(`/event-participants/${id}`).then((res) => res.data);

export const createEventParticipant = (participantData) =>
  api.post("/event-participants", participantData).then((res) => res.data);

export const deleteEventParticipant = (id) =>
  api.delete(`/event-participants/${id}`);

export const updateEventParticipant = (id, participantData) => 
  api.put(`/event-participants/${id}`, participantData).then((res) => res.data);
