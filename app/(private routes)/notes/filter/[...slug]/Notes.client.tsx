"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api/clientApi";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface NotesProps {
  tag: string;
}

export default function Notes({ tag }: NotesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const validTag = tag === "all" ? "" : tag;
  //Search note
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", searchQuery, validTag, page],
    queryFn: () => fetchNotes(searchQuery, validTag, page),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const onChange = useDebouncedCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChange} />
        {data && totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>
      {isError && (
        <p style={{ color: "#f61515" }}>
          Somthing went wrong!Please reload your page
        </p>
      )}
      {isLoading && <Loader />}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
