import React from 'react'

function SectionContainer( {children} : {children: React.ReactNode} ) {
  return (
    <div className="bg-white/92 border border-primary/10 backdrop-blur-md p-6 min-h-50 rounded-2xl shadow-[0_16px_45px_rgba(18,54,63,0.10)]">{children}</div>
  );
}

export default SectionContainer;
