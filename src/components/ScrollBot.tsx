import { useState, useEffect, useRef } from 'react';
import { SiOpenai } from 'react-icons/si';
type ScrollBotProps = {
    onClick: () => void;
}
export function ScrollBot({ onClick }: ScrollBotProps) {
    const [topPx, setTopPx] = useState(10); 
    const buttonRef = useRef<HTMLButtonElement>(null);
    const onScroll = () => {
        const winScroll = document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollableHeight = docHeight - clientHeight;
        if (scrollableHeight <= 0) {
            setTopPx(10); 
            return;
        }
        const scrolledPercent = (winScroll / scrollableHeight);
        const buttonHeight = buttonRef.current?.offsetHeight || 50; 
        const desiredBottomMargin = 20; 
        const minTopPx = 10; 
        const maxTopPx = clientHeight - buttonHeight - desiredBottomMargin; 
        const travelDistance = maxTopPx - minTopPx;
        const calculatedTopPx = (scrolledPercent * travelDistance) + minTopPx;
        setTopPx(calculatedTopPx);
    };
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        onScroll(); 
        return () => window.removeEventListener('scroll', onScroll);
    }, []); 
    return (
        <button
            ref={buttonRef} 
            className="scroll-bot"
            style={{ top: `${topPx}px` }} 
            onClick={onClick}
            aria-label="Abrir assistente de IA"
        >
            <SiOpenai />
            <span className="scroll-bot-tooltip">
                Fale comigo!
            </span>
        </button>
    );
}