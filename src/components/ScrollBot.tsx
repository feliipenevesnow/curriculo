import { useState, useEffect, useRef } from 'react';
import { SiOpenai } from 'react-icons/si';
import { translations } from '../data/translations';

type ScrollBotProps = {
    onClick: () => void;
    lang: 'pt' | 'en';
}
export function ScrollBot({ onClick, lang }: ScrollBotProps) {
    const [topPx, setTopPx] = useState(10);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const T = translations[lang];

    const onScroll = () => {
        // ... (rest of logic same)
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
            aria-label={lang === 'pt' ? "Abrir assistente" : "Open assistant"}
        >
            <SiOpenai />
            <span className="scroll-bot-tooltip">
                {T.btnTalk}
            </span>
        </button>
    );
}