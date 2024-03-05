import pentacle from './assets/pentacle.svg';
import './App.css';
import TarotController from './TarotController.tsx';

function App() {
    return (
        <>
            <header className="flex flex-col items-center justify-center">
                <div>
                    <h1>Tarot Reading</h1>
                </div>
                <img src={pentacle} className="logo" alt="pentacle" />
            </header>
            <main>
                <TarotController></TarotController>
            </main>
        </>
    );
}

export default App;
