import { cookies } from "next/headers";
import { apiClient } from "./api";
import { FetchNotesResponse, Note } from "@/types/note";
import { checkSessionResponce } from "./clientApi";

export const fetchServerNotes = async (
  search: string,
  page: number,
  tag?: string,
) => {
  const cookieStore = await cookies();
  const res = await apiClient.get<FetchNotesResponse>("/notes", {
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
  return res;
};

export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const res = await apiClient.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getMe = async () => {};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await apiClient.get<checkSessionResponce>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
