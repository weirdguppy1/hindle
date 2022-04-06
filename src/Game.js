import React, { useContext, useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GameContext } from "./contexts/GameContext.js";

const Game = () => {
  const { game, input, attempts, handleUserKeyPress, hints } =
    useContext(GameContext);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start text-lg">
        <h3>{attempts} attempts so far.</h3>
        <h3
          className={
            game.guessedWord === false
              ? "text-red-700 animate-pulse"
              : "text-green-500"
          }
        >
          {game.gameMessage}
        </h3>
      </div>
      {game.gameOver ? (
        "GAME ENDED."
      ) : (
        <>
          <div id="container" className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-24 h-24 p-10 border-2 border-gray-500 rounded-lg">
              <span className="max-w-full font-mono text-2xl">
                {input.at(0)}
              </span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 p-10 border-2 border-gray-500 rounded-lg">
              <span className="max-w-full font-mono text-2xl">
                {input.at(1)}
              </span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 p-10 border-2 border-gray-500 rounded-lg">
              <span className="max-w-full font-mono text-2xl">
                {input.at(2)}
              </span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 p-10 border-2 border-gray-500 rounded-lg">
              <span className="max-w-full font-mono text-2xl">
                {input.at(3)}
              </span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 p-10 border-2 border-gray-500 rounded-lg">
              <span className="max-w-full font-mono text-2xl">
                {input.at(4)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start max-w-lg mt-10">
            {hints.map((element, index) => {
              return (
                <h2 key={index}>
                  {index + 1}. {index <= attempts ? element : null}
                </h2>
              );
            })}
          </div>
        </>
      )}

      <Toaster />
    </div>
  );
};

export default Game;
