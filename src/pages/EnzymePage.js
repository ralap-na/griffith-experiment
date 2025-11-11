import React, { useState } from 'react';
import { FlaskConical, CircleDot, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

const enzyme = [
    { id: 'protease', label: '蛋白酶', image: process.env.PUBLIC_URL + "/img/protease.png" },
    { id: 'RNase', label: 'RNA酶', image: process.env.PUBLIC_URL + "/img/RNase.png" },
    { id: 'DNase', label: 'DNA酶', image: process.env.PUBLIC_URL + "/img/DNase.png" },
];

const EnzymePage = () => {
    const [enzymeSelection, setEnzymeSelection] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [results, setResults] = useState([]);

    const analyzeSelections = () => {
        if (enzymeSelection.length === 0) return alert("請至少勾選一種酵素再進行實驗。");

        const strain = enzyme.find((s) => s.id === enzymeSelection);

        let final = '有轉型!!!';
        let finalPicture = process.env.PUBLIC_URL + "/img/transformation.png";

        if (enzymeSelection === 'DNase') {
            final = '沒有轉型!!!';
            finalPicture = process.env.PUBLIC_URL + "/img/noTransformation.png";
        }

        const newResults = [{ strain: strain.label, result: final, finalPicture }];

        setResults(newResults);
        setShowResult(true);
        setShowAnimation(true);

        setTimeout(() => {
            setShowAnimation(false);
            setShowResult(true);
        }, 3000);
    };

    const resetExperiment = () => {
        setEnzymeSelection([]);
        setShowResult(false);
        setShowAnimation(false);
        setResults([]);
    };

    return (
        <div style={{ backgroundColor: '#CEDED8', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="text-center mb-3">
                    <h1 className="h2 text-success">
                        <FlaskConical size={36} className="me-2"/>
                        轉形實驗 - 影響轉形的物質為何?
                    </h1>
                </div>

                {!showResult && !showAnimation ?
                    <div className="text-center my-3 fs-5 text-secondary">
                        在高溫殺死的S型菌液中加入...
                    </div>
                    : <div></div>}

                {!showResult && !showAnimation ?
                    <div className="text-center mb-4">
                        <img
                            src={process.env.PUBLIC_URL + "/img/bottle.png"}
                            alt={'bottle'}
                            style={{width: 200, height: 170}}
                        />
                    </div>
                    : <div></div>}

                <div className="card shadow-lg p-4 border-info" style={{borderRadius: '25px'}}>
                    <AnimatePresence mode="wait">
                        {!showResult && !showAnimation ? (
                            <motion.div
                                key="selection"
                                initial={{opacity: 0, y: 15}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -15}}
                                transition={{duration: 0.4}}
                            >
                                <div className="text-center fw-bold mb-3">
                                    選擇酵素
                                </div>

                                <div className="d-flex justify-content-center gap-4 border-top py-3">
                                    {enzyme.map((item) => (
                                        <div key={item.id} className="text-center">
                                            <img
                                                src={item.image}
                                                alt={item.label}
                                                style={{width: 80, height: 80}}
                                                className="rounded mb-2"
                                            />
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="enzyme-selection"
                                                    checked={enzymeSelection === item.id}
                                                    onChange={() => setEnzymeSelection(item.id)}
                                                />{" "}
                                                <label className="small">{item.label}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center mt-4">
                                    <p className="small text-muted">
                                        <CircleDot size={12} className="me-1 text-primary"/>
                                        請選擇一種酵素進行實驗，完成後點選下方按鈕。
                                    </p>
                                    <button
                                        className="btn btn-success text-white w-75 mt-2"
                                        onClick={analyzeSelections}
                                        disabled={!enzymeSelection}
                                    >
                                        開始實驗
                                    </button>
                                </div>
                            </motion.div>
                        ) : showAnimation ? (
                            <motion.div
                                key="animation"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.8}}
                                transition={{duration: 0.5}}
                                className="text-center py-5"
                            >
                                <img
                                    src={process.env.PUBLIC_URL + "/img/water.gif"}
                                    alt="倒入R型活菌中..."
                                    style={{maxWidth: '400px', width: '100%'}}
                                />
                                <p className="mt-3 text-muted">倒入R型活菌中...</p>
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
                                        src={results[0]?.finalPicture}
                                        alt={results[0]?.result}
                                        style={{width: 100, height: 100}}
                                        className="rounded"
                                    />
                                </div>
                                <table className="table table-bordered text-center align-middle mt-4">
                                    <thead className="table-info">
                                    <tr>
                                        <th>酵素</th>
                                        <th>狀態</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{results.map(r => r.strain).join(', ')}</td>
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

export default EnzymePage;