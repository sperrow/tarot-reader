import './App.css';
import github from './assets/github-mark.svg';
import TarotController from './TarotController.tsx';

function App() {
    return (
        <div className='container mx-auto p-4 min-h-screen text-center'>
            <header className="flex flex-col items-center justify-center">
                <div className="text-4xl my-8">
                    <h1>Tarot Reading</h1>
                </div>
            </header>
            <main className="pb-16">
                <TarotController></TarotController>
            </main>
            <footer className="absolute bottom-0 left-0 w-full pb-8 flex flex-col justify-center items-center align-end">
                <div>
                    <a href="https://github.com/sperrow/tarot-reader" target="_blank" aria-label="github">
                        <img src={github} alt="github" className="w-5" />
                    </a>
                </div>
                <div className="mt-4 text-xs">
                    Deck by{' '}
                    <a href="https://www.etsy.com/shop/Zeedigns" target="_blank">
                        Zeedigns
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default App;
