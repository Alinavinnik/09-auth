import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api/serverApi";
import Notes from "./Notes.client";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagName = slug[0];
  return {
    title: `${tagName}`,
    description: `View all notes tagged with ${tagName}.`,
    openGraph: {
      title: `${tagName}`,
      description: `View all notes tagged with ${tagName}.`,
      url: `https://08-zustand-nine-psi.vercel.app/notes/filter/${tagName}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tagName}`,
        },
      ],
    },
  };
}

async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();
  const res = (await params).slug;
  const currentTag = res?.[0] ?? "all";
  const tag = currentTag === "all" ? undefined : currentTag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={currentTag} />
    </HydrationBoundary>
  );
}

export default NotesPage;
