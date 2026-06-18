"use client";
import { login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuth((store) => store.setUser);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError("");
      setIsLoading(true);
      const formValues = Object.fromEntries(formData) as {
        email: string;
        password: string;
      };
      const user = await login(formValues);
      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch {
      setError("Somthing went wrong");
    } finally {
      setIsLoading(false);
    }
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
            {isLoading ? "Loading..." : "Log in"}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
