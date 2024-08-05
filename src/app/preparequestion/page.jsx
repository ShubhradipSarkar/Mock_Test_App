"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Page() {
  const [questions, setQuestions] = useState(0);
  const [examName, setExamName] = useState("");
  const [submitName, setsubmitName] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [optionValue, setOptionValue] = useState("");
  const [createAnOption, setcreateAnOption] = useState(false);
  const [questionBody, setquestionBody] = useState("");
  const [options, setoptions] = useState([]);
  const [questionSet, setQuestionSet] = useState([]);

  // New state to store the index of the correct option
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  const pushOptionsToQuestion = (optionValue) => {
    setoptions((prevOptions) => [
      ...prevOptions,
      { text: optionValue, isCorrect: false },
    ]);
    setOptionValue(""); // Clear the input after pushing
  };

  const markOptionAsCorrect = (index) => {
    // Toggle the isCorrect property and set the correctOptionIndex
    setoptions((prevOptions) =>
      prevOptions.map((option, optIndex) => ({
        ...option,
        isCorrect: optIndex === index ? !option.isCorrect : false, // Toggle the selected option's state
      }))
    );
    setCorrectOptionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const pushQuestionToSet = () => {
    if (questionBody.trim() !== "" && options.length > 0) {
      // Add question and options to the questionSet
      setQuestionSet((prevSet) => [
        ...prevSet,
        { question: questionBody, options },
      ]);
      // Reset inputs for new question
      setquestionBody("");
      setoptions([]);
      setQuestionNumber((prevNumber) => prevNumber + 1);
      setCorrectOptionIndex(null); // Reset correct option index
    }
  };

  return (
    <div className="bg-slate-100 flex min-h-screen">
      {/* Sidebar Column */}
      <div className="h-screen bg-stone-950 w-56 overflow-y-auto">
        <Sidebar />
      </div>

      {/* Middle Column */}
      <div className="w-1/3 text-black h-screen overflow-y-auto mt-4 flex flex-col pl-4">
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2">Prepare questions for class</h2>
          <select className="w-32">
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
            <option value="class4">Class 4</option>
            <option value="class5">Class 5</option>
          </select>
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2">Choose subject</h2>
          <select className="w-32">
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="mathematics">Mathematics</option>
            <option value="evs">Evs</option>
            <option value="computer">Computer</option>
          </select>
        </div>
        <div className="w-80">
          <h2 className="font-bold text-lg mb-2">Give a name to your new exam</h2>
          <div className="flex items-center">
            <input
              type="text"
              onChange={(e) => {
                setExamName(e.target.value);
              }}
              className="border-2 text-bold border-cyan-500 rounded w-56 h-10 m-1"
              placeholder="Example - LCM test"
            />
            {examName && (
              <button
                onClick={() => {
                  setsubmitName(true);
                }}
                className="h-10 m-1 p-2 bg-cyan-500 font-bold text-white rounded hover:bg-cyan-600"
              >
                Create
              </button>
            )}
          </div>
        </div>
        {submitName && (
          <div className="flex mt-8 flex-col justify-center items-center bg-slate-200 rounded p-4 text-cyan-800">
            <div className="font-bold text-xl ">{examName}</div>
            <div>
              <div className="flex flex-row flex-wrap">
                <div className="m-2">Q.{questionNumber}{")"} </div>
                <textarea
                  type="text"
                  placeholder="Write your question here..."
                  className="rounded w-80 m-2 p-1 border-2 border-cyan-800 text-md "
                  value={questionBody}
                  onChange={(e) => {
                    setquestionBody(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row mt-3 gap-2">
                Create option{" "}
                <div
                  className="font-bold flex justify-center items-center text-xl text-white bg-cyan-500 hover:bg-cyan-400 cursor-pointer h-6 w-6"
                  style={{ borderRadius: "50%" }}
                  onClick={() => {
                    setcreateAnOption(!createAnOption);
                  }}
                >
                  +
                </div>
              </div>
              {createAnOption && (
                <div className="m-2 flex flex-row gap-2">
                  <input
                    value={optionValue}
                    onChange={(e) => setOptionValue(e.target.value)}
                    className="h-8 w-32 border-2 border-cyan-800 rounded"
                  />
                  <button
                    className="bg-cyan-600 hover:bg-cyan-500 rounded p-1 text-white"
                    onClick={() => pushOptionsToQuestion(optionValue)}
                  >
                    Add option
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center">
                  Option {index + 1})
                  <div className="flex-1 flex w-48 m-1 bg-white justify-center items-center shadow-md rounded">
                    {option.text}
                  </div>
                  <button
                    onClick={() => markOptionAsCorrect(index)}
                    className={`text-white p-1 rounded-full mr-2 ${
                      option.isCorrect ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {option.isCorrect ? "Correct" : "Wrong"}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="rounded bg-cyan-700 text-white p-2 m-2 w-full hover:bg-cyan-500"
              onClick={pushQuestionToSet}
            >
              Push in question set
            </button>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="flex-1 mx-2 text-black h-screen overflow-y-auto flex flex-col p-4">
        <div className="font-bold text-xl mb-4">Preview</div>
        {submitName && (
          <div className="flex mt-4 flex-col text-cyan-800">
            <div className="">
              <div className="flex flex-row flex-wrap">
                <div className="m-2">Q.{questionNumber}{")"} </div>
                <div className="m-2 text-cyan-700 font-bold text-xl">
                  {questionBody}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                  <div key={index} className="flex flex-row">
                    <div
                      className="h-6 w-6 bg-slate-500 text-white rounded-lg flex justify-center mt-3"
                      style={{ borderRadius: "50%" }}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`flex shadow-md flex-col m-1 p-2 w-80 rounded ${
                        option.isCorrect ? "bg-green-300" : "bg-cyan-300"
                      } text-cyan-800`}
                    >
                      {option.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Render the questionSet */}
        <h2 className="font-bold text-xl mt-8 mb-4">Question Set</h2>
        {questionSet.length > 0 && (
          <div className="mt-8 m-2">
            {questionSet.map((question, index) => (
              <div
                key={index}
                className="mb-6 p-4 bg-gray-200 rounded shadow-md"
              >
                <div className="font-bold mb-2">
                  Q.{index + 1}) {question.question}
                </div>
                <div className="flex flex-col gap-1">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex flex-row">
                      <div
                        className="bg-slate-500 text-white flex justify-center items-center h-6 w-6 my-2"
                        style={{ borderRadius: "50%" }}
                      >
                        {optIndex + 1}
                      </div>
                      <div
                        className={`flex flex-row flex-wrap h-10 rounded p-2 ml-4 w-80 ${
                          option.isCorrect ? "bg-green-300" : "bg-white"
                        } shadow-md`}
                      >
                        {option.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full bg-pink-600 mx-2 hover:bg-pink-500 rounded text-white p-3">
              Publish Question Paper
            </button>
          </div>
        )}
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
