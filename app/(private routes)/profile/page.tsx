import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page | NoteHub",
  description: "User profile page",

  openGraph: {
    title: "Profile Page | NoteHub",
    description: "User profile page",
    url: "/profile",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile Page",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Profile Page | NoteHub",
    description: "User profile page",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default async function Profile() {
  const { data } = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src={data.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {data.username}</p>
          <p>Email: {data.email}</p>
        </div>
      </div>
    </main>
  );
}
