import './App.css';
import github from './assets/github-mark.svg';
import TarotController from './TarotController.tsx';

function App() {
    return (
        <>
        <div className='dark:text-white'>
            <header className="flex flex-col items-center justify-center">
                <div className="text-4xl mb-8">
                    <h1>Tarot Reading</h1>
                </div>
            </header>
            <main className="pb-16">
                <TarotController></TarotController>
            </main>
            <footer className="absolute bottom-0 left-0 w-full pb-8 flex justify-center align-end">
                <a href="https://github.com/sperrow/tarot-reader" target="_blank">
                    <img src={github} alt="github" className="w-5" />
                </a>
            </footer>
        </div>
        </>
    );
}

export default App;
