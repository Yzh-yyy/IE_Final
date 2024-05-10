import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import { Carousel, Button, Modal } from 'antd';
import Transcript from './Transcript'
import { CloseCircleOutlined } from '@ant-design/icons';

import './FruitQuiz.css'; // Import the CSS file for styling

import pic5 from '../assets/left-btn.png'
import pic6 from '../assets/right-btn.png'


const Quiz = React.forwardRef((data, ref) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const myRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showResult, setShowResult] = useState(false);

  useImperativeHandle(
    ref,
    () => ({ showModal, isModalOpen })
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset()
  };

  const reset = () => {
    setShowResult(false)
    setCurrentQuestion(0)
    setAnswers([])
    myRef?.current?.goTo?.(0)
  }

  const handleOptionClick = (value, flag) => {
    setAnswers(prevState => {
      return {
        ...prevState,
        [`q${currentQuestion}`]: value === flag
      }
    })
  };

  useEffect(() => {
    if (Object.keys(answers).length === data.quizData.length) {
      setTimeout(() => {
        let params = JSON.parse(sessionStorage.getItem('answers'))
        sessionStorage.setItem('answers', JSON.stringify({
          ...params,
          [data.type]: answers
        }))
        setShowResult(true)
      }, 2000)
    }
  }, [answers])

  return (
    <>
      <Modal destroyOnClose={true} maskClosable={false} width={800} open={isModalOpen} onCancel={handleCancel} footer={null} closeIcon={<CloseCircleOutlined />}>
        {
          !showResult && <>
            <div className="swiper">
              <div className="swiperInner" >
                <div className="leftIcon sameicon" onClick={() => { myRef?.current?.prev?.() }}>
                  <img src={pic5} alt="" />
                </div>
                <div className="rightIcon sameicon" onClick={() => { myRef?.current?.next?.() }}>
                  <img src={pic6} alt="" />
                </div>
                <Carousel dotPosition='bottom' ref={myRef} infinite={false} afterChange={setCurrentQuestion}>
                  {data.quizData?.map((item, index) => (
                    <div className="swiperItem" key={index}>
                      <div className="container">
                        <div className="question">
                          <p>{item.QuestionText}</p>
                          <div className='options'>
                            <Button
                              type="dashed"
                              disabled={index === currentQuestion && answers[`q${currentQuestion}`]}
                              onClick={() => handleOptionClick('A', item.CorrectAnswer)}
                              className={index === currentQuestion && answers[`q${currentQuestion}`] !== undefined ? answers[`q${currentQuestion}`] && item.CorrectAnswer === "A" ? 'selected' : !answers[`q${currentQuestion}`] && item.CorrectAnswer === "A" ? 'selected ' : 'selected incor' : ''}
                            >
                              A: {item.OptionA}
                            </Button>
                            <Button
                              type="dashed"
                              disabled={index === currentQuestion && answers[`q${currentQuestion}`]}
                              onClick={() => handleOptionClick('B', item.CorrectAnswer)}
                              className={index === currentQuestion && answers[`q${currentQuestion}`] !== undefined ? answers[`q${currentQuestion}`] && item.CorrectAnswer === "B" ? 'selected' : !answers[`q${currentQuestion}`] && item.CorrectAnswer === "B" ? 'selected ' : 'selected incor' : ''}
                            >
                              B: {item.OptionB}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            {
              typeof answers[`q${currentQuestion}`] === 'boolean' ? (
                <div className='result'>
                  {
                    answers[`q${currentQuestion}`] ? (<div className='right'> you are right </div>) : (<div className='wrong'>you are wrong</div>)
                  }
                </div>
              )
                : null
            }
          </>
        }
        {
          showResult && <Transcript result={answers} reset={reset} back={handleCancel} />
        }
      </Modal>
    </>
  );
})


export default Quiz