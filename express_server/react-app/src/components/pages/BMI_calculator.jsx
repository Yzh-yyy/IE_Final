import React, { useState } from 'react';
import { Button } from 'antd'; // Import Ant Design components
import './information.css'; // Import CSS file for styling
import './bmi.css';
    

const BMICalculator= () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiValue, setBMIValue] = useState(null);
    const [bmiCategory, setBMICategory] = useState('');
  
    const calculateBMI = () => {
      if (height && weight) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBMIValue(bmi);
  
        let category = '';
        if (bmi < 18.5) {
          category = 'underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
          category = 'normal';
        } else if (bmi >= 25 && bmi < 30) {
          category = 'overweight';
        } else {
          category = 'obese';
        }
        setBMICategory(category);
      } else {
        setBMIValue('');
        setBMICategory('');
      }
    };
  
    return (
      <div className={`bmi-calculator-box ${bmiCategory}`}>
        <h2 className="sub-header" style={{ fontSize: "23px" }}>Calculate Your BMI</h2>
        <div className="input-container">
          <label htmlFor="height">Enter Your Height (cm):</label>
          <input
            type="number"
            placeholder="Enter your height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="weight">Enter Your Weight (kg):</label>
          <input
            type="number"
            placeholder="Enter your weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-field"
          />
        </div>
        <Button type="primary" onClick={calculateBMI} className="calculate-button">
          Calculate
        </Button>
        {bmiValue && (
          <div className="result_bmi">
            <p>
              Your BMI: <span className="bmi-value">{bmiValue}</span>
            </p>
            <p className="bmi-category">
              Result: You are <span className="bmi-message">{bmiCategory}</span> weight
            </p>
          </div>
        )}
      </div>
    );
  };
  
    
const BMICal = () => (
    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                <h1 className="my-4 text-5xl font-bold leading-tight">
                Calculate Your BMI
                </h1>
                <p className="leading-normal text-2xl mb-8">

                Assessing your health status is a very important step in understanding your overall well-being.
                By calculating your Body Mass Index (BMI), you can gain valuable insights into whether your weight falls within a healthy range for your height.
                <br />
                <br />
                Regularly monitoring your child's BMI can serve as a proactive measure in maintaining optimal health and preventing potential health complications associated with weight-related issues.
                </p>
                <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Want to learn more?
                </button>
            </div>
            <div className="w-full md:w-3/5 py-6 text-center">
                <BMICalculator />
            </div>
        </div>
    </div>

);

export default BMICal;