import React, { useState, useEffect } from 'react';
import './information.css'; // Import CSS file for styling

function Guideline() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.nal.usda.gov/fdc/v1/foods/list?api_key=bhRZmxWBhR6B3A1LR2hP7Sc4ltVS0wcSOs4VkAar')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-4/5 justify-center items-start text-center md:text-left">
            <h1 className="my-4 text-5xl font-bold leading-tight">
            Healthy Guideline (WORK IN PROGESS)
            </h1>
            </div>
        </div>
    </div>
</div>
  );
}

export default Guideline;
    