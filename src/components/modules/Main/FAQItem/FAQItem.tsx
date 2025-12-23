import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isFaqOpen, setIsFaqOpen] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
      whileHover={{ scale: 1.01 }}
      initial={false}
    >
      <motion.div
        onClick={() => setIsFaqOpen(prev => !prev)}
        className="p-5 md:p-6 cursor-pointer"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-estedad-semibold text-dark text-base md:text-lg flex-1">
                            {question}
          </h3>
          <motion.div
            animate={{ rotate: isFaqOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20 rounded-full"
          >
            <i className={`fas ${isFaqOpen ? 'fa-minus' : 'fa-plus'} text-accent`}></i>
          </motion.div>
                        </div>
      </motion.div>

      <AnimatePresence>
        {isFaqOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 border-t border-gray-100">
              <p className="text-paragray font-estedad-light leading-relaxed text-justify">
                            {answer}
              </p>
                        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FAQItem
