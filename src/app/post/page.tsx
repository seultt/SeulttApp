import styles from "./page.module.css";
import PostInput from "./PostInput";
import { Suspense } from "react";
// import PostList from "./PostList";
import PostList, { preload } from "./PostList";
interface User {
  userId: String;
  username: String;
  email: String;
  createdAt: string;
}
async function getUserData(userId: String): Promise<User> {
  const res = await fetch("http://localhost:9500/users/" + userId, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  console.log("server component");
  const userId = "seulgilee";
  const user = await getUserData(userId);
  preload(userId);
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div>{user.username}</div>
        <div>{user.userId}</div>
        <div>{user.email}</div>
      </section>
      <section className={styles.section}>
        <PostInput />
        <Suspense fallback={<div>loading..</div>}>
          <PostList userId="seulgilee" />
        </Suspense>
      </section>
    </main>
  );
}
