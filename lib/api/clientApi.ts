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
export async function login() {}
export async function logout() {}
export async function checkSession() {}
export async function getMe() {}
export async function updateMe() {}
