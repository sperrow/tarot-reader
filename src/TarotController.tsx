import { useState } from 'react';
import { Transition } from '@headlessui/react';
import pentacle from './assets/pentacle.svg';
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
    const readButtonClasses = `font-sans w-3/4 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900 mb-8 transition-all ${
        hideReadButton ? 'invisible' : ''
    }`;
    const hideBackButton = step !== 1;
    const backButtonClasses = `font-sans text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
        hideBackButton ? 'invisible ' : ''
    }`;

    const handleGeneralClick = () => {
        setQuestion('');
        setStep(step + 2);
    };

    const handleBackClick = () => {
        setQuestion('');
        setStep(0);
    };

    const handleStart = async (cards: Card[]) => {
        // cards = testCards;
        console.log(cards);
        setSelectedCards(cards);
        setLoading(true);

        // setTimeout(() => {
        //     setSummaries(testSummaries);
        //     setStep(step + 1);
        //     setLoading(false);
        // }, 1000);

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
    //         index: 71,
    //         name: 'Eight of Wands',
    //         image: 'Wands08.jpg',
    //     },
    //     {
    //         index: 62,
    //         name: 'Queen of Swords',
    //         image: 'Swords13.jpg',
    //     },
    //     {
    //         index: 13,
    //         name: 'Death',
    //         image: '13-Death.jpg',
    //     },
    // ];

    // const testSummaries = {
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
                    <li className="mb-4">
                        <button
                            type="button"
                            className="font-sans w-full px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            onClick={() => setStep(step + 1)}
                        >
                            Ask A Question
                        </button>
                    </li>
                    <li className="mb-4">
                        <button
                            type="button"
                            className="font-sans w-full px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            onClick={handleGeneralClick}
                        >
                            General Knowledge
                        </button>
                    </li>
                </ul>
            </div>
        ) : step === 1 ? (
            <div className="w-full">
                <h2 className="mb-8">What is your question?</h2>
                <label className="invisible absolute" htmlFor="question">
                    Question
                </label>
                <input
                    id="question"
                    type="text"
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
        ) : step === 2 ? (
            <div>
                {question === '' ? null : <h2 className="mb-8 text-xl">Your Question: "{question}"</h2>}
                {loading ? null : <h3 className="mb-8">Select three cards</h3>}
                <TarotDeck start={handleStart}></TarotDeck>
            </div>
        ) : step === 3 && summaries ? (
            <div>
                {question === '' ? null : <h2 className="mb-8 text-xl">Your Question: "{question}"</h2>}
                <Reading cards={selectedCards} summaries={summaries}></Reading>
            </div>
        ) : null;

    return (
        <>
            {loading ? <Spinner></Spinner> : null}
            {selectedCards.length === 0 ? (
                <div className="flex justify-center">
                    <img src={pentacle} className="logo" alt="pentacle" />
                </div>
            ) : null}
            <div className="my-8 flex justify-center">{currentStep}</div>
            <div>
                <ul>
                    <Transition
                        show={!hideReadButton}
                        enter="transition-all ease-in-out duration-500 delay-[200ms]"
                        enterFrom="opacity-0 translate-y-6"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition-all ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
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
                    </Transition>
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
