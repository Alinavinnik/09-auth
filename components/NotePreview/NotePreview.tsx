import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  data: Note;
  closeModal: () => void;
}

function NotePreview({ data, closeModal }: NotePreviewProps) {
  return (
    data && (
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
        <button type="button" className={css.backBtn} onClick={closeModal}>
          Back
        </button>
      </div>
    )
  );
}

export default NotePreview;
