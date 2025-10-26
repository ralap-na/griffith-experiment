import { Link } from 'react-router-dom';
export default function Home() {
    return (
        <div className="menu">
            <h1>Griffith Experiment Hub</h1>
            <Link to="/enzyme">🧫 Enzyme Transformation</Link>
            <Link to="/transformation">🧬 Other Experiment</Link>
        </div>
    );
}
