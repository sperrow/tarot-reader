import { useState } from 'react';
import { Card } from './types/Card.ts';
import TarotCard from './TarotCard.tsx';

type ReadingProps = {
    cards: Card[];
    summaries: {
        card_summaries: {
            name: string;
            summary: string;
        }[];
        all_summary: string;
    };
};

function Reading({ cards }: ReadingProps) {
    const [step, setStep] = useState(0);

    return (
        <>
            <div className="max-w-md grid grid-cols-3 gap-x-20 gap-y-4 justify-center items-center my-16">
                {cards.map((card, idx) => (
                    <TarotCard key={card.index} card={card} selected={true} flipped={idx < step}></TarotCard>
                ))}
            </div>
            <div>
                <button
                    type="button"
                    className="w-full text-white bg-gradient-to-br from-yellow-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8"
                    onClick={() => setStep(step + 1)}
                >
                    Flip
                </button>
            </div>
        </>
    );
}

export default Reading;
