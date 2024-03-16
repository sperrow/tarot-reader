import { useState } from 'react';
import { Card } from './types/Card.ts';
import './TarotCard.css';

type TarotCardProps = {
    card: Card;
    selected?: boolean;
    reading?: boolean;
    onClick?: (index: number) => void;
};

function TarotCard({ card, selected, reading, onClick }: TarotCardProps) {
    const [flipped, setFlipped] = useState(false);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onClick) {
            onClick(card.index);
        }
        if (reading && !flipped) {
            setFlipped(true);
        }
    };
    const containerClasses = `flex items-center ${reading ? 'reading justify-between' : 'justify-center'}`;
    const buttonClasses = `flip-card flip-card-button ${reading ? 'w-1/2 ' : ''} ${
        flipped ? 'flipped' : selected ? 'selected' : ''
    }`;
    return (
        <div className={containerClasses}>
            <button className={buttonClasses} onClick={handleClick}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img
                            className="w-full h-full flip-card-image rounded"
                            src={`${import.meta.env.BASE_URL}cardBack.png`}
                            alt="card back"
                        />
                    </div>
                    <div className="flip-card-back">
                        <img
                            className="w-full h-full flip-card-image"
                            src={`${import.meta.env.BASE_URL}NeonRainbow/${card.image}`}
                            alt="card face"
                        />
                    </div>
                </div>
            </button>
            {reading ? (
                <div className="w-1/2 mx-4">
                    <p>{flipped ? card.name.toUpperCase() : ''}</p>
                </div>
            ) : null}
        </div>
    );
}

export default TarotCard;
