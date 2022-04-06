import { createContext, useState } from "react";
import words from "../game.json";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const wordList = words.words;
  const wordIndex = Math.floor(Math.random() * wordList.length);

  const [WORD_LENGTH] = useState(5);
  const [WORD_ATTEMPS] = useState(5);

  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);

  const [correctWord] = useState(wordList[wordIndex].word.toUpperCase());
  const [hints] = useState(wordList[wordIndex].hints);
  const [game, setGame] = useState({ guessedWord: null, gameMessage: "", gameOver: false});

  const onEnter = () => {
    if (input.length !== WORD_LENGTH) return;
    
    setInput("");
    setAttempts((attempt) => attempt + 1);
    const wordIsCorrect = correctWord === input;

    if (wordIsCorrect) {
      setGame({ guessedWord: true, gameMessage: "Great job!", gameOver: true });
    }

    if (!wordIsCorrect) {
      setGame({ guessedWord: false, gameMessage: "Wrong answer!", gameOver: false});
      if (attempts === WORD_ATTEMPS) {
        setGame({ guessedWord: false, gameMessage: `The word was ${correctWord}`, gameOver: true});
        return;
      }
    }
  };

  const onDelete = () => {
    if (input.length === 0) return;
    const newInput = input.slice(0, -1);
    setInput(newInput);
  };

  const onAdd = (key) => {
    if (input.length === WORD_LENGTH) return;
    setInput((input) => input + key.toUpperCase());
  };

  const handleUserKeyPress = (event) => {
    const { key, keyCode } = event;

    if (keyCode === 8) {
      console.log("delete");
      onDelete();
    }

    if(keyCode === 13){
      console.log("enter")
      onEnter();
    }

    if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
      console.log(key);
      onAdd(key);
    }
  };

  return (
    <GameContext.Provider
      value={{ onEnter, onAdd, onDelete, game, hints, input, handleUserKeyPress, attempts }}
    >
      {children}
    </GameContext.Provider>
  );
};
