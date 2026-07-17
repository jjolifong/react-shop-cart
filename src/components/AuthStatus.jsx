import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

function getAuthErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "잘못된 이메일 형식입니다.";
    case "auth/wrong-password":
      return "비밀번호가 올바르지 않습니다.";
    case "auth/user-not-found":
      return "가입되지 않은 이메일입니다.";
    case "auth/email-already-in-use":
      return "이미 가입된 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호가 너무 약합니다. 6자 이상 입력해 주세요.";
    case "auth/invalid-credential":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    case "auth/missing-password":
      return "비밀번호를 입력해 주세요.";
    case "auth/too-many-requests":
      return "시도가 너무 많습니다. 잠시 후 다시 시도해 주세요.";
    case "auth/network-request-failed":
      return "네트워크 오류가 발생했습니다. 연결을 확인해 주세요.";
    default:
      return "인증에 실패했습니다. 다시 시도해 주세요.";
  }
}

function AuthStatus({ user, authChecking }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (authChecking) {
    return <p>인증 확인 중...</p>;
  }

  if (user) {
    return (
      <div>
        <p>로그인됨</p>
        <button
          type="button"
          onClick={async () => {
            setErrorMessage("");
            try {
              await signOut(auth);
            } catch (error) {
              setErrorMessage(getAuthErrorMessage(error.code));
            }
          }}
        >
          로그아웃
        </button>
        {errorMessage && <p style={{ color: "crimson" }}>{errorMessage}</p>}
      </div>
    );
  }

  const handleAuth = async (mode) => {
    setErrorMessage("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error.code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleAuth("login");
      }}
      style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}
    >
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        disabled={submitting}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        disabled={submitting}
      />
      <button type="submit" disabled={submitting}>
        로그인
      </button>
      <button
        type="button"
        disabled={submitting}
        onClick={() => handleAuth("signup")}
      >
        회원가입
      </button>
      {errorMessage && <p style={{ color: "crimson", width: "100%" }}>{errorMessage}</p>}
    </form>
  );
}

export default AuthStatus;
