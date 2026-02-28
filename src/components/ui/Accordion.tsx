'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

function AccordionItemComponent({ question, answer }: AccordionItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#2d2d2d] hover:bg-[#414141] text-white text-left px-6 py-5 text-lg font-medium transition"
      >
        <span>{question}</span>
        {isOpen ? <FiMinus className="w-6 h-6 flex-shrink-0" /> : <FiPlus className="w-6 h-6 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-[#2d2d2d] border-t border-gray-700 px-6 py-5 text-lg text-gray-200">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItemComponent key={index} {...item} />
      ))}
    </div>
  );
}
