"use client";
import css from "./SignUpPage.module.css";
import { register, RegisterRequest } from "../../../lib/api/clientApi";
import { useRouter } from "next/router";
import { useState } from "react";

export function SingUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as unknown as RegisterRequest;
      const res = await register(values);
      if (res) {
        router.push("/profile");
      }
    } catch {
      setError("Registration failed");
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
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
}
