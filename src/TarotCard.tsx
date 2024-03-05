import cardBack from '../public/cardBack.png';
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
    const outerClasses = `flip-card flip-card-button flex justify-center ${flipped ? 'flipped' : ''} ${selected ? 'selected' : ''}`;
    // const innerClasses = `flip-card-inner flip-card-button`;
    const innerClasses = `inner ${selected ? 'selected' : ''}`;
    // const outerClasses = `tarot-card-outer ${flipped ? 'flipped' : ''}`;
    // const innerClasses = `tarot-card-inner w-20 h-20 flex justify-between items-center ${selected ? 'selected' : ''}`;
    return (
        // <div className={outerClasses}>
        //     <a className={innerClasses} href="#" onClick={handleClick}>
        //         <img
        //             className="tarot-card-image tarot-card-front"
        //             src={`public/cards/${card.image}`}
        //             alt="card front"
        //         />
        //         <img
        //             className="tarot-card-image tarot-card-back shadow bg-yellow-200 hover:bg-yellow-400 box-content rounded"
        //             src={cardBack}
        //             alt="card back"
        //         />
        //     </a>
        // </div>
        // <div className="flip-card">
        //     <div className="flip-card-inner">
        //         <div className="flip-card-front">
        //             <img src={cardBack} alt="Avatar" className="w-16 h-16" />
        //         </div>
        //         <div className="flip-card-back">
        //             <h1>John Doe</h1>
        //             <p>Architect & Engineer</p>
        //             <p>We love that guy</p>
        //         </div>
        //     </div>
        // </div>
        <button className={outerClasses} onClick={handleClick}>
            <div className="flip-card-inner">
                <div className="flip-card-back">
                    <img className="w-full h-full flip-card-image" src={`public/cards/${card.image}`} alt="card front" />
                </div>
                <div className="flip-card-front">
                    <img className="w-full h-full flip-card-image" src={cardBack} alt="card back" />
                </div>
            </div>
        </button>
    );
}

export default TarotCard;
