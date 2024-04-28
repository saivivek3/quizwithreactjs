function generateRandomOptions(options: any) {
  return options.sort(function (a: any, b: any) {
    return Math.random() - 0.5;
  });
}

function generateOptions(data: any, answer: any, updData: any) {
  const options: any = [];
  const generateAnswers = Array.from({ length: 3 }, (_: any, index: number) => {
    return {
      id: index,
      option: data[Math.floor(Math.random() * data.length)]?.capital[0],
      correctAnswer: updData?.capital[0],
    };
  });
  options.push(...generateAnswers, {
    id: 3,
    option: answer,
    correctAnswer: answer,
  });
  return generateRandomOptions(options);
}

export function generateQuestionAndAnswer(data: any, randomArr: any) {
  const updatedData = randomArr.map((rarr: any) => data[rarr]);
  return updatedData.map((updData: any) => ({
    question: `What is the capital of ${updData.name.common}`,
    allOptions: generateOptions(data, updData?.capital[0], updData),
  }));
}
