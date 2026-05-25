"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AudioLines, Mic2, RotateCcw, ShieldCheck, Square, Sparkles } from "lucide-react";

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

function getSpeechRecognition() {
  const speechWindow = window as SpeechRecognitionWindow;
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

export function VoiceTranscriptionDemo() {
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalTranscriptRef = useRef("");
  const shouldListenRef = useRef(false);

  const [support, setSupport] = useState<"checking" | "supported" | "unsupported">("checking");
  const [isListening, setIsListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [notice, setNotice] = useState("Clique no microfone e fale uma frase curta.");

  const transcriptText = useMemo(
    () => [finalTranscript, interimTranscript].filter(Boolean).join(" ").trim(),
    [finalTranscript, interimTranscript]
  );

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
    setNotice("Clique no microfone e fale uma frase curta.");
  }

  return (
    <section className="voice-demo-section section-wrap" aria-labelledby="voice-demo-title">
      <div className="voice-demo-shell">
        <div className="voice-demo-copy">
          <span className="voice-demo-eyebrow">
            <Sparkles size={15} />
            Demonstração interativa
          </span>
          <h2 id="voice-demo-title">Transforme sua voz</h2>
          <p>
            Permita o microfone, fale uma frase curta e veja a fala ganhar forma
            em uma conversa limpa, segura e pronta para virar rascunho revisável.
          </p>
          <div className="voice-demo-trust">
            <span>
              <ShieldCheck size={16} />
              Sem envio para o backend do VozClin
            </span>
            <span>
              <AudioLines size={16} />
              Reconhecimento nativo do navegador
            </span>
          </div>
        </div>

        <div className="voice-chat-card">
          <div className="voice-chat-topbar">
            <div>
              <span className={isListening ? "voice-status active" : "voice-status"}>
                <span aria-hidden="true" />
                {isListening ? "Gravando agora" : support === "unsupported" ? "Navegador sem suporte" : "Pronto para testar"}
              </span>
              <strong>Conversa de demonstração</strong>
            </div>
            <button className="voice-reset-button" type="button" onClick={resetTranscript}>
              <RotateCcw size={16} />
              Limpar
            </button>
          </div>

          <div className={isListening ? "voice-live-line active" : "voice-live-line"} aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} style={{ animationDelay: `${index * 54}ms` }} />
            ))}
          </div>

          <div className="voice-chat-window" aria-live="polite">
            <div className="voice-chat-message assistant">
              <span>VozClin</span>
              <p>Fale como se estivesse ditando uma observação clínica simples.</p>
            </div>

            <div className={transcriptText ? "voice-chat-message user filled" : "voice-chat-message user"}>
              <span>Você</span>
              <p>
                {transcriptText || "Sua fala aparecerá aqui em tempo real assim que o microfone estiver ativo."}
              </p>
            </div>

            {finalTranscript ? (
              <div className="voice-chat-message assistant summary">
                <span>Rascunho seguro</span>
                <p>Texto capturado para revisão profissional antes de qualquer uso clínico.</p>
              </div>
            ) : null}
          </div>

          <div className="voice-controls">
            <button
              className={isListening ? "voice-mic-button listening" : "voice-mic-button"}
              type="button"
              onClick={toggleListening}
              disabled={support === "checking"}
              aria-pressed={isListening}
            >
              {isListening ? <Square size={18} /> : <Mic2 size={20} />}
              {isListening ? "Parar captura" : "Clique e fale"}
            </button>
            <p>{notice}</p>
          </div>

          <p className="voice-demo-disclaimer">
            Demonstração visual. Não informe dados reais de pacientes neste teste.
          </p>
        </div>
      </div>
    </section>
  );
}
