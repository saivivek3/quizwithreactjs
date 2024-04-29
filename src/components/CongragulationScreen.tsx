import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import CongratsIcon from "../assets/congrats.svg";
import { supabase } from "../createClient";

function CongragulationScreen({ score, setQuizIndex, setScore }: any) {
  const [quizScoreData, setQuizScoreData] = useState<any>([]);

  async function getQuizScore() {
    const { data } = await supabase.from("quiz").select();
    setQuizScoreData(data?.sort((a, b) => b.score - a.score));
  }

  useEffect(() => {
    getQuizScore();
  }, []);

  return (
    <Layout maxWidth="max-w-lg" padding="p-11">
      <div className="flex flex-col justify-center items-center gap-6 ">
        <img src={CongratsIcon} />

        <h1 className="text-[#E2E4F3] text-3xl  font-semibold text-center">
          Congrats! You completed the quiz.
        </h1>
        <p className="text-[#E2E4F3]  text-xl">
          You answer {score}/10 correctly.
        </p>
        <button
          className="bg-gradient-to-r from-pink-500 to-purple-500 px-14 py-6 rounded-lg  font-medium text-xl text-[#E2E4F3]"
          onClick={() => {
            setQuizIndex(0);
            setScore(0);
          }}
        >
          Play Again
        </button>
        <h1 className="text-[#E2E4F3] text-3xl  font-semibold text-center">
          Your scores with Opponents......
        </h1>
        <div className="overflow-y-auto h-[600px] w-auto">
          <table>
            <thead className="bg-white border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {quizScoreData.map((qizData: any, index: any) => (
                <tr className="bg-white border-b">
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {qizData.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {qizData.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default CongragulationScreen;
