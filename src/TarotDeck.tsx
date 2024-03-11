import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './types/Card.ts';
import cards from './cards.json';
import TarotCard from './TarotCard.tsx';

type SelectedCards = Set<number>;
type CardsProps = {
    start: (cards: Card[]) => void;
};

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.01,
            staggerChildren: 0.03,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const unshuffled = cards.map((card) => {
    return {
        ...card,
        selected: false,
    };
});
let cardIndices = [];
for (let i = 0; i < cards.length; i++) {
    cardIndices.push(i);
}
const shuffled: Card[] = [];
while (cardIndices.length > 0) {
    const i = Math.floor(Math.random() * cardIndices.length);
    const cardIndex = cardIndices[i];
    shuffled.push(unshuffled[cardIndex]);
    cardIndices = [...cardIndices.slice(0, i), ...cardIndices.slice(i + 1)];
}

function TarotDeck({ start }: CardsProps) {
    const [deck, setDeck] = useState(shuffled);
    const [selectedCards, setSelectedCards] = useState<SelectedCards>(new Set());
    const [classes, setClasses] = useState('max-w-md flex flex-wrap justify-center items-center ml-8');
    const handleClick = (index: number) => {
        const newSet = new Set(selectedCards);
        if (newSet.size === 3) {
            return;
        }
        if (newSet.has(index)) {
            newSet.delete(index);
        } else if (newSet.size < 3) {
            newSet.add(index);
        }
        setSelectedCards(newSet);
        if (newSet.size === 3) {
            const selected: Card[] = [];
            newSet.forEach((index) => {
                const selectedCard = cards.find((card) => card.index === index);
                if (selectedCard) {
                    selected.push(selectedCard);
                }
            });
            setDeck(selected);
            setClasses('w-80 max-w-md flex flex-wrap justify-between items-center ml-8 mt-48');
            start(selected);
        }
    };

    return (
        <AnimatePresence>
            <motion.ul className={classes} variants={container} initial="hidden" animate="visible" layout>
                {deck.map((card) => (
                    <motion.li key={card.index} className="item" variants={item} layout>
                        <div className="-ml-8">
                            <TarotCard
                                card={card}
                                onClick={handleClick}
                                selected={selectedCards.has(card.index)}
                            ></TarotCard>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </AnimatePresence>
    );
}

export default TarotDeck;
