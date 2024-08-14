"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  async function sendLoginRequest(username: string, password: string) {
    if (password.length < 8) {
      console.log("Password is too short");
      return;
    }
    const response = await axios.post(
      `http://${window.location.hostname}:81/api/tokens`,
      {
        username: username,
        password: password,
      }
    );
    const { accessToken, refreshToken, user_id } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user_id", user_id);
  }

  const router = useRouter();
  function handleKeyEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log("test");
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    if (event.key == "Enter") {
      sendLoginRequest(username.value, password.value);
      router.push(`./main`);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <h1 className="text-4xl text-gray-100">Welcome to Tripplaner!</h1>
      <p className="text-xl text-gray-400">Plan your next trip with us!</p>
      <div className="flex flex-col gap-4 align-center justify-center items-center h-auto">
        <div className="border-rose-500 w-auto flex items-center justify-between bg-black rounded border-solid border-2">
          <div className="flex flex-col w-auto h-auto">
            <div className="flex flex-row items-center">
              <span className="material-symbols-outlined text-rose-500 text-2xl mr-2">
                person
              </span>
              <input
                id="username"
                className="bg-black rounded outline-none h-8 w-56 placeholder:text-white"
                placeholder="Username"
              ></input>
            </div>
            <div className="flex flex-row items-center">
              <span className="material-symbols-outlined text-rose-500 text-2xl mr-2">
                lock
              </span>
              <input
                id="password"
                className="bg-black rounded outline-none h-8 w-56 placeholder:text-white"
                placeholder="Password"
                onKeyDown={handleKeyEvent}
                type="password"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
