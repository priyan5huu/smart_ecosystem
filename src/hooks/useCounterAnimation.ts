import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom hook for smooth number counter animations
 * Perfect for animating metrics and statistics
 */
export const useCounterAnimation = (
    endValue: number,
    duration = 2,
    decimals = 0,
    delay = 0
) => {
    const [displayValue, setDisplayValue] = useState(0);
    const counterRef = useRef({ value: 0 });

    useEffect(() => {
        const obj = counterRef.current;
        obj.value = 0;

        gsap.to(obj, {
            value: endValue,
            duration,
            delay,
            ease: 'power2.out',
            onUpdate: () => {
                setDisplayValue(parseFloat(obj.value.toFixed(decimals)));
            },
        });
    }, [endValue, duration, decimals, delay]);

    return displayValue;
};

/**
 * Hook for animating value changes with smooth transitions
 */
export const useAnimatedValue = (value: number, duration = 0.5, decimals = 0) => {
    const [displayValue, setDisplayValue] = useState(value);
    const prevValueRef = useRef(value);

    useEffect(() => {
        if (prevValueRef.current !== value) {
            const obj = { value: prevValueRef.current };

            gsap.to(obj, {
                value,
                duration,
                ease: 'power2.out',
                onUpdate: () => {
                    setDisplayValue(parseFloat(obj.value.toFixed(decimals)));
                },
                onComplete: () => {
                    prevValueRef.current = value;
                },
            });
        }
    }, [value, duration, decimals]);

    return displayValue;
};
