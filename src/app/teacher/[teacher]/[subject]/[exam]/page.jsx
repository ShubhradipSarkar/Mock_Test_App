"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

function Clock() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="text-black bg-white mx-4 m-2">
      <h2 className="bg-slate-500 p-2 rounded-lg font-bold text-white">
        Time: {formatTime(secondsElapsed)}
      </h2>
    </div>
  );
}

function Page() {
  const uri = useParams();
  console.log(uri);
  const [optionselected, setoptionselected] = useState(false);
  const [optionColor, setoptionColor] = useState([10, 10, 10, 10, 10]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([
    ["2+3 = ?", ["5", "3", "4", "6"]],
    ["2-3 = ?", ["-5", "-2", "1", "-1"]],
    ["7+6 = ?", ["15", "13", "14", "26"]],
    ["12+13 = ?", ["25", "13", "64", "36"]],
    ["22+13 = ?", ["35", "34", "43", "46"]],
  ]);
  const [answers, setAnswers] = useState([
    "unvisited",
    "unvisited",
    "unvisited",
    "unvisited",
    "unvisited",
  ]);
  const [filter, setFilter] = useState("All");
  const handleNextQuestion = () => {
    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
      setoptionselected(false);
    }
  };

  const handlePrevQuestion = () => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const saveOptionSelected = (optionIndex, questionNumber) => {
    setoptionColor((prev) => {
      const pushOption = [...prev];
      pushOption[questionNumber] = optionIndex;
      return pushOption;
    });
    console.log(optionColor);
  };

  const answered = (questionNumber) => {
    if (optionselected) {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[questionNumber] = "answered";
        return newAnswers;
      });
      console.log(answers);
    } else {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[questionNumber] = "skipped";
        return newAnswers;
      });
      console.log(answers);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue =
        "If you refresh, you will not be able to continue the exam.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const filteredQuestions = () => {
    switch (filter) {
      case "Attempted":
        return answers.map((ans, index) => ans === "answered" ? index : null).filter(index => index !== null);
      case "Skipped":
        return answers.map((ans, index) => ans === "skipped" ? index : null).filter(index => index !== null);
      case "Marked":
        return answers.map((ans, index) => ans === "marked" ? index : null).filter(index => index !== null);
      default:
        return questions.map((_, index) => index);
    }
  };
  return (
    <div className="flex">
      <div className="fixed w-3/4 overflow-y-auto top-0 h-screen">
        <div className="fixed top-0 w-3/4 bg-white flex justify-between">
          <h1 className="bg-white m-2 p-2 text-black font-bold">{uri.exam}</h1>
          <Clock />
        </div>
        <div className="flex flex-col bg-slate-100 text-black min-h-screen">
          <div className="mb-4 mt-20">
            <h2>
              Question {questionNumber + 1}
              {")"} {questions[questionNumber][0]}
            </h2>
            <ul className="mt-8 mb-12 flex flex-row flex-wrap">
              {questions[questionNumber][1].map((option, optionIndex) => (
                <li key={optionIndex} className="m-3 flex items-center">
                  <div
                    className="text-white font-bold flex items-center justify-center h-6 w-6 rounded-full"
                    style={{ backgroundColor: "gray" }}
                  >
                    {optionIndex + 1}
                  </div>
                  <button
                    onClick={() => {
                      setoptionselected(true);
                      saveOptionSelected(optionIndex, questionNumber);
                      // answered(questionNumber);
                    }}
                    className={`shadow-md font-bold w-80 m-2 p-2 rounded ${
                      optionColor[questionNumber] === optionIndex
                        ? "bg-green-500"
                        : "bg-white"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between p-4 w-3/4 mx-auto fixed bottom-0">
            <button
              onClick={handlePrevQuestion}
              className="p-2 text-white font-bold bg-blue-500 rounded"
            >
              Previous question
            </button>
            <button
              onClick={() => {
                // Mark the current question
                setAnswers((prevAnswers) => {
                  const newAnswers = [...prevAnswers];
                  newAnswers[questionNumber] = "marked";

                  handleNextQuestion();
                  return newAnswers;
                });
                console.log(answers);
              }}
              className="p-2 text-white font-bold bg-blue-500 rounded"
            >
              Mark for later
            </button>
            <button
              onClick={() => {
                answered(questionNumber);
                setoptionselected(false);
                handleNextQuestion();
              }}
              className="p-2 text-white font-bold bg-blue-500 rounded"
            >
              Save and Next
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-1/4 bg-slate-900 overflow-y-auto h-screen fixed right-0 top-0">
        <div className="fixed bg-slate-900 flex flex-row flex-wrap justify-center items-center gap-2 m-2">
          <button
            onClick={() => setFilter("All")}
            className="p-2 bg-slate-100 text-black text-sm font-bold rounded"
          >
            All
          </button>
          <button
            onClick={() => setFilter("Attempted")}
            className="p-2 bg-slate-100 text-white text-sm font-bold rounded"
            style={{ backgroundColor: "#04fa5e" }}
          >
            Attempted
          </button>
          <button
            onClick={() => setFilter("Skipped")}
            className="p-2 bg-slate-100 text-white text-sm font-bold rounded"
            style={{ backgroundColor: "#fa0478" }}
          >
            Skipped
          </button>
          <button
            onClick={() => setFilter("Marked")}
            className="p-2 bg-slate-100 text-white text-sm font-bold rounded"
            style={{ backgroundColor: "#9204fa" }}
          >
            Marked
          </button>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-2 mt-16">
          {filteredQuestions().map((index) => (
            <div
              key={index}
              className={`flex items-center justify-center m-2 text-white font-bold rounded-lg h-10 w-10 ${
                answers[index] === "answered"
                  ? "bg-green-500"
                  : answers[index] === "marked"
                  ? "bg-purple-500"
                  : answers[index] === "skipped"
                  ? "bg-red-500"
                  : "bg-gray-500"
              } ${index === questionNumber ? "border-2 border-cyan-500" : ""}`}
            >
              <div
                className="p-3 cursor-pointer"
                onClick={() => setQuestionNumber(index)}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        /* Style for thinner scrollbars */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px; /* Set width for vertical scrollbar */
          height: 8px; /* Set height for horizontal scrollbar */
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #6b7280; /* Tailwind color for bg-gray-600 */
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
}

export default Page;
