
import { useEffect } from 'react';
import { useState } from 'react'
import '../pages/MemoryGame.css'
import Card from '../pages/MemoryCard'

function MemoryGame() {
  const [cards, setCards] = useState(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [timeLeft, setTimeLeft] = useState(90);  // 添加一个新的状态来跟踪剩余时间
  const [gameOver, setGameOver] = useState(false);  // 追踪游戏是否结束
  const [win, setWin] = useState(false); // 新增状态追踪是否获胜

  const items = [
  {
    emoji: "👇",
    id: "1",
    matchFound: false,
    flipped: false,
  },
  {
    emoji: "👀",
    id: "2",
    matchFound: false,
    flipped: false,
  },
  {
    emoji: "🙌",
    id: "3",
    matchFound: false,
    flipped: false,
  },
  {
    emoji: "👋",
    id: "4",
    matchFound: false,
    flipped: false,
  },
  {
    emoji: "🙏",
    id: "5",
    matchFound: false,
    flipped: false,
  },
  {
    emoji: "🤔",
    id: "6",
    matchFound: false,
    flipped: false,
  },
  {
    emoji: "🤦‍♂️",
    id: "7",
    matchFound: false,
    flipped: false,
  },
 {
   emoji: "😔",
   id: "8",
   matchFound: false,
   flipped: false,
 }
];

  function resetCards(){
    const shuffled = [...items,...items]
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, key: Math.random()}))
    setCards(shuffled)
  }

  function handleCardClick(e){
    firstSelection
      ? setSecondSelection(e.target.dataset.id)
      : setFirstSelection(e.target.dataset.id);
    // to do: handle duplicated single card click
  }

  function resetTurn(){
    setFirstSelection(null);
    setSecondSelection(null);
    setMoves(m => m + 1);
    setDisabled(false)
  }

  function handleNewGameClick(){
    resetTurn();
    setMoves(0);
    setScore(0);
    resetCards()
  }


  useEffect(() => {
    if(!secondSelection){return}
    setDisabled(true)
    if(firstSelection === secondSelection){
      setCards(prev => {
        return prev.map(card => {
          if(card.id === firstSelection){
            return {...card, matchFound: true}
          } else {
            return card;
          }
        })
      })
      setScore(prev => prev + 1);
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }, [firstSelection, secondSelection])

    // 添加定时器逻辑
    // useEffect(() => {
    //   if (timeLeft > 0 && !gameOver) {
    //     const timerId = setTimeout(() => {
    //       setTimeLeft(timeLeft - 1);
    //     }, 1000);
    //     return () => clearTimeout(timerId);
    //   } else if (timeLeft === 0 || score === 8) {
    //     checkGameOver();
    //   }
    // }, [timeLeft, gameOver, score]);
    // // 检查游戏是否应该结束
    // const checkGameOver = () => {
    //   setDisabled(true);  // 禁用卡片点击
    //   if (score < 8) {
    //     setGameOver(true);
    //   } else {
    //     setWin(true); // 设置胜利状态
    //   }
    // };
    useEffect(() => {
      if (score === 8) {
        setWin(true); // 如果得分达到8，设置胜利状态
        setDisabled(true); // 禁用所有卡片
        setTimeLeft(0); // 可以将时间设置为0或停止计时器
      }
    }, [score]); // 依赖于分数的变化
  
    useEffect(() => {
      if (timeLeft > 0 && !win) {
        const timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      } else if (timeLeft === 0) {
        checkGameOver();
      }
    }, [timeLeft, win]);
  
    const checkGameOver = () => {
      if (!win) { // 仅在未赢得游戏时检查是否输了游戏
        setGameOver(true);
        setDisabled(true);
      }
    };
  
  // 重新开始游戏
  const resetGame = () => {
    setScore(0);
    setMoves(0);
    setTimeLeft(90);
    setGameOver(false);
    setWin(false);
    setDisabled(false);
    resetCards();
  };


  
//原有的
  useEffect(() => {
    resetCards()
  }, [])



  return (
    <div className="MG">
      <div className="header">
        <p>Time Left: {timeLeft}s</p>
        <p>Total Score: {score}</p>
      </div>
      <div>
      {gameOver && !win && ( // 仅在输掉游戏时显示
        <div className="modal">
          <p>You are lose</p>
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}
      {win && ( // 当赢得游戏时显示
        <div className="modal">
          <p>恭喜你</p>
          <button onClick={resetGame}>Play Again</button>
          <button onClick={resetGame}>Quit</button>
        </div>
      )}
      </div>
      <div className="gameboard">
        {cards && cards.map((card) => (
          <Card
            key={card.key}
            card={card}
            disabled={disabled || gameOver || win}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {/* {gameOver && (
        <div className="modal">
          <p>You are lose</p>
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}
      {win && (
        <div className="modal">
          <p>恭喜你</p>
          <button onClick={resetGame}>Play Again</button>
          <button onClick={resetGame}>Quit</button>
        </div>
      )} */}
      
    </div>
  )
}

export default MemoryGame
