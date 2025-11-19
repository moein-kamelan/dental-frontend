import React from 'react'

function SectionContainer( {children} : {children: React.ReactNode} ) {
  return (
    <div className="bg-purple-300/80  border-2 border-purple-400 backdrop-blur-[2px]  p-6 min-h-50 rounded-xl shadow-lg">{children}</div>
  );
}

export default SectionContainer;
