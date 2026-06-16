"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError) {
    return <p>Something went wrong.</p>;
  }
  const router = useRouter();
  const close = router.back;

  return (
    data && (
      <Modal onClose={close}>
        <NotePreview data={data} closeModal={close} />
      </Modal>
    )
  );
}
