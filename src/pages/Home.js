import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="text-center py-5">
            <h1 className="mb-4 text-success">🧪 Griffith Experiment Hub</h1>
            <p className="text-muted mb-4">Select an experiment to explore:</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
                <button className="btn btn-success" onClick={() => navigate('/enzyme')}>Enzyme Transformation</button>
                <button className="btn btn-primary" onClick={() => navigate('/transformation')}>Transformation Experiment</button>
            </div>

        </div>
    );
}
