import React from 'react';
import { Statistic } from 'antd'; // Import Ant Design components
import { FaPerson, FaPersonArrowUpFromLine } from "react-icons/fa6";
import { GiFruitBowl, GiWrappedSweet, GiSodaCan, GiRun } from "react-icons/gi";
import './information.css'; // Import CSS file for styling


const StatisticsCards = () => {
    return (
      <div className="first_page">
          <div className="card-container">
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <Statistic
                    title="Childhood Obesity"
                    value={25}
                    suffix="%"
                    prefix={<FaPerson />}
                    valueStyle={{ fontSize: '34px' }}
                  />
                </div>
                <div className="card-back">
                  <p>25% overweight or obese (5-17 years)</p>
                </div>
              </div>
            </div>
  
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <Statistic
                    title="Healthy Eating Habits"
                    value={6}
                    suffix="%"
                    prefix={<GiFruitBowl />}
                    valueStyle={{ fontSize: '34px' }}
                  />
                </div>
                <div className="card-back">
                  <p>6% meet fruit and veg recommendations</p>
                </div>
              </div>
            </div>
  
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <Statistic
                    title="Sugar Awareness"
                    value={9}
                    suffix="%"
                    prefix={<GiWrappedSweet />}
                    valueStyle={{ fontSize: '34px' }}
                  />
                </div>
                <div className="card-back">
                  <p>9% adults, 7% children drink sugary drinks daily</p>
                </div>
              </div>
            </div>
  
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <Statistic
                    title="Drink Smart"
                    value={45}
                    suffix="%"
                    prefix={<GiSodaCan />}
                    valueStyle={{ fontSize: '34px' }}
                  />
                </div>
                <div className="card-back">
                  <p>45% children consume sugary or diet drinks weekly (2-17 years)</p>
                </div>
              </div>
            </div>
  
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <Statistic
                    title="Physical Activity"
                    value={17}
                    suffix="%"
                    prefix={<GiRun />}
                    valueStyle={{ fontSize: '34px' }}
                  />
                </div>
                <div className="card-back">
                  <p>Only 16.6% of children were doing sufficient physical activity</p>
                </div>
              </div>
            </div>
  
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <Statistic
                    title="Living with obesity"
                    value={36}
                    suffix="%"
                    prefix={<FaPersonArrowUpFromLine />}
                    valueStyle={{ fontSize: '34px' }}
                  />
                </div>
                <div className="card-back">
                  <p>35.7% of Australians aged 2 to 17 years in outer regional and remote Australia were living with overweight or obesity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default StatisticsCards;