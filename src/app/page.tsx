"use client";
import * as React from "react";
import axios from "axios";
import Image from "next/image";

interface statusLetter {
  [key: string]: {
    title: string;
    color: string;
  };
}

const statusLetter: statusLetter = {
  CORRECT: { title: "DRAFT", color: "green" },
  WRONG_PLACE: { title: "REJECTED", color: "yellow" },
  DEFAULT: { title: "DEAFULT", color: "gray" },
};

interface TaskInterface {
  id: number;
  text: string;
  letters: Array<{
    letter: string;
    statusBG: string;
    statusBorder: string;
  }>;
}
[];

export default function Home() {
  const [tasks, setTasks] = React.useState<TaskInterface[]>([]);

  const [word, setWord] = React.useState<string>("");
  const [wordArray, setWordArray] = React.useState<string[]>([]);

  const [word2, setWord2] = React.useState<string>("");

  // const correctWord = ["c", "r", "a", "k", "e"];

  const getData = async () => {
    const url = `${process.env.NEXT_PUBLIC_RANDOMWORD_URL}`;

    try {
      const response = await axios.get(url, {
        params: {
          hasDictionaryDef: true,
          minLength: 5,
          maxLength: 5,
          maxCorpusCount: -1,
          minDictionaryCount: 1,
          maxDictionaryCount: -1,
          includePartOfSpeech: "noun,verb,adjective",
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      return response.data.word;
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData().then((data) => {
      setWord(data);
    });
  }, []);

  React.useEffect(() => {
    // setWordArray(changeWordToArray(word));
    setWordArray(word.split(""));
    // console.log(word.split(""));
  }, [word]);

  // React.useEffect(() => {
  //   console.log(wordArray);
  // }, [wordArray]);

  const changeWordToArray = (word: string) => {
    const array: any[] = [];
    for (let i = 0; i < word.length; i++) {
      array.push({
        letter: word[i],
        statusBG: "DEFAULT",
        statusBorder: "DEFAULT",
      });
    }

    // blankArray(array);
    // blankArray = array;
    return array;
  };

  const cek = (letters: Array<any>, correctArray: Array<any>) => {
    const arrayKosong: any[] = [];
    // console.log(wordArray);

    for (let i = 0; i < letters.length; i++) {
      if (correctArray.includes(letters[i].letter)) {
        if (letters[i].letter === correctArray[i]) {
          arrayKosong.push({
            letter: letters[i].letter,
            // status: "text-green-500",
            statusBG: "bg-green-500",
            statusBorder: "border-green-600",
          });
        } else {
          arrayKosong.push({
            letter: letters[i].letter,
            // status: "text-yellow-500",
            statusBG: "bg-yellow-500",
            statusBorder: "border-yellow-600",
          });
        }
      } else {
        arrayKosong.push({
          letter: letters[i].letter,
          // status: "text-gray-500",
          statusBG: "bg-slate-500",
          statusBorder: "border-slate-600",
        });
      }
    }

    // setWord3Array(arrayKosong);
    return arrayKosong;
  };

  function addTask(text: string) {
    if (text !== "") {
      const arrayKosong: any[] = [];
      changeWordToArray(text).map((item) => {
        arrayKosong.push(item);
      });

      const newTask = {
        id: Date.now(),
        text: text,
        letters: cek(arrayKosong, wordArray),
      };

      console.log(newTask);

      setTasks([...tasks, newTask]);
      setWord2("");
    } else {
      alert("Inputan tidak boleh kosong");
    }
  }

  // const x = "slate";

  return (
    <main>
      <section className="p-3 xl:w-[1140px] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2">
          <div>{word !== "" && <p className="uppercase">{word}</p>}</div>
          <div className="rounded-lg w-full p-2.5 border-2 border-gray-300 focus:border-rose-500 focus:outline-none">
            <input
              maxLength={word.length}
              type="text"
              className="w-full font-bold text-xl outline-none text-center"
              onChange={(e) => setWord2(e.target.value)}
              value={word2}
              required
            />
          </div>
          <button
            className="px-4 hover:bg-[#176cb7] py-2 bg-[#0589fc] active:bg-[#111826] rounded-lg uppercase text-white font-bold"
            onClick={() => addTask(word2)}
          >
            tebak
          </button>

          <div className="flex gap-1 flex-col items-center justify-center">
            <div className="flex gap-1 flex-col">
              {tasks.map((task, index) => (
                <div key={index} className="flex gap-1">
                  {task.letters.map((item, index2) => (
                    <div
                      key={index2}
                      // className={`flex font-bold text-lg ${item.status}`}
                      // className={`bg-green-500 w-[46px] flex items-center justify-center p-3 rounded-lg border-2 border-green-600`}
                      className={`${item.statusBG} ${item.statusBorder} w-[46px] flex items-center justify-center p-3 rounded-lg border-2`}
                    >
                      <div
                        className={`flex font-bold text-lg text-white uppercase`}
                      >
                        {item.letter}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* <div
            className={`bg-green-500 w-fit p-3 rounded-lg border-2 border-green-600`}
          >
            <p className={`flex font-bold text-lg text-white`}>A</p>
          </div>

          <div className="bg-slate-500 w-fit p-3 rounded-lg border-2 border-slate-600">
            <p className={`flex font-bold text-lg text-white`}>A</p>
          </div> */}

          {/* <div className="flex gap-1">
            {word3Array &&
              word3Array.map((item, index) => (
                <p key={index} className={`font-bold text-lg ${item.status}`}>
                  {item.letter}
                </p>
                // <div
                //   className={`rounded-lg w-[48px] p-2.5 border-2 border-gray-300 focus:border-rose-500 focus:outline-none bg-${
                //     statusLetter[item.status].color
                //   }-100`}
                //   key={index}
                // >
                //   <input
                //     type="text"
                //     className="w-full font-bold text-xl outline-none text-center"
                //     required
                //     placeholder={item.letter}
                //     maxLength={1}
                //   />
                // </div>
              ))}
          </div> */}
        </div>
      </section>
    </main>
  );
}
