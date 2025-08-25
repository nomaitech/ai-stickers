import { useState, useEffect } from "react";

const LoadingComments = () => {
  const [comment, setComment] = useState<string>("Processing");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setComment(loadingComments[Math.floor(Math.random() * loadingComments.length)]);
        setVisible(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loadingComments = [
    "Working on it",
    "Progress progressing",
    "Crunching numbers",
    "Almost there",
    "Loading magic",
    "Hang tight",
    "Warming up",
    "Cooking data",
    "Fasten your seatbelt",
    "Assembling bits",
    "Making it happen",
    "Bits in motion",
    "Processing request",
    "Just a sec",
    "Hang on",
    "Counting bytes",
    "Data on the move",
    "Gearing up",
    "Getting ready",
    "Hold tight",
    "Bringing it together",
    "Almost done",
    "Tweaking things",
    "Loading awesomeness",
    "Patience please",
    "Aligning stars",
    "Crunching pixels",
    "Making progress",
    "Hang in there",
  ];

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {comment}
    </div>
  );  
}

export default LoadingComments;