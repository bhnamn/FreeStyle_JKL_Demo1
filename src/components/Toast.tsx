import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-xl bg-[#161922] border border-[#c89d56]/40 text-white shadow-2xl flex items-center gap-3 backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-lg bg-[#c89d56]/20 flex items-center justify-center text-[#c89d56] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs flex-1 font-medium leading-snug text-[#e2e5ee]">
            {message}
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-md text-[#717684] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
