"use client";

import React, { useState, useEffect, useRef } from "react";

interface ShapeGridProps {
  speed?: number;
  squareSize?: number;
  direction?: "up" | "down" | "left" | "right" | "diagonal";
  borderColor?: string;
  hoverFillColor?: string;
  shape?: "square" | "hexagon" | "circle" | "triangle";
  hoverTrailAmount?: number;
  // Fallback duplicates provided by user
  size?: number;
  hoverColor?: string;
}

export default function ShapeGrid({
  speed = 0.5,
  squareSize = 40,
  direction = "diagonal",
  borderColor = "#2F293A",
  hoverFillColor = "#222222",
  shape = "square",
  hoverTrailAmount = 0,
  size,
  hoverColor,
}: ShapeGridProps) {
  const actualSize = size || squareSize;
  const actualHoverColor = hoverColor || hoverFillColor;

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const cols = Math.ceil(dimensions.width / actualSize);
  const rows = Math.ceil(dimensions.height / actualSize);

  const getAnimationDelay = (col: number, row: number) => {
    switch (direction) {
      case "diagonal":
        return (col + row) * 0.02;
      case "up":
        return (rows - row) * 0.02;
      case "down":
        return row * 0.02;
      case "left":
        return (cols - col) * 0.02;
      case "right":
        return col * 0.02;
      default:
        return 0;
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      <style>{`
        @keyframes shape-fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .shape-item {
          opacity: 0;
          transition: fill ${speed}s ease-out;
          transform-origin: center;
          animation: shape-fade-in 0.6s ease-out forwards;
        }
        .shape-item:hover {
          fill: ${actualHoverColor};
          transition: none;
        }
      `}</style>
      <svg width="100%" height="100%">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const id = `shape-${row}-${col}`;
            const x = col * actualSize;
            const y = row * actualSize;
            const delay = getAnimationDelay(col, row);

            const sharedProps = {
              key: id,
              id: id,
              className: "shape-item pointer-events-auto",
              stroke: borderColor,
              strokeWidth: 1,
              fill: "transparent",
              style: {
                animationDelay: `${delay}s`,
                transformOrigin: `${x + actualSize / 2}px ${y + actualSize / 2}px`,
              },
            };

            switch (shape) {
              case "circle":
                return (
                  <circle
                    cx={x + actualSize / 2}
                    cy={y + actualSize / 2}
                    r={actualSize / 2}
                    {...sharedProps}
                  />
                );
              case "triangle":
                return (
                  <polygon
                    points={`${x + actualSize / 2},${y} ${x + actualSize},${y + actualSize} ${x},${y + actualSize}`}
                    {...sharedProps}
                  />
                );
              case "hexagon":
                return (
                  <polygon
                    points={`${x + actualSize / 2},${y} ${x + actualSize},${y + actualSize / 4} ${x + actualSize},${y + actualSize * 0.75} ${x + actualSize / 2},${y + actualSize} ${x},${y + actualSize * 0.75} ${x},${y + actualSize / 4}`}
                    {...sharedProps}
                  />
                );
              case "square":
              default:
                return (
                  <rect
                    x={x}
                    y={y}
                    width={actualSize}
                    height={actualSize}
                    {...sharedProps}
                  />
                );
            }
          })
        )}
      </svg>
    </div>
  );
}
