"use client";
import * as React from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [word, setWord] = React.useState("crake");
  const [wordArray, setWordArray] = React.useState<string[]>([]);

  // const word2 = "acrek";
  const [word2, setWord2] = React.useState<string>("");
  const [word2Array, setWord2Array] = React.useState<string[]>([]);

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

  React.useEffect(() => {
    console.log(word2Array);
  }, [word2Array]);

  const changeWordToArray = (word: string, blankArray: any) => {
    const array: any[] = [];
    for (let i = 0; i < word.length; i++) {
      array.push(word[i]);
    }

    blankArray(array);
  };

  const handleCompareWord = () => {
    changeWordToArray(word2, setWord2Array);
  };

  return (
    <main>
      <section className="px-3 xl:w-[1140px] flex flex-col items-center justify-center">
        <div>
          {/* {word && <p>{word}</p>} */}
          {/* <div className="flex gap-1">
            {wordArray && wordArray.map((item) => <p>{item}</p>)}
          </div> */}

          <div className="rounded-lg w-full p-2.5 border-2 border-gray-300 focus:border-rose-500 focus:outline-none">
            <input
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

          {/* <div className="flex gap-1">
            {wordArray &&
              wordArray.map((item) => (
                <div className="rounded-lg w-[48px] p-2.5 border-2 border-gray-300 focus:border-rose-500 focus:outline-none">
                  <input
                    type="text"
                    className="w-full font-bold text-xl outline-none text-center"
                    required
                    placeholder={item}
                    maxLength={1}
                  />
                </div>
              ))}
          </div> */}

          {/* <div className="flex gap-1">
            <div className="rounded-lg w-[48px] p-2.5 border-2 border-gray-300 focus:border-rose-500 focus:outline-none">
              <input
                type="text"
                className="w-full font-bold text-xl outline-none text-center"
                required
                maxLength={1}
              />
            </div>
          </div> */}
        </div>
      </section>
    </main>
  );
}
