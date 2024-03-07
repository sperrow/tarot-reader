import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Card } from './types/Card.ts';
import cards from './cards.json';
import TarotCard from './TarotCard.tsx';

type SelectedCards = Set<number>;
type CardsProps = {
    start: (cards: Card[]) => void;
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
    const [parent] = useAutoAnimate({ duration: 1000 });
    const [classes, setClasses] = useState('max-w-md flex flex-wrap justify-center items-center');
    // const [classes, setClasses] = useState('max-w-md grid grid-cols-12 gap-y-4 justify-center items-center');
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
            setClasses('max-w-md grid grid-cols-3 gap-x-20 gap-y-4 justify-center items-center');
            start(selected);
        }
    };

    return (
        <div ref={parent} className={classes}>
            {deck.map((card) => (
                <TarotCard
                    key={card.index}
                    card={card}
                    onClick={handleClick}
                    selected={selectedCards.has(card.index)}
                ></TarotCard>
            ))}
        </div>
    );
}

export default TarotDeck;
