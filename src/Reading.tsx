import { useState } from 'react';
import { Card } from './types/Card.ts';
import TarotCard from './TarotCard.tsx';
import Modal from './Modal.tsx';
import { Summaries } from './types/Summaries.ts';

type ReadingProps = {
    cards: Card[];
    summaries: Summaries;
};

function Reading({ cards, summaries }: ReadingProps) {
    cards.forEach((card) => {
        const cardSummary = summaries.card_summaries.find((sum) => sum.name === card.name);
        if (cardSummary) {
            card.summary = cardSummary.summary;
        }
    });
    const [step, setStep] = useState(0);
    const [currentCard, setCurrentCard] = useState<Card>(cards[0]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleFlip = () => {
        if (step < 3) {
            setCurrentCard(cards[step]);
            setStep(step + 1);
            setTimeout(() => {
                setModalOpen(true);
            }, 800);
        }
    };

    const handleCardClick = (index: number) => {
        const clickedCardIdx = cards.findIndex((card) => card.index === index);
        if (clickedCardIdx < step) {
            setCurrentCard(cards[clickedCardIdx]);
            setModalOpen(true);
        }
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <div className="flex items-center flex-col max-w-md">
            <div className="grid grid-cols-3 gap-x-20 gap-y-4 justify-center items-center my-16">
                {cards.map((card, idx) => (
                    <TarotCard
                        key={card.index}
                        card={card}
                        selected={true}
                        flipped={idx < step}
                        onClick={handleCardClick}
                    ></TarotCard>
                ))}
            </div>
            <Modal card={currentCard} open={modalOpen} close={handleClose}></Modal>
            <div>
                {step < 3 ? (
                    <button
                        type="button"
                        className="font-sans w-full text-white bg-gradient-to-br from-yellow-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-8"
                        onClick={handleFlip}
                    >
                        Flip
                    </button>
                ) : (
                    <p>{summaries.all_summary}</p>
                )}
            </div>
        </div>
    );
}

export default Reading;
