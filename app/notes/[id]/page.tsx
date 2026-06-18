import { fetchServerNoteById } from "@/lib/api/serverApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const response = await fetchServerNoteById(id);

  return {
    title: `${response.data.title}`,
    description: ` ${response.data.content}`,
    openGraph: {
      title: `${response.data.title}`,
      description: ` ${response.data.content}`,
      url: `https://08-zustand-nine-psi.vercel.app/notes/filter/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${response.data.title}`,
        },
      ],
    },
  };
}

async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;
