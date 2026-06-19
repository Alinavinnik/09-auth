"use client";
import { useAuth } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";
import Image from "next/image";

export default function EditProfilePage() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const value = Object.fromEntries(formData) as {
      username: string;
    };
    try {
      const updatedProfile = await updateMe(value);
      setUser(updatedProfile);
      router.push("/profile");
    } catch {}
  };
  const handleClick = () => {
    router.push("/profile");
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              name="username"
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
