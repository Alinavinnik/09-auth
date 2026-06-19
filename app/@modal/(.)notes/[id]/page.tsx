import { fetchServerNoteById } from "@/lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface ModalProps {
  params: Promise<{ id: string }>;
}

export default async function ModalPreview({ params }: ModalProps) {
  const id = (await params).id;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
