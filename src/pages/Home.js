import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="text-center py-5">
            <h2 className="mb-4 text-success">🧪 Griffith & Avery Experiment Hub</h2>
            <p className="text-muted mb-4">Select an experiment to explore:</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
                <button className="btn btn-primary" onClick={() => navigate('/transformation')}>
                    The Transformation Experiment (Griffith,1928)
                </button>
                <button className="btn btn-success" onClick={() => navigate('/enzyme')}>
                    The Search for the Genetic Material (Avery,1940)
                </button>
            </div>
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '15px',
                    opacity: 0.5,
                    fontSize: '0.8rem',
                    color: '#6c757d',
                    userSelect: 'none',
                    textAlign: 'right',
                    lineHeight: '1.2',
                }}
            >
                © 2025 YC Hsu & SY Tang<br/>
                Nonprofit, for educational use only
            </div>
        </div>
    );
}
