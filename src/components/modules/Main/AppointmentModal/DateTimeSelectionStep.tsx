import React from "react";
import { motion } from "motion/react";

interface DateTimeSelectionStepProps {
  onContinue: () => void;
}

export function DateTimeSelectionStep({
  onContinue,
}: DateTimeSelectionStepProps) {
  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    ></motion.div>
  );
}
