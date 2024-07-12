"use client"
import React, { useState, useEffect, useRef } from 'react';
interface CounterComProps {
  count: number;
  standard: string;
}

const CounterComp: React.FC<CounterComProps> = ({ count, standard }) => {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (counterRef.current) {
        const elementPosition = counterRef.current.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        if (scrollPosition > elementPosition) {
          setStartCounting(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (startCounting) {
      const interval = setInterval(() => {
        if (animatedCount < count) {
          setAnimatedCount((prevCount) => prevCount + 1);
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [count, animatedCount, startCounting]);

  return (
    <div className="flex flex-col gap-1 items-center text-sm">
      <div ref={counterRef} className="border w-14 h-14 border-accent-10 rounded-full flex justify-center items-center font-semibold animate-animateFadeIn">
        {animatedCount}
      </div>
      <span className="capitalize">{standard}</span>
    </div>
  );
};

export default CounterComp;
