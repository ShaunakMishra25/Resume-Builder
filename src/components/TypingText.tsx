"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  onTypingDone?: () => void;
};

const TypingText = ({ text, speed = 20, onTypingDone }: TypingTextProps) => {
  const lines = text.split("\n");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([""]);
  const [charIndex, setCharIndex] = useState(0);

 useEffect(() => {
  if (!lines.length) return;

  const currentLine = lines[currentLineIndex];

  if (charIndex < currentLine.length) {
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => {
        const updated = [...prev];
        updated[currentLineIndex] += currentLine[charIndex];
        return updated;
      });
      setCharIndex((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timeout);
  } else if (currentLineIndex < lines.length - 1) {
    setTimeout(() => {
      setDisplayedLines((prev) => [...prev, ""]);
      setCurrentLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, speed);
  } else {
    onTypingDone?.();
  }
}, [charIndex, currentLineIndex, lines, speed, onTypingDone]);


  useEffect(() => {
    // Reset everything on text change
    setDisplayedLines([""]);
    setCurrentLineIndex(0);
    setCharIndex(0);
  }, [text]);

  return (
    <div className="whitespace-pre-wrap">
      {displayedLines.join("\n")}
    </div>
  );
};

export default TypingText;
