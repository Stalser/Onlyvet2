"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Mode = "password" | "email_code" | "phone";

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>("password");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [emailCodeSent, setEmailCodeSent] = useState(false);

  async function handleLoginWithPassword() {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (emailOrPhone.includes("@")) {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailOrPhone,
          password,
        });
        if (error) throw error;
        setInfo("Успешный вход по email и паролю");
      } else {
        throw new Error("Логин по телефону пока не подключён. Используйте email.");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendEmailCode() {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) throw error;
      setEmailCodeSent(true);
      setInfo("Код/ссылка отправлены на email. Проверьте почту.");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{width: "360px", maxWidth: "100%", padding: 24, borderRadius: 16, background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)"}}>
      <h1 style={{fontSize: 20, fontWeight: 600, textAlign: "center", marginBottom: 16}}>Вход в OnlyVet</h1>
      <div style={{display: "flex", gap: 8, marginBottom: 12}}>
        <button
          onClick={() => setMode("password")}
          style={{
            flex: 1,
            padding: "8px 4px",
            borderRadius: 999,
            border: "1px solid #ccc",
            background: mode === "password" ? "black" : "white",
            color: mode === "password" ? "white" : "black",
            fontSize: 12,
          }}
        >
          По паролю
        </button>
        <button
          onClick={() => setMode("email_code")}
          style={{
            flex: 1,
            padding: "8px 4px",
            borderRadius: 999,
            border: "1px solid #ccc",
            background: mode === "email_code" ? "black" : "white",
            color: mode === "email_code" ? "white" : "black",
            fontSize: 12,
          }}
        >
          Код на почту
        </button>
        <button
          onClick={() => setMode("phone")}
          style={{
            flex: 1,
            padding: "8px 4px",
            borderRadius: 999,
            border: "1px solid #ccc",
            background: mode === "phone" ? "black" : "white",
            color: mode === "phone" ? "white" : "black",
            fontSize: 12,
          }}
        >
          По телефону
        </button>
      </div>

      {error && (
        <div style={{marginBottom: 8, padding: 8, borderRadius: 8, background: "#fee2e2", color: "#b91c1c", fontSize: 12}}>
          {error}
        </div>
      )}
      {info && (
        <div style={{marginBottom: 8, padding: 8, borderRadius: 8, background: "#dcfce7", color: "#166534", fontSize: 12}}>
          {info}
        </div>
      )}

      {mode === "password" && (
        <div>
          <label style={{fontSize: 12, display: "block", marginBottom: 4}}>Email или телефон</label>
          <input
            value={emailOrPhone}
            onChange={e => setEmailOrPhone(e.target.value)}
            placeholder="user@example.com или +7..."
            style={{width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", fontSize: 13, marginBottom: 8}}
          />
          <label style={{fontSize: 12, display: "block", marginBottom: 4}}>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", fontSize: 13, marginBottom: 12}}
          />
          <button
            onClick={handleLoginWithPassword}
            disabled={loading}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 999,
              background: "black",
              color: "white",
              fontSize: 14,
              border: "none",
              opacity: loading ? 0.6 : 1,
              cursor: "pointer",
            }}
          >
            {loading ? "Входим..." : "Войти"}
          </button>
          <div style={{display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#6b7280"}}>
            <button style={{border: "none", background: "transparent", textDecoration: "underline", cursor: "pointer"}}>
              Забыли пароль?
            </button>
            <button
              onClick={() => setMode("email_code")}
              style={{border: "none", background: "transparent", textDecoration: "underline", cursor: "pointer"}}
            >
              Войти по коду
            </button>
          </div>
        </div>
      )}

      {mode === "email_code" && (
        <div>
          <label style={{fontSize: 12, display: "block", marginBottom: 4}}>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="user@example.com"
            style={{width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", fontSize: 13, marginBottom: 12}}
          />
          {!emailCodeSent ? (
            <button
              onClick={handleSendEmailCode}
              disabled={loading}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 999,
                background: "black",
                color: "white",
                fontSize: 14,
                border: "none",
                opacity: loading ? 0.6 : 1,
                cursor: "pointer",
              }}
            >
              {loading ? "Отправляем..." : "Отправить код на почту"}
            </button>
          ) : (
            <p style={{fontSize: 12, color: "#4b5563"}}>
              Код/ссылка отправлены на почту. Перейдите по ссылке из письма, чтобы войти.
            </p>
          )}
        </div>
      )}

      {mode === "phone" && (
        <div>
          <label style={{fontSize: 12, display: "block", marginBottom: 4}}>Телефон</label>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+7..."
            style={{width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", fontSize: 13, marginBottom: 8}}
          />
          <label style={{fontSize: 12, display: "block", marginBottom: 4}}>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", fontSize: 13, marginBottom: 12}}
          />
          <button
            onClick={() => setError("Вход по телефону пока не подключён к бэкенду. Интерфейс готов, логику добавим позже.")}
            disabled={loading}
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: 999,
              background: "black",
              color: "white",
              fontSize: 14,
              border: "none",
              opacity: loading ? 0.6 : 1,
              cursor: "pointer",
            }}
          >
            Войти по телефону
          </button>
        </div>
      )}
    </div>
  );
}
