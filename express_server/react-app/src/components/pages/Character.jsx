import React, { useState, useEffect } from 'react';

function Character({ src }) {
  const [position, setPosition] = useState(0);
  // 新增状态来跟踪是否应该翻转图像
  const [shouldFlip, setShouldFlip] = useState(false);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'a': // 向左移动时翻转图像
        setPosition(currentPosition => currentPosition - 10);
        setShouldFlip(true);
        break;
      case 'd': // 向右移动时取消翻转
        setPosition(currentPosition => currentPosition + 10);
        setShouldFlip(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const flipStyle = shouldFlip ? { transform: `translate(calc(-50% + ${position}px), -50%) scaleX(-1)` } : { transform: `translate(calc(-50% + ${position}px), -50%)` };

  return <img className="fixedImg" src={src} style={flipStyle} alt="Character" />;
}

export default Character;
