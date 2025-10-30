import { useState, useEffect, useRef } from 'react';
import { FaHandPointer } from 'react-icons/fa';
import './HandGuide.css';
const TARGET_SELECTORS = [
  '.scroll-bot',
  '#download-pdf',
  '#toggle-lang',
  '#whatsapp',
  '#linkedin',
  '#github',
];
const MOVE_DURATION = 1500;
const CLICK_ANIMATION_DURATION = 500;
const TRAIL_LENGTH = 30;
const TRAIL_THROTTLE_MS = 32;
const TRAIL_FADE_SPEED = 40;
const CLICK_WAIT_DURATION = 1300;
const TOUR_INTERVAL = 12000;
const START_DELAY = 1000;
type Point = { x: number, y: number };
function shuffleArray(array: any[]) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
function getCubicBezierPoint(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x;
  const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y;
  return { x, y };
}
export function HandGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [currentPos, setCurrentPos] = useState<Point>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Point[]>([]);
  const animationStartRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const lastTrailUpdateTimeRef = useRef<number>(0);
  const fadeTrailIntervalRef = useRef<number | null>(null);
  const currentPosRef = useRef<Point>({ x: 0, y: 0 });
  const tourTargetsRef = useRef<string[]>([]);
  const tourIndexRef = useRef(0);
  const pathPointsRef = useRef<{ p0: Point, p1: Point, p2: Point, p3: Point }>({
    p0: { x: 0, y: 0 }, p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 }, p3: { x: 0, y: 0 }
  });
  const currentTargetSelectorRef = useRef<string>('');
  const animate = (timestamp: number) => {
    if (fadeTrailIntervalRef.current) clearInterval(fadeTrailIntervalRef.current);
    if (!animationStartRef.current) {
      animationStartRef.current = timestamp;
    }
    const elapsed = timestamp - animationStartRef.current;
    const progress = Math.min(elapsed / MOVE_DURATION, 1);
    const { p0, p1, p2, p3: staleP3 } = pathPointsRef.current;
    let finalP3 = staleP3;
    const targetEl = document.querySelector(currentTargetSelectorRef.current) as HTMLElement;
    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      finalP3 = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2,
      };
    }
    const newPos = getCubicBezierPoint(progress, p0, p1, p2, finalP3);
    setCurrentPos(newPos);
    currentPosRef.current = newPos;
    if (timestamp - lastTrailUpdateTimeRef.current > TRAIL_THROTTLE_MS) {
      lastTrailUpdateTimeRef.current = timestamp;
      setTrail((prevTrail) => {
        const newTrail = [...prevTrail, newPos];
        if (newTrail.length > TRAIL_LENGTH) {
          newTrail.shift();
        }
        return newTrail;
      });
    }
    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsClicking(true);
      const isFinalClick = tourIndexRef.current === tourTargetsRef.current.length - 1;
      fadeTrailOut(isFinalClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setIsClicking(false);
        tourIndexRef.current += 1;
        if (!isFinalClick) {
          timeoutRef.current = window.setTimeout(moveToNextTarget, CLICK_WAIT_DURATION);
        }
      }, CLICK_ANIMATION_DURATION);
    }
  };
  const fadeTrailOut = (isFinalFade: boolean = false) => {
    if (fadeTrailIntervalRef.current) clearInterval(fadeTrailIntervalRef.current);
    fadeTrailIntervalRef.current = window.setInterval(() => {
      setTrail((prevTrail) => {
        if (prevTrail.length <= 1) {
          clearInterval(fadeTrailIntervalRef.current!);
          if (isFinalFade) {
            setIsVisible(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(startTour, TOUR_INTERVAL);
          }
          return [];
        }
        return prevTrail.slice(1);
      });
    }, TRAIL_FADE_SPEED);
  };
  const moveToNextTarget = () => {
    if (fadeTrailIntervalRef.current) clearInterval(fadeTrailIntervalRef.current);
    const index = tourIndexRef.current;
    const targetSelector = tourTargetsRef.current[index];
    const targetEl = document.querySelector(targetSelector) as HTMLElement;
    currentTargetSelectorRef.current = targetSelector;
    if (!targetEl) {
      console.warn(`HandGuide: Alvo "${targetSelector}" não encontrado.`);
      currentTargetSelectorRef.current = '';
      tourIndexRef.current += 1;
      if (tourIndexRef.current < tourTargetsRef.current.length) {
        moveToNextTarget();
      } else {
        timeoutRef.current = window.setTimeout(startTour, TOUR_INTERVAL);
      }
      return;
    }
    const targetRect = targetEl.getBoundingClientRect();
    let p0: Point;
    if (index === 0) {
      p0 = { x: window.innerWidth / 2, y: window.innerHeight + 100 };
      setTrail([]);
    } else {
      p0 = currentPosRef.current;
    }
    const p3: Point = {
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2,
    };
    const p1: Point = {
      x: p0.x + (p3.x - p0.x) * 0.3 + (Math.random() - 0.5) * (window.innerWidth * 0.4),
      y: p0.y + (p3.y - p0.y) * 0.3 + (Math.random() - 0.5) * (window.innerHeight * 0.4),
    };
    const p2: Point = {
      x: p0.x + (p3.x - p0.x) * 0.7 + (Math.random() - 0.5) * (window.innerWidth * 0.4),
      y: p0.y + (p3.y - p0.y) * 0.7 + (Math.random() - 0.5) * (window.innerHeight * 0.4),
    };
    pathPointsRef.current = { p0, p1, p2, p3 };
    setCurrentPos(p0);
    currentPosRef.current = p0;
    setIsVisible(true);
    setIsClicking(false);
    animationStartRef.current = null;
    lastTrailUpdateTimeRef.current = 0;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  const startTour = () => {
    if (fadeTrailIntervalRef.current) clearInterval(fadeTrailIntervalRef.current);
    tourTargetsRef.current = shuffleArray([...TARGET_SELECTORS]);
    tourIndexRef.current = 0;
    currentTargetSelectorRef.current = '';
    setTrail([]);
    moveToNextTarget();
  };
  useEffect(() => {
    timeoutRef.current = window.setTimeout(startTour, START_DELAY);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (fadeTrailIntervalRef.current) clearInterval(fadeTrailIntervalRef.current);
    };
  }, []);
  if (!isVisible) return null;
  const trailPathD = trail.length > 1
    ? `M ${trail[0].x} ${trail[0].y} ${trail.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`
    : '';
  return (
    <>
      <div
        className={`hand-guide ${isClicking ? 'clicking' : ''}`}
        style={{
          transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
        }}
      >
        <span className="hand-icon-wrapper">
          <FaHandPointer />
        </span>
      </div >
      <svg className="hand-trail-svg">
        <path d={trailPathD} />
      </svg >
    </>
  );
}