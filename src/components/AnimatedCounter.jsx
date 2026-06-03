import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

/**
 * AnimatedCounter
 * A high-fidelity reusable component that parses numbers like "1,200+", "₹1.2 Cr", "95%", "#15"
 * and counts up smoothly from 0 when it enters the viewport.
 */
const AnimatedCounter = ({ value, duration = 1, className = "" }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === 'number') {
    return (
      <span ref={ref} className={className}>
        {inView ? <CountUp start={0} end={value} duration={duration} separator="," /> : '0'}
      </span>
    );
  }

  const cleanVal = String(value).trim();
  const numberMatch = cleanVal.match(/[\d.]+/);
  
  if (!numberMatch) {
    return <span className={className}>{value}</span>;
  }

  const numberStr = numberMatch[0];
  const numberVal = parseFloat(numberStr);
  const index = cleanVal.indexOf(numberStr);
  const prefix = cleanVal.slice(0, index);
  const suffix = cleanVal.slice(index + numberStr.length);

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={numberVal}
          decimals={numberStr.includes('.') ? numberStr.split('.')[1].length : 0}
          duration={duration}
          separator=","
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  );
};

export default AnimatedCounter;
