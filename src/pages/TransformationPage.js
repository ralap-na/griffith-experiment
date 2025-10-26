import React, { useState } from 'react';
import { FlaskConical, CircleDot, Thermometer, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

const strains = [
    { id: 'S', label: 'S型', image: process.env.PUBLIC_URL + "/img/stype.png" },
    { id: 'R', label: 'R型', image: process.env.PUBLIC_URL + "/img/rtype.png" },
];

const temperatures = [
    { id: 'RT', label: '室溫' },
    { id: 'HT', label: '高溫' },
];

const TransformationPage = () => {
    const [strainSelection, setStrainSelection] = useState([]);
    const [tempSelection, setTempSelection] = useState({ S: null, R: null });
    const [showResult, setShowResult] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [results, setResults] = useState([]);

    const toggleStrain = (id) => {
        setStrainSelection((prev) => {
            if (prev.includes(id)) {
                setTempSelection((prevTemp) => ({ ...prevTemp, [id]: null }));
                return prev.filter((s) => s !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleTempChange = (strainId, tempId) => {
        setTempSelection((prev) => ({ ...prev, [strainId]: tempId }));
    };

    const analyzeSelections = () => {
        if (strainSelection.length === 0) return alert("請至少勾選一種菌種再進行實驗。");
        const incomplete = strainSelection.some((id) => tempSelection[id] === null);
        if (incomplete) return alert("請為每個菌種選擇溫度處理（室溫或高溫）。");

        const newResults = strainSelection.map((id) => {
            const strain = strains.find((s) => s.id === id);
            const temp = temperatures.find((t) => t.id === tempSelection[id]);

            let final = '小鼠活蹦亂跳';

            if (id === 'S' && tempSelection[id] === 'RT') {
                final = '小鼠死掉了';
            } else if (id === 'S' && tempSelection[id] === 'HT' && strainSelection.includes('R')) {
                if (tempSelection['R'] === 'HT') {
                    final = '小鼠死掉了';
                }
            } else if (id === 'R') {
                if (strainSelection.includes('S')) {
                    const sTempId = tempSelection['S'];
                    if (tempSelection[id] === 'RT') {
                        final = '小鼠死掉了';
                    } else if (tempSelection[id] === 'HT' && sTempId === 'RT') {
                        final = '小鼠死掉了';
                    }
                }
            }

            let mousePicture =  process.env.PUBLIC_URL + "/img/aliveMouse.png";
            if (final === '小鼠死掉了') mousePicture = process.env.PUBLIC_URL + "/img/deadMouse.png";

            let bloodPicture = "";
            if (final === '小鼠死掉了') bloodPicture = process.env.PUBLIC_URL + "/img/blood.png";

            return { strain: strain.label, temp: temp.label, result: final, mousePicture: mousePicture, bloodPicture: bloodPicture };
        });

        setResults(newResults);
        setShowResult(true);
        setShowAnimation(true);

        setTimeout(() => {
            setShowAnimation(false);
            setShowResult(true);
        }, 3000);
    };

    const resetExperiment = () => {
        setStrainSelection([]);
        setTempSelection({ S: null, R: null });
        setShowResult(false);
        setShowAnimation(false);
        setResults([]);
    };

    const isAnalysisDisabled =
        strainSelection.length === 0 ||
        strainSelection.some((id) => tempSelection[id] === null);

    return (
        <div style={{ backgroundColor: '#d9f0f7', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="text-center mb-3">
                    <h1 className="h2 text-primary">
                        <FlaskConical size={36} className="me-2" />
                        轉形實驗 - 肺炎鏈球菌與小鼠
                    </h1>
                </div>

                <div className="card shadow-lg p-4 border-info" style={{ borderRadius: '25px' }}>
                    <AnimatePresence mode="wait">
                        {!showResult && !showAnimation ? (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="d-flex justify-content-around text-center fw-bold mb-3">
                                    <div>菌種</div>
                                    <div>溫度選擇</div>
                                </div>

                                {strains.map((strain) => {
                                    const isChecked = strainSelection.includes(strain.id);
                                    return (
                                        <div
                                            key={strain.id}
                                            className="d-flex align-items-center justify-content-around border-top py-3"
                                        >
                                            <div className="text-center" style={{width: '150px'}}>
                                                <img
                                                    src={strain.image}
                                                    alt={strain.label}
                                                    style={{width: 50, height: 50}}
                                                    className="rounded-circle mb-2"
                                                />
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => toggleStrain(strain.id)}
                                                    />{" "}
                                                    <label className="small">{strain.label}</label>
                                                </div>
                                            </div>

                                            <div style={{minHeight: "40px", width: '300px'}}>
                                                <AnimatePresence mode="wait">
                                                    {isChecked && (
                                                        <motion.div
                                                            key={`temps-${strain.id}`}
                                                            initial={{opacity: 0, y: -8}}
                                                            animate={{opacity: 1, y: 0}}
                                                            exit={{opacity: 0, y: -8}}
                                                            transition={{duration: 0.4}}
                                                            className="d-flex justify-content-center gap-4"
                                                        >
                                                            {temperatures.map((temp) => (
                                                                <div key={`${strain.id}-${temp.id}`} className="text-center">
                                                                    <input
                                                                        type="radio"
                                                                        name={`temp-${strain.id}`}
                                                                        checked={tempSelection[strain.id] === temp.id}
                                                                        onChange={() => handleTempChange(strain.id, temp.id)}
                                                                    />{" "}
                                                                    <label>
                                                                        <Thermometer size={18} className="text-dark"/> {temp.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="text-center mt-4">
                                    <p className="small text-muted">
                                        <CircleDot size={12} className="me-1 text-primary"/>
                                        請在每種變因中勾選進行實驗，完成後點選下方按鈕。
                                    </p>
                                    <p className="small text-muted">
                                        <CircleDot size={12} className="me-1 text-primary"/>
                                        請在每種變因中勾選進行實驗，完成後點選箭頭進行注射，並將結果紀錄於表格中。
                                    </p>
                                    <button
                                        className="btn btn-info text-white w-75 mt-2"
                                        onClick={analyzeSelections}
                                        disabled={isAnalysisDisabled}
                                    >
                                        開始注射
                                    </button>
                                </div>
                            </motion.div>
                        ) : showAnimation ? (
                            <motion.div
                                key="animation"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className="text-center py-5"
                            >
                                <img
                                    src={process.env.PUBLIC_URL + "/img/mouseinjection.gif"}
                                    alt="注射中..."
                                    style={{ maxWidth: '400px', width: '100%' }}
                                />
                                <p className="mt-3 text-muted">正在注射中...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{opacity: 0, y: 15}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -15}}
                                transition={{duration: 0.4}}
                            >
                                <h5 className="text-center mb-3 text-success fw-bold">🧪 實驗結果</h5>
                                <div className="text-center">
                                    <img
                                        src={results[0]?.mousePicture}
                                        alt={results[0]?.result}
                                        style={{width: 250, height: 50}}
                                    />
                                    {results[0]?.bloodPicture && (
                                        <div className="mt-4"/>)}

                                    {results[0]?.bloodPicture && (
                                        <img
                                            src={results[0].bloodPicture}
                                            alt={results[0]?.result || "blood"}
                                            style={{ width: 100, height: 50 }}
                                        />
                                    )}
                                </div>
                                <table className="table table-bordered text-center align-middle mt-4">
                                    <thead className="table-info">
                                    <tr>
                                        <th>菌種+溫度</th>
                                        <th>狀態</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{results.map(r => `${r.strain} (${r.temp})`).join(', ')}</td>
                                        <td>{results[0]?.result || 'alive'}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <div className="text-center mt-3">
                                    <button className="btn btn-outline-primary" onClick={resetExperiment}>
                                        <RotateCcw size={16} className="me-1"/> 重新實驗
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TransformationPage;
