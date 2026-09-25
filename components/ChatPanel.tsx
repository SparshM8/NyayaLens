'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/lib/types';
import { MessageSquare, Send, Sparkles, User, CheckCircle2, AlertCircle, Bookmark, CornerDownRight } from 'lucide-react';

interface ChatPanelProps {
  documentText: string;
  documentTitle: string;
}

export default function ChatPanel({ documentText, documentTitle }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I have analyzed "${documentTitle}". You can ask me any question about obligations, notice periods, non-compete clauses, salary terms, or liabilities, and I will answer with exact clause citations.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGrounded: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'What happens if I leave this company before one year?',
    'Can I do freelancing or side projects on weekends?',
    'What is the notice period and can I buy it out?',
    'Am I personally liable if a client complains about a bug?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      const customKey = typeof window !== 'undefined' ? localStorage.getItem('NYAYALENS_GEMINI_API_KEY') || '' : '';

      const chatHistory = messages.map((m) => ({
        role: m.sender,
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(customKey ? { 'x-gemini-api-key': customKey } : {}),
        },
        body: JSON.stringify({
          documentText,
          chatHistory,
          question: userMessage.text,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve grounded answer');
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: 'assistant-' + Date.now(),
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relevantClauses: data.relevantClauses,
        whatToVerify: data.whatToVerify,
        isGrounded: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          sender: 'assistant',
          text: 'I could not process this question against the document context right now. Please verify your connection or Gemini API key.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isGrounded: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 shadow-2xl flex flex-col h-[650px] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Ask Your Document
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grounded Q&amp;A
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
              Answers verified against {documentTitle}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Clause Citations Active</span>
        </div>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="px-4 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-[11px] text-slate-500 uppercase font-bold shrink-0">
          Try Asking:
        </span>
        {samplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap text-[11px] transition-colors flex items-center space-x-1 disabled:opacity-50"
          >
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Messages stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((message) => {
          const isUser = message.sender === 'user';

          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{message.text}</div>

                {/* Grounding & Verification Box for Assistant responses */}
                {!isUser && (message.relevantClauses || message.whatToVerify) && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                    {message.relevantClauses && message.relevantClauses.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                          <Bookmark className="w-3 h-3 text-blue-400" />
                          Relevant Clauses:
                        </span>
                        {message.relevantClauses.map((c, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950/80 text-blue-300 border border-blue-500/30"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {message.whatToVerify && (
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-amber-300 flex items-start space-x-1.5">
                        <CornerDownRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-400">What to verify: </strong>
                          <span>{message.whatToVerify}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`text-[10px] flex items-center justify-end ${
                    isUser ? 'text-blue-200' : 'text-slate-500'
                  }`}
                >
                  <span>{message.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-slate-400 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>Reading document text and synthesizing answer...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-4 bg-slate-950/80 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about this contract (e.g. 'What is the penalty for leaving early?')..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
