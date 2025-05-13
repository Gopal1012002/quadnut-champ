import React, { useEffect, useState } from "react";

const MockAttemptPrevent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Auto submit or pause exam here
        alert("You switched tabs! Your exam will be submitted.");
        setIsSubmitted(true);
        // You can also call a function to submit the exam here
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      <h2>Online Exam</h2>
      {isSubmitted ? (
        <p>Your exam has been submitted due to tab switch.</p>
      ) : (
        <textarea placeholder="Write your answer here..."></textarea>
      )}
    </div>
  );
};

export default MockAttemptPrevent;
