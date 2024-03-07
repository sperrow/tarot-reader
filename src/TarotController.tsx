import { useState } from 'react';
import { Card } from './types/Card.ts';
import { Summaries } from './types/Summaries.ts';
import TarotDeck from './TarotDeck.tsx';
import Spinner from './Spinner.tsx';
import read from './openai.ts';
import Reading from './Reading.tsx';

function TarotController() {
    const [step, setStep] = useState(0);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [summaries, setSummaries] = useState<Summaries>();

    const hideReadButton = step !== 1 || question === '';
    const readButtonClasses = `font-sans w-full text-white bg-gradient-to-br from-yellow-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8 ${
        hideReadButton ? 'invisible' : ''
    }`;
    const hideBackButton = step !== 1;
    const backButtonClasses = `font-sans text-white bg-gray-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center mb-8 ${
        hideBackButton ? 'invisible ' : ''
    }`;

    const handleBackClick = () => {
        setQuestion('');
        setStep(0);
    };

    const handleStart = async (cards: Card[]) => {
        console.log(cards);
        // cards = testCards;
        setSelectedCards(cards);
        setLoading(true);
        
        // setTimeout(() => {
        //     setLoading(false);
        //     setStep(step + 1);
        // }, 500);
        const cardNames = cards.map((card) => card.name);
        const res = await read(cardNames, question);
        if (res) {
            setLoading(false);
            setSummaries(res);
            const { card_summaries, all_summary } = res;
            console.log('card_summaries:', card_summaries);
            console.log('all_summary:', all_summary);
            setStep(step + 1);
        }
    };

    // const testCards = [
    //     {
    //         "index": 71,
    //         "name": "Eight of Wands",
    //         "image": "Wands08.jpg"
    //     },
    //     {
    //         "index": 62,
    //         "name": "Queen of Swords",
    //         "image": "Swords13.jpg"
    //     },
    //     {
    //         "index": 13,
    //         "name": "Death",
    //         "image": "13-Death.jpg"
    //     }
    // ]

    // const summaries = {
    //     card_summaries: [
    //         {
    //             name: 'Eight of Wands',
    //             summary:
    //                 'The Eight of Wands represents swift communication, travel, and fast-paced movement. It signifies sudden developments and rapid progress.',
    //         },
    //         {
    //             name: 'Queen of Swords',
    //             summary:
    //                 'The Queen of Swords embodies intellect, clear communication, and independence. She encourages rational decision-making and facing situations with logic and truth.',
    //         },
    //         {
    //             name: 'Death',
    //             summary:
    //                 'Death is a card of transformation and endings, symbolizing the closure of one chapter to make way for new beginnings. It represents major changes and release of the past.',
    //         },
    //     ],
    //     all_summary:
    //         'The cards suggest that traveling to Paris for the summer might bring about swift changes and transformations in your life. The Eight of Wands indicates a quick decision to travel, while the Queen of Swords advises making a logical choice. The Death card signifies a significant transformation or ending, suggesting that going to Paris could lead to a profound change or closure in some aspect of your life. Overall, the cards indicate that the trip may bring about important shifts and new beginnings, urging you to embrace change with a clear and rational mindset.',
    // };

    const currentStep =
        step === 0 ? (
            <div>
                <h2 className="mb-8">What do you wish to know?</h2>
                <ul>
                    <li>
                        <button
                            type="button"
                            className="font-sans w-full text-white bg-gradient-to-br from-yellow-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8"
                            onClick={() => setStep(step + 1)}
                        >
                            Advice
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="font-sans w-full text-white bg-gradient-to-br from-yellow-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8"
                            onClick={() => setStep(step + 1)}
                        >
                            General Knowledge
                        </button>
                    </li>
                </ul>
            </div>
        ) : step === 1 ? (
            <div>
                <h2 className="mb-8">What is your question?</h2>
                <label className="invisible absolute" htmlFor="question">
                    Question
                </label>
                <input
                    id="question"
                    type="text"
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8"
                />
            </div>
        ) : step === 2 ? (
            <div>
                <h2 className="mb-8 text-xl">Your Question: "{question}"</h2>
                <h3 className="mb-8">Select three cards</h3>
                <TarotDeck start={handleStart}></TarotDeck>
            </div>
        ) : step === 3 && summaries ? (
            <div>
                <h2 className="mb-8 text-xl">Your Question: "{question}"</h2>
                <Reading cards={selectedCards} summaries={summaries}></Reading>
            </div>
        ) : null;

    return (
        <>
            {loading ? <Spinner></Spinner> : null}
            <div className="my-8 flex justify-center">{currentStep}</div>
            <div>
                <ul>
                    <li>
                        <button
                            type="button"
                            className={readButtonClasses}
                            onClick={() => setStep(step + 1)}
                            disabled={hideReadButton}
                        >
                            Begin Reading
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={backButtonClasses}
                            onClick={handleBackClick}
                            disabled={hideBackButton}
                        >
                            Back
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default TarotController;
