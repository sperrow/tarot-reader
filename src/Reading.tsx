import { useState, useRef } from 'react';
import { Card } from './types/Card.ts';
import TarotCard from './TarotCard.tsx';
import Modal from './Modal.tsx';
import { Summaries } from './types/Summaries.ts';

type ReadingProps = {
    cards: Card[];
    summaries: Summaries;
};

type Flips = Record<number, boolean>;

function Reading({ cards, summaries }: ReadingProps) {
    const summaryRef = useRef<HTMLDivElement>(null);
    cards.forEach((card) => {
        const cardSummary = summaries.card_summaries.find((sum) => sum.name === card.name);
        if (cardSummary) {
            card.summary = cardSummary.summary;
        }
    });
    const [currentCard, setCurrentCard] = useState<Card>(cards[0]);
    const [modalOpen, setModalOpen] = useState(false);
    const [flipCount, setFlipCount] = useState(0);
    const flips: Flips = {};
    cards.forEach((card) => flips[card.index] == false);
    const [flipped, setFlipped] = useState<Flips>(flips);

    const handleCardClick = (index: number) => {
        const clickedCard = cards.find((card) => card.index === index);
        if (clickedCard) {
            setCurrentCard(clickedCard);
            if (!flipped[clickedCard.index]) {
                flipped[clickedCard.index] = true;
                setFlipped(flipped);
                setFlipCount(flipCount + 1);
                setTimeout(() => {
                    setModalOpen(true);
                }, 1000);
            } else {
                setModalOpen(true);
            }
        }
    };

    const handleClose = () => {
        setModalOpen(false);
        if (flipCount > 2) {
            summaryRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    };

    return (
        <div className="w-96 max-w-sm md:max-w-md w-full p-4">
            <div className="mt-18">
                {flipCount < 3 ? <h3 className="mb-8 text-amber-500">Click to Flip</h3> : null}
                {cards.map((card) => (
                    <div key={card.index} className="mb-16 card rounded bg-slate-100 dark:bg-slate-800">
                        <TarotCard card={card} reading={true} onClick={handleCardClick}></TarotCard>
                    </div>
                ))}
            </div>
            <Modal card={currentCard} open={modalOpen} close={handleClose}></Modal>
            <div ref={summaryRef} className="mt-16">
                {flipCount > 2 ? <p className="text-left p-4">{summaries.all_summary}</p> : null}
            </div>
        </div>
    );
}

export default Reading;
