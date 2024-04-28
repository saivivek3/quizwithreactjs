import { useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import Error from "./Error";
import { generateQuestionAndAnswer } from "../utils/generateQuestionAndAnswers";

import RightIcon from "../assets/Check_round_fill.svg";
import WrongIcon from "../assets/Close_round_fill.svg";
import Layout from "../layout/Layout";
import CongragulationScreen from "./CongragulationScreen";
import { supabase } from "../createClient";

function QuizCard() {
  const { data, loading, error } = useFetch();
  const [quizIndex, setQuizIndex] = useState<any>(0);
  const [quizData, setQuizData] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isWrongAnswer, setIsWrongAnswer] = useState<any>(false);
  const [isAlreadySelected, setIsAlreadySelected] = useState<any>(false);
  const [score, setScore] = useState(false);
  const [name, setName] = useState<any>("");

  const havingCapitalDataUpdatdArr = data.filter((country: any) => {
    return Boolean(country.capital?.[0]);
  });
  const generatedRandomNumbers = useMemo(() => {
    return Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * havingCapitalDataUpdatdArr.length)
    );
  }, [havingCapitalDataUpdatdArr]);

  useEffect(() => {
    if (havingCapitalDataUpdatdArr.length > 0)
      setQuizData(
        generateQuestionAndAnswer(
          havingCapitalDataUpdatdArr,
          generatedRandomNumbers
        )
      );
  }, [data]);

  useEffect(() => {
    setSelectedIndex(null);
    setIsWrongAnswer(null);
    setIsAlreadySelected(false);
  }, [quizIndex]);

  useEffect(() => {
    if (selectedIndex || selectedIndex === 0) {
      setIsWrongAnswer(true);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (quizIndex === 9) postData();
  }, [quizIndex]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  console.log({ quizData });

  const handleSelected = (allOption: any) => {
    if (allOption.option === allOption.correctAnswer) {
      setScore((prevScore: any) => prevScore + 1);
    }
    setSelectedIndex(allOption.id);
    setIsAlreadySelected(true);
  };

  function renderIcon(allOption: any) {
    console.log(allOption.correctAnswer, "allOption.correctAnswer");
    if (selectedIndex === allOption.id) {
      if (allOption.option === allOption.correctAnswer) {
        return <img src={RightIcon} className="size-8 sm:size-5" />;
      } else {
        return <img src={WrongIcon} className="size-8  sm:size-5" />;
      }
    }
    // console.log(isWrongRef, "iswrongref");
    if (isWrongAnswer) {
      if (allOption.option === allOption.correctAnswer) {
        return <img src={RightIcon} className="size-6" />;
      }
    }
  }

  const handleNext = () => {
    setQuizIndex((prevQuizIndex: any) => prevQuizIndex + 1);
  };

  async function postData() {
    const { data, error } = await supabase.from("quiz").insert({ name, score });

    if (error) {
      console.error("Error posting data:", error);
      return;
    }
    console.log("Data posted successfully:", data);
  }

  if (quizIndex === 10) {
    // Post the data to the table
    return (
      <CongragulationScreen
        score={score}
        setQuizIndex={setQuizIndex}
        name={name}
      />
    );
  }

  return (
    <Layout maxWidth="max-w-5xl" padding="p-8">
      <div className="text-center flex justify-center items-center gap-4 mb-7">
        <label
          htmlFor="first_name"
          className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center"
        >
          Your Name
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[200px]"
          placeholder="Please Enter Your Name..."
          required
          onChange={(event: any) => setName(event?.target.value)}
        />
      </div>
      <div className=" flex flex-col items-center gap-6">
        <h1 className="text-[#8B8EAB] font-bold ">Country Quiz</h1>
        <div className="flex  flex-wrap justify-center items-center gap-2 sm:gap-4 ">
          {generatedRandomNumbers.map((_, index: number) => {
            return (
              <div
                className={`rounded-full w-12 h-12 cursor-pointer flex justify-center items-center  text-[#E2E4F3] font-bold text-sm ${
                  quizIndex === index
                    ? "bg-gradient-to-r from-pink-500 to-purple-500"
                    : "bg-[#393F6E]"
                } lg:text-lg md:text-base sm:text-sm`}
                key={index}
              >
                {" "}
                {index + 1}
              </div>
            );
          })}
        </div>
        <h1 className="text-[#E2E4F3] text-2xl mb-3">
          {quizData[quizIndex]?.question}
        </h1>
        <div className="grid grid-cols-2 gap-2 sm:gap-8">
          {quizData[quizIndex]?.allOptions.map((allOption: any) => (
            <button
              className="bg-[#393F6E] text-[#E2E4F3] font-bold   text-sm w-full p-6 flex justify-center flex-1 rounded-lg  cursor-pointer hover:bg-gradient-to-r from-pink-500 to-purple-500  lg:text-lg md:text-base sm:text-sm"
              onClick={() => handleSelected(allOption)}
              disabled={isAlreadySelected}
            >
              <div className="flex justify-center items-center gap-4 ">
                {allOption.option} <div>{renderIcon(allOption)}</div>{" "}
              </div>
            </button>
          ))}
        </div>
        <div className="self-end">
          <button
            className=" text-sm bg-gradient-to-r from-pink-500 to-purple-500 p-5 rounded-lg  font-medium text-[#E2E4F3] lg:text-lg md:text-base sm:text-sm "
            disabled={selectedIndex === null}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default QuizCard;
