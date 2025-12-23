import React from "react";
import { motion } from "motion/react";

interface StatItemProps {
  title: string;
  value: number;
  icon: string;
  gradient: {
    from: string;
    to: string;
  };
}

function StatItem({ title, value, icon, gradient }: StatItemProps) {
  return (
    <motion.div
      className="text-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
      style={{
        background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
          <i className={`${icon} text-xl text-white`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white/90 mb-1" style={{ fontFamily: 'var(--font-vazir)' }}>
            {title}
          </p>
          <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-vazir)' }}>
            {value.toLocaleString('fa-IR')}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default StatItem;
