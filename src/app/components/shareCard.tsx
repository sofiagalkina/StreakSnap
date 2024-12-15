"use client";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import React, { useCallback, useRef } from 'react';
export default function ShareCard(streak: any) {
    console.log(streak.streak);
    const [streakdata, setStreakData] = useState(streak.streak);
  const [title, setTitle] = useState<string>(`${streak.streak.title}`);
  const [url, setUrl] = useState<string>("https://streaksnap.vercel.app/");
  const [imageUrl, setImageUrl] = useState<JSX.Element | null>(null);


  const shareOnSocialMedia = (platform: string) => {
    const { title, streakCount, count, average, datatype } = streakdata;
    let text = `Check out my streak: ${title} with ${streakCount} days!`;
    if (datatype === "count") {
      text += ` It includes ${count} total and an average of ${average}.`;
    }

    const encodedText = encodeURIComponent(text);
  
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "facebook":
        console.log(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank");
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="p-6">
      <head>
        <meta property="og:title" content="Check out my streak!" />
        <meta property="og:description" content="Check out my streak: [title] with [streakCount] days! It includes [count] total and an average of [average]." />
        <meta property="og:url" content="https://streaksnap.vercel.app/" />
        <meta property="og:image" content="https://example.com/streak-image.jpg" />
      </head>
      <h1 className="text-2xl font-bold">Share Your Streak</h1>
      <div className="mt-4">
        <button
          onClick={() => shareOnSocialMedia("twitter")}
          className="bg-blue-400 text-white px-4 py-2 rounded mr-2 mb-2"
        >
          <img 
          src="/assets/twitter.png"
          alt="Twitter logo"
          className="w-6 h-6 mr-2"
          />
          Share on Twitter
        </button>
        <button
          onClick={() => shareOnSocialMedia("facebook")}
          className="bg-blue-700 text-white px-4 py-2 rounded mr-2 mb-2"
        >
             <img 
          src="/assets/fb.png"
          alt="FB logo"
          className="w-6 h-6 mr-2"
          />
          Share on Facebook
        </button>
        <button
          onClick={() => shareOnSocialMedia("linkedin")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
             <img 
          src="/assets/linkedin.png"
          alt="LinkedIn logo"
          className="w-8 h-8 mr-2 ml-0"
          />
          Share on LinkedIn
        </button>
      </div>
    </div>
  );
}
