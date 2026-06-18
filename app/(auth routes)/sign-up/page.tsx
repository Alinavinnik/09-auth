"use client";
import css from "./SignUpPage.module.css";
import { register } from "../../../lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuth((store) => store.setUser);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError("");
      setIsLoading(true);
      const values = Object.fromEntries(formData) as {
        email: string;
        password: string;
      };
      const user = await register(values);
      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch (error) {
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
        {error && <p className={css.error}>Error</p>}
      </form>
    </main>
  );
}
