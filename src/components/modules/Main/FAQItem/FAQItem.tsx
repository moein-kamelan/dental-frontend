import React, { useState } from 'react'

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isFaqOpen , setIsFaqOpen] = useState(false)

  return (
       <div className=''>

                       <div  onClick={() => setIsFaqOpen(prev => !prev)}  className="bg-primary/20 rounded-sm  p-6" >
                        <div className="font-estedad-semibold text-dark cursor-pointer flex items-center justify-between">
                            {question}
                            <i className="fas fa-plus text-primary"></i>
                        </div>
                    
                    </div>
                        <div  className={`text-paragray font-estedad-light bg-primary/20   transition-all duration-300 px-4   rounded-bl-sm rounded-br-sm  overflow-hidden text-justify ${isFaqOpen ? "border-t border-t-gray-300 max-h-80 py-4 opacity-100 visible" : "max-h-0 invisible opacity-0"} `}>
                            {answer}
                            
                        </div>
                
                
             </div>
  )
}

export default FAQItem
