// import cardBack from '../public/cardBack.png';
import { Card } from './types/Card.ts';
import './TarotCard.css';

type TarotCardProps = {
    card: Card;
    selected: boolean;
    flipped?: boolean;
    onClick?: (index: number) => void;
};

function TarotCard({ card, selected, flipped, onClick }: TarotCardProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onClick) {
            onClick(card.index);
        }
    };
    const outerClasses = `flip-card flip-card-button flex justify-center ${flipped ? 'flipped' : ''} ${
        selected ? 'selected' : ''
    }`;
    return (
        <div>
            <button className={outerClasses} onClick={handleClick}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img className="w-full h-full flip-card-image rounded" src="/cardBack.png" alt="card back" />
                    </div>
                    <div className="flip-card-back">
                        <img className="w-full h-full flip-card-image" src={`/cards/${card.image}`} alt="card face" />
                    </div>
                </div>
            </button>
            {flipped ? <p>{card.name.toUpperCase()}</p> : null}
        </div>
    );
}

export default TarotCard;
