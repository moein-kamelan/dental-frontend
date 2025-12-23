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
      className="text-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
      style={{
        background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
          <i className={`${icon} text-base text-white`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white/90 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
            {title}
          </p>
          <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-vazir)' }}>
            {value.toLocaleString('fa-IR')}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default StatItem;
