import { ReactSketchCanvas } from "react-sketch-canvas";
import { useRef, useState } from "react";
import axios from 'axios';

const ITEMS = {
    0: 'Apple', 1: 'Banana', 2: 'Grapes', 3: 'Pineapple', 4: 'Asparagus',
    5: 'Blackberry', 6: 'Blueberry', 7: 'Mushroom', 8: 'Onion', 9: 'Peanut',
    10: 'Pear', 11: 'Peas', 12: 'Potato', 13: 'Steak', 14: 'Strawberry'
};

export default function Sketch() {
    const canvasRef = useRef(null);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [round, setRound] = useState(1);

    const startNextRound = () => {
        setRound(round + 1);
        setPrediction(null);
        setError(null);
    };

    const handlePenClick = () => {
        setEraseMode(false);
        canvasRef.current?.eraseMode(false);
    };

    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(+event.target.value);
    };

    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
    };

    const handleEraserWidthChange = (event) => {
        setEraserWidth(+event.target.value);
    };

    const handleClearCanvas = () => {
        canvasRef.current.clearCanvas();
    };

    const handleUploadImage = () => {
        canvasRef.current
            .exportImage("png")
            .then((data) => {
                // Send image data to the server
                axios.post('/getPrediction', { imageData: data })
                    .then(response => {
                        const predictedItem = response.data.prediction;
                        if (predictedItem === ITEMS[round - 1]) {
                            setPrediction(predictedItem);
                            setError(null);
                            if (round < 3) {
                                startNextRound();
                            } else {
                                // Game completed
                                console.log('Congratulations! Game completed.');
                            }
                        } else {
                            setError(`Incorrect prediction: ${predictedItem}, try again!`);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching prediction:', error);
                        setError('Error fetching prediction');
                    });
            })
            .catch((error) => {
                console.error('Error exporting image:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex items-center">
                <div className="mr-4 border border-gray-400 rounded-lg">
                    <ReactSketchCanvas
                        ref={canvasRef}
                        width="800px"
                        height="500px"
                        strokeWidth={strokeWidth}
                        eraserWidth={eraserWidth}
                        strokeColor="#000000"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center mb-4">
                        <button
                            type="button"
                            className={`btn btn-sm rounded-lg px-3 py-1 ${eraseMode ? 'btn-outline-primary' : 'bg-gradient-to-r from-cyan-300 to-blue-900 text-white'} ${eraseMode && 'text-primary'}`}
                            disabled={!eraseMode}
                            onClick={handlePenClick}
                        >
                            Pen
                        </button>
                        <input
                            disabled={eraseMode}
                            type="range"
                            className="form-range w-20"
                            min="1"
                            max="20"
                            step="1"
                            id="strokeWidth"
                            value={strokeWidth}
                            onChange={handleStrokeWidthChange}
                        />
                    </div>
                    <div className="flex gap-2 items-center mb-4">
                        <button
                            type="button"
                            className={`btn btn-sm rounded-lg px-3 py-1 ${eraseMode ? 'bg-gradient-to-r from-cyan-300 to-blue-900 text-white' : 'btn-outline-primary text-primary'}`}
                            disabled={eraseMode}
                            onClick={handleEraserClick}
                        >
                            Eraser
                        </button>
                        <input
                            disabled={!eraseMode}
                            type="range"
                            className="form-range w-20"
                            min="1"
                            max="20"
                            step="1"
                            id="eraserWidth"
                            value={eraserWidth}
                            onChange={handleEraserWidthChange}
                        />
                    </div>
                    <button
                        onClick={handleUploadImage}
                        className="btn btn-primary mr-2"
                    >
                        Upload Image & Get Prediction
                    </button>
                    <button
                        onClick={handleClearCanvas}
                        className="btn btn-secondary"
                    >
                        Clear Canvas
                    </button>
                    {prediction && (
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Prediction:</p>
                            <p className="text-xl">{prediction}</p>
                        </div>
                    )}
                    {error && (
                        <div className="mt-4">
                            <p className="text-lg text-red-500">{error}</p>
                        </div>
                    )}
                    <div className="mt-4">
                        <p className="text-lg font-semibold">Round: {round}</p>
                        <p className="text-lg">Draw: {ITEMS[round - 1]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
