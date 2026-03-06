import api from "./Api";

export const getAllEvents = () => api.get("/events").then((res) => res.data);

export const getEventById = (id) =>
  api.get(`/events/${id}`).then((res) => res.data);

export const createEvent = (eventData) =>
  api
    .post("/events", eventData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const deleteEvent = (id) => api.delete(`/events/${id}`);

export const updateEvent = (id, eventData) =>
  api
    .put(`/events/${id}`, eventData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const updateEventStatus = (id, status) => 
  api.put(`/events/status/${id}`, { status }).then((res) => res.data);
