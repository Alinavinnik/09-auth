import { FetchNotesResponse, NewNote, Note } from "@/types/note";
import { apiClient } from "./api";
import { User } from "@/types/user";

//Get request
export async function fetchNotes(search: string, page: number, tag?: string) {
  const { data } = await apiClient.get<FetchNotesResponse>("/notes", {
    params: { page, search, perPage: 12, tag },
  });
  return data;
}

//Post request
export async function createNote(newNote: NewNote) {
  const { data } = await apiClient.post<Note>("/notes", newNote);
  return data;
}

//Delete request
export async function deleteNote(id: string) {
  const { data } = await apiClient.delete<Note>(`/notes/${id}`);
  return data;
}

//Fetch by Id
export async function fetchNoteById(id: string) {
  const { data } = await apiClient.get<Note>(`/notes/${id}`);
  return data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export async function register(user: RegisterRequest) {
  const { data } = await apiClient.post<User>("/auth/register", user);
  return data;
}
export async function login(user: RegisterRequest) {
  const { data } = await apiClient.post<User>("/auth/login", user);
  return data;
}

export interface checkSessionResponce {
  success: boolean;
}

export async function checkSession() {
  const { data } = await apiClient.get<checkSessionResponce>("/auth/session");
  return data;
}
export async function logout() {
  const { data } = await apiClient.post<checkSessionResponce>("/auth/logout");
  return data;
}

export async function getMe() {
  const { data } = await apiClient.get<User>("/users/me");
  return data;
}
export async function updateMe() {}
