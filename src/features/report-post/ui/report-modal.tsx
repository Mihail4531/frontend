"use client";

import { useState } from "react";
import { X, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { reportApi } from "../api/report.api";

const REASONS = [
  { id: "spam", label: "Спам или реклама" },
  { id: "insult", label: "Оскорбления / Токсичность" },
  { id: "scam", label: "Мошенничество / Скам" },
  { id: "other", label: "Другое (опишите ниже)" },
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

export const ReportModal = ({ isOpen, onClose, postId }: ReportModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedReason) return;
    
    setIsLoading(true);
    setError("");

    try {
      await reportApi.sendReport({
        post_id: postId,
        reason: selectedReason,
        details: selectedReason === "other" ? details : undefined,
      });

      setIsSuccess(true);
      
      // Автоматически закрываем через 2 секунды
      setTimeout(() => {
        onClose();
        // Сброс стейта после закрытия
        setTimeout(() => {
          setIsSuccess(false);
          setSelectedReason("");
          setDetails("");
        }, 300);
      }, 2000);

    }  finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Затемнение фона */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Само окно */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Кнопка закрыть */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {isSuccess ? (
            // ЭКРАН УСПЕХА
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Жалоба отправлена</h3>
              <p className="text-zinc-400 text-sm">Мы проверим этот пост в ближайшее время.</p>
            </div>
          ) : (
            // ЭКРАН ФОРМЫ
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Пожаловаться</h3>
                  <p className="text-zinc-400 text-xs">Что не так с этим постом?</p>
                </div>
              </div>

              {/* Список причин */}
              <div className="space-y-2 mb-6">
                {REASONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                        setSelectedReason(r.id);
                        setError("");
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all duration-200
                      ${selectedReason === r.id 
                        ? "bg-zinc-800 border-zinc-600 text-white shadow-inner" 
                        : "bg-transparent border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}
                    `}
                  >
                    <span>{r.label}</span>
                    {selectedReason === r.id && <div className="w-2 h-2 rounded-full bg-red-500" />}
                  </button>
                ))}
              </div>

              {/* Поле ввода для "Другое" */}
              {selectedReason === "other" && (
                <div className="mb-6 animate-in slide-in-from-top-2">
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Опишите проблему подробнее..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 min-h-[80px] resize-none"
                  />
                </div>
              )}

              {/* Ошибка */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                  {error}
                </div>
              )}

              {/* Кнопка отправки */}
              <button
                onClick={handleSubmit}
                disabled={!selectedReason || isLoading}
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Отправка...
                  </>
                ) : (
                  "Отправить жалобу"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};