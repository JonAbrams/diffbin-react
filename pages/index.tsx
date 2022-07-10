import type { NextPage } from 'next'
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

declare function diffString(oldText: string, newText: string): string;

const Home: NextPage = () => {
  const [oldText, setOldText] = useState("Put the original text here.");
  const [newText, setNewText] = useState("Put the modified text here.");
  const [diffHtml, setDiffHtml] = useState("");

  useEffect(() => {
    setDiffHtml(diffString(oldText, newText));
  }, [oldText, newText]);

  function handleOldTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const oldText = event.target!.value;
    setOldText(oldText);
  }

  function handleNewTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = event.target!.value;
    setNewText(newText);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Diffbin - Compare changes between text revisions</title>
        <meta name="description" content="Easy and free text comparisons" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <script defer src="/jsdiff.js"></script>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Diffbin</h1>
        <div className={styles.textAreas}>
          <textarea
            placeholder="Old text goes here…"
            className={styles.oldText}
            value={oldText}
            onChange={handleOldTextChange}
          ></textarea>
          <textarea
            placeholder="New text goes here…"
            className={styles.newText}
            value={newText}
            onChange={handleNewTextChange}
          ></textarea>
        </div>
        {diffHtml && (
          <div className={styles.diffContainer}>
            <pre
              className={styles.diffText}
              dangerouslySetInnerHTML={{ __html: diffHtml }}
            ></pre>
          </div>
        )}
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
        <div>
          Hosted for free by{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
        </div>
        <div>
          Diff algorithm by{" "}
          <a
            href="https://johnresig.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            John Resig
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home
