import React from 'react';
import './AmbientBackground.css';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-glow ambient-glow-top" />
      <div className="ambient-glow ambient-glow-right" />
      <div className="ambient-subtle-noise" />
    </div>
  );
};
