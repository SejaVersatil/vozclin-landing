"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Square } from "lucide-react";

type SpeechRecognitionAlternativeLike = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0?: SpeechRecognitionAlternativeLike;
};

type SpeechRecognitionResultListLike = {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
};

type SpeechRecognitionEventLike = Event & {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
};

type SpeechRecognitionErrorEventLike = Event & {
  error: string;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort?: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const errorMessages: Record<string, string> = {
  "audio-capture": "Não encontramos um microfone ativo neste navegador.",
  "not-allowed": "Permissão de microfone recusada. Libere o acesso para testar.",
  "service-not-allowed": "O navegador bloqueou o reconhecimento de voz nesta página.",
  network: "O reconhecimento nativo do navegador não respondeu agora.",
  "no-speech": "Não detectamos fala. Tente novamente falando perto do microfone."
};

const botGreeting = "Bem vindo ao VozClin, teste o poder da sua voz!";

function getSpeechRecognition() {
  const speechWindow = window as SpeechRecognitionWindow;
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

export function VoiceTranscriptionDemo() {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalTranscriptRef = useRef("");
  const shouldListenRef = useRef(false);

  const [support, setSupport] = useState<"checking" | "supported" | "unsupported">("supported");
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [notice, setNotice] = useState("Clique no microfone e fale.");
  const [botMessage, setBotMessage] = useState("");

  const transcriptText = useMemo(
    () => [finalTranscript, interimTranscript].filter(Boolean).join(" ").trim(),
    [finalTranscript, interimTranscript]
  );
  const statusLabel = support === "unsupported" ? "Indisponível" : isListening ? "Escutando" : "Pronto";

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();

    if (!SpeechRecognition) {
      queueMicrotask(() => {
        setSupport("unsupported");
        setNotice("Teste disponível no Chrome ou Edge com permissão de microfone.");
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setNotice("Escutando em tempo real...");
    };

    recognition.onresult = (event) => {
      let finalChunk = "";
      let interimChunk = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const text = result?.[0]?.transcript?.trim();

        if (!text) {
          continue;
        }

        if (result.isFinal) {
          finalChunk += `${text} `;
        } else {
          interimChunk += `${text} `;
        }
      }

      if (finalChunk) {
        const nextTranscript = `${finalTranscriptRef.current} ${finalChunk}`.replace(/\s+/g, " ").trim();
        finalTranscriptRef.current = nextTranscript;
        setFinalTranscript(nextTranscript);
      }

      setInterimTranscript(interimChunk.trim());
    };

    recognition.onerror = (event) => {
      shouldListenRef.current = false;
      setIsListening(false);
      setNotice(errorMessages[event.error] ?? "Não foi possível capturar a fala neste momento.");
    };

    recognition.onend = () => {
      setIsListening(false);

      if (shouldListenRef.current) {
        shouldListenRef.current = false;
        setNotice(finalTranscriptRef.current ? "Transcrição pausada." : "Pronto para uma nova tentativa.");
      } else if (finalTranscriptRef.current) {
        setNotice("Texto capturado como rascunho da conversa.");
      }
    };

    recognitionRef.current = recognition;
    queueMicrotask(() => setSupport("supported"));

    return () => {
      shouldListenRef.current = false;
      try {
        recognition.abort?.();
        recognition.stop();
      } catch {
        // Alguns navegadores disparam erro se a captura nunca foi iniciada.
      }
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldReduceMotion) {
      const reducedMotionTimer = window.setTimeout(() => setBotMessage(botGreeting), 0);

      return () => window.clearTimeout(reducedMotionTimer);
    }

    let index = 0;
    let typingTimer: number | undefined;
    const initialDelay = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        index += 1;
        setBotMessage(botGreeting.slice(0, index));

        if (index >= botGreeting.length && typingTimer) {
          window.clearInterval(typingTimer);
        }
      }, 34);
    }, 420);

    return () => {
      window.clearTimeout(initialDelay);

      if (typingTimer) {
        window.clearInterval(typingTimer);
      }
    };
  }, []);

  function toggleListening() {
    if (support !== "supported" || !recognitionRef.current) {
      setNotice("Use Chrome ou Edge em uma página HTTPS para testar a voz.");
      return;
    }

    if (isListening) {
      shouldListenRef.current = false;
      recognitionRef.current.stop();
      setNotice("Finalizando captura...");
      return;
    }

    try {
      shouldListenRef.current = true;
      setInterimTranscript("");
      recognitionRef.current.start();
    } catch {
      shouldListenRef.current = false;
      setNotice("A captura já está ativa. Aguarde alguns segundos e tente novamente.");
    }
  }

  function resetTranscript() {
    if (isListening && recognitionRef.current) {
      shouldListenRef.current = false;
      recognitionRef.current.stop();
    }

    finalTranscriptRef.current = "";
    setFinalTranscript("");
    setInterimTranscript("");
    setNotice("Clique no microfone e fale.");
  }

  return (
    <section className="voice-demo-section section-wrap" aria-labelledby="voice-demo-title">
      <div className="voice-demo-shell">
        <div className={isListening ? "voice-chat-card listening" : "voice-chat-card"}>
          <div className="voice-chat-header">
            <h2 id="voice-demo-title">Teste sua Voz</h2>
            <span className={isListening ? "voice-chat-status active" : "voice-chat-status"}>
              {statusLabel}
            </span>
          </div>

          <div className={isListening ? "voice-live-line active" : "voice-live-line"} aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} style={{ animationDelay: `${index * 54}ms` }} />
            ))}
          </div>

          <div className="voice-chat-window" aria-live="polite">
            <div className="voice-chat-message assistant">
              <span className="medical-bot-avatar" aria-hidden="true">
                <svg className="voice-doctor-mark" viewBox="0 0 48 48" focusable="false">
                  <path className="voice-doctor-v" d="M13.5 15.5 22 33l8.2-17.5" />
                  <path className="voice-doctor-pulse" d="M29.5 27h3.1l1.8-3.8 2.3 8.4 1.7-4.6h3.1" />
                  <circle className="voice-doctor-dot" cx="38.2" cy="35.4" r="3.2" />
                  <path className="voice-doctor-plus" d="M14.5 34.5h5m-2.5-2.5v5" />
                </svg>
              </span>
              <div className="voice-message-body">
                <strong>Dr. VozClin</strong>
                <p className={botMessage.length < botGreeting.length ? "typing" : undefined}>
                  {botMessage || "\u00A0"}
                </p>
              </div>
            </div>

            {transcriptText || isListening ? (
              <div className={transcriptText ? "voice-chat-message user filled" : "voice-chat-message user listening"}>
                <div className="voice-message-body">
                  <strong>Você</strong>
                  <p>{transcriptText || "Escutando..."}</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="voice-controls">
            <button
              className={isListening ? "voice-mic-button listening" : "voice-mic-button"}
              type="button"
              onClick={toggleListening}
              aria-pressed={isListening}
              aria-label={isListening ? "Parar teste de voz" : "Iniciar teste de voz"}
            >
              <span className="voice-mic-icon" aria-hidden="true">
                {isListening ? (
                  <Square size={13} />
                ) : (
                  <svg className="voice-mic-mark" viewBox="0 0 24 24" focusable="false">
                    <path d="M12 4.5a3 3 0 0 0-3 3v4.2a3 3 0 0 0 6 0V7.5a3 3 0 0 0-3-3Z" />
                    <path d="M6.7 11.5a5.3 5.3 0 0 0 10.6 0M12 17v2.7M9 19.7h6" />
                    <path d="M18.5 8.8h1.8m-1.2-2 1.3-1.3" />
                  </svg>
                )}
              </span>
              <span>{isListening ? "Parar" : "Falar"}</span>
            </button>
            <p>{notice}</p>
            {transcriptText ? (
              <button className="voice-reset-button" type="button" onClick={resetTranscript} aria-label="Limpar conversa">
                <RotateCcw size={18} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
