import type { NextPage } from 'next'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

declare function diffString(oldText: string, newText: string): string;

const Home: NextPage = () => {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diffHtml, setDiffHtml] = useState("");

  function handleOldTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const oldText = event.target!.value;
    setOldText(oldText);
    setDiffHtml(diffString(oldText, newText));
  }

  function handleNewTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = event.target!.value;
    setNewText(newText);
    setDiffHtml(diffString(oldText, newText));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Diffbin - Compare changes between text revisions</title>
        <meta name="description" content="Easy and free text comparisons" />
        <link rel="icon" href="/favicon.ico" />
        <script defer src="/jsdiff.js"></script>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Diffbin</h1>
        <textarea
          className={styles.oldText}
          value={oldText}
          onChange={handleOldTextChange}
        ></textarea>
        <textarea
          className={styles.newText}
          value={newText}
          onChange={handleNewTextChange}
        ></textarea>
        <pre
          className={styles.diffText}
          dangerouslySetInnerHTML={{ __html: diffHtml }}
        ></pre>
      </main>

      <footer className={styles.footer}>
        <div>
          Created by{" "}
          <a
            href="https://twitter.com/JonathanAbrams"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jon Abrams
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home
