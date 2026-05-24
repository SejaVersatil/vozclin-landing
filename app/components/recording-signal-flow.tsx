"use client";

import { useEffect, useState } from "react";

const heartbeatPaths = {
  rest:
    "M0 142 C22 141 38 144 58 142 C80 140 92 137 108 142 C124 147 138 148 152 142 L174 142 L184 132 L194 153 L206 123 L220 166 L234 142 C254 139 270 140 288 142 C306 145 320 146 338 142 L360 142",
  lift:
    "M0 142 C22 140 38 145 58 142 C80 140 92 136 108 142 C124 148 138 149 152 142 L174 142 L184 129 L194 158 L206 118 L220 172 L234 142 C254 138 270 140 288 142 C306 146 320 147 338 142 L360 142",
  settle:
    "M0 142 C22 142 38 143 58 142 C80 141 92 139 108 142 C124 145 138 147 152 142 L174 142 L184 136 L194 149 L206 131 L220 156 L234 142 C254 140 270 141 288 142 C306 144 320 145 338 142 L360 142"
};

export function RecordingSignalFlow() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);

    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return (
    <figure className="recording-signal-flow" aria-hidden="true">
      <div className="recording-status-pill">
        <span className="recording-status-dot" />
        <span>Gravando</span>
      </div>

      <svg className="recording-signal-svg" viewBox="0 0 720 280" focusable="false" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="heartbeatFlowSegment" d={heartbeatPaths.rest}>
            {!reducedMotion && (
              <animate
                attributeName="d"
                dur="1.48s"
                repeatCount="indefinite"
                keyTimes="0;0.18;0.34;0.58;1"
                values={`${heartbeatPaths.rest};${heartbeatPaths.lift};${heartbeatPaths.settle};${heartbeatPaths.rest};${heartbeatPaths.rest}`}
              />
            )}
          </path>

          <linearGradient id="recordingSignalStroke" x1="0" x2="720" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#082622" stopOpacity="0.16" />
            <stop offset="38%" stopColor="#08766f" stopOpacity="0.92" />
            <stop offset="70%" stopColor="#6f8e7f" stopOpacity="0.74" />
            <stop offset="100%" stopColor="#082622" stopOpacity="0.24" />
          </linearGradient>

          <linearGradient id="recordingSignalFade" x1="0" x2="720" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="black" />
            <stop offset="13%" stopColor="white" />
            <stop offset="87%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>

          <mask id="recordingSignalMask">
            <rect width="720" height="280" fill="url(#recordingSignalFade)" />
          </mask>
        </defs>

        <rect width="720" height="280" fill="transparent" />
        <rect className="recording-signal-panel-line" x="84" y="140.5" width="552" height="1" rx="0.5" />

        <g mask="url(#recordingSignalMask)" strokeLinecap="round" strokeLinejoin="round">
          <g className="recording-signal-stream">
            {!reducedMotion && (
              <animateTransform
                attributeName="transform"
                type="translate"
                from="0 0"
                to="-360 0"
                dur="5.6s"
                repeatCount="indefinite"
              />
            )}
            <g className="recording-signal-glow" stroke="rgba(8, 118, 111, 0.13)">
              <use href="#heartbeatFlowSegment" />
              <use href="#heartbeatFlowSegment" x="360" />
              <use href="#heartbeatFlowSegment" x="720" />
              <use href="#heartbeatFlowSegment" x="1080" />
            </g>
            <g className="recording-signal-main" stroke="url(#recordingSignalStroke)">
              <use href="#heartbeatFlowSegment" />
              <use href="#heartbeatFlowSegment" x="360" />
              <use href="#heartbeatFlowSegment" x="720" />
              <use href="#heartbeatFlowSegment" x="1080" />
            </g>
          </g>
        </g>
      </svg>
    </figure>
  );
}
