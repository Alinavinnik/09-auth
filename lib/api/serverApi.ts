import { cookies } from "next/headers";
import { apiClient } from "./api";
import { FetchNotesResponse, Note } from "@/types/note";

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
) => {
  const cookieStore = await cookies();
  const { data } = await apiClient.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const { data } = await apiClient.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getMe = async () => {};

export const checkSession = async () => {};
