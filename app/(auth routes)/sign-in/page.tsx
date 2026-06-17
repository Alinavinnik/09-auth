"use client";
import { login, RegisterRequest } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";

export default function SingInPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(
        formData,
      ) as unknown as RegisterRequest;
      const res = await login(formValues);
      if (res) {
        router.push("/profile");
      }
    } catch {}
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {/* <p className={css.error}>{error}</p> */}
      </form>
    </main>
  );
}
