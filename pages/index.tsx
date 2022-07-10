import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

declare function diffString(oldText: string, newText: string): string;

const defaultOldText = "Put the original text here.";
const defaultNewText = "Put the modified text here.";

const Home: NextPage = () => {
  const [oldText, setOldText] = useState(defaultOldText);
  const [newText, setNewText] = useState(defaultNewText);
  const [diffHtml, setDiffHtml] = useState("");
  const oldTextEl = useRef(null);
  const newTextEl = useRef(null);

  useEffect(() => {
    const oldHash = location.hash.split("&")[0].slice(1);
    const newHash = location.hash.split("&")[1];
    if (oldHash && newHash) {
      setOldText(decodeURIComponent(oldHash));
      setNewText(decodeURIComponent(newHash));
    }
  }, []);

  useEffect(() => {
    setDiffHtml(diffString(oldText, newText));
    if (
      oldText &&
      newText &&
      oldText !== defaultOldText &&
      newText !== defaultNewText
    ) {
      location.hash =
        encodeURIComponent(oldText) + "&" + encodeURIComponent(newText);
    } else {
      history.replaceState(null, "", "/");
    }
  }, [oldText, newText]);

  function handleOldTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const oldText = event.target!.value;
    setOldText(oldText);
  }

  function handleNewTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = event.target!.value;
    setNewText(newText);
  }

  function handleOldTextFocus() {
    if (oldText === defaultOldText) {
      (oldTextEl?.current as unknown as HTMLTextAreaElement).select();
    }
  }

  function handleNewTextFocus() {
    if (newText === defaultNewText) {
      (newTextEl?.current as unknown as HTMLTextAreaElement).select();
    }
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
            onFocus={handleOldTextFocus}
            ref={oldTextEl}
          ></textarea>
          <textarea
            placeholder="New text goes here…"
            className={styles.newText}
            value={newText}
            onChange={handleNewTextChange}
            onFocus={handleNewTextFocus}
            ref={newTextEl}
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

export default Home;
