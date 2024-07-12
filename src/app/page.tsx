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

export default function Home() {
  const [word, setWord] = React.useState("crake");
  const [wordArray, setWordArray] = React.useState<string[]>([]);

  // const word2 = "acrek";
  const [word2, setWord2] = React.useState<string>("");
  const [word2Array, setWord2Array] = React.useState<string[]>([]);

  const [word3Array, setWord3Array] = React.useState<any[]>([]);
  const y = ["c", "r", "a", "k", "e"];

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
    // getData().then((data) => {
    //   setWord(data);
    // });
    changeWordToArray(word, setWordArray);
  }, []);

  const cek = (x: any) => {
    const arrayKosong: any[] = [];

    for (let i = 0; i < x.length; i++) {
      if (y.includes(x[i].letter)) {
        if (x[i].letter === y[i]) {
          // x[i].status = "CORRECT";
          arrayKosong.push({
            letter: x[i].letter,
            status: "text-green-500",
          });
        } else {
          // x[i].status = "WRONG_PLACE";
          arrayKosong.push({
            letter: x[i].letter,
            status: "text-yellow-500",
          });
        }
      } else {
        // x[i].status = "DEFAULT";
        arrayKosong.push({
          letter: x[i].letter,
          status: "text-gray-500",
        });
      }
    }

    // console.log(arrayKosong);
    setWord3Array(arrayKosong);
  };

  React.useEffect(() => {
    cek(word2Array);
  }, [word2Array]);

  React.useEffect(() => {
    console.log(word3Array);
  }, [word3Array]);

  const changeWordToArray = (word: string, blankArray: any) => {
    const array: any[] = [];
    for (let i = 0; i < word.length; i++) {
      array.push({
        letter: word[i],
        status: "DEFAULT",
      });
    }

    blankArray(array);
  };

  const handleCompareWord = () => {
    setWord3Array([]);
    changeWordToArray(word2, setWord2Array);
  };

  return (
    <main>
      <section className="px-3 xl:w-[1140px] flex flex-col items-center justify-center">
        <div>
          <div className="rounded-lg w-full p-2.5 border-2 border-gray-300 focus:border-rose-500 focus:outline-none">
            <input
              maxLength={y.length}
              type="text"
              className="w-full font-bold text-xl outline-none text-center"
              onChange={(e) => setWord2(e.target.value)}
              required
            />
          </div>
          <button
            className="px-4 py-2 bg-rose-500 active:bg-rose-700 rounded-lg"
            onClick={handleCompareWord}
          >
            tes
          </button>

          <div className="flex gap-1">
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
          </div>
        </div>
      </section>
    </main>
  );
}
