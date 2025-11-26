import React from 'react'
import { Link } from 'react-router-dom'

function FaqContent() {
  return (
    <div className="lg:col-span-1">
    <h3 className=" font-estedad-verybold text-4xl text-dark mb-6">
      آیا سوالی دارید؟
    </h3>
    <div className="space-y-4 text-paragray font-estedad-light text-justify leading-relaxed">
  
      <p>
      در این بخش می‌توانید پاسخ سوالات رایج خود را پیدا کنید. اگر سوال
              خاصی دارید، می‌توانید از طریق این فرم  با ما در ارتباط
              باشید.
      </p>
    </div>
    <Link
      to="/contact"
      className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue   mt-6 main-btn "
    >
      تماس با ما
    </Link>
  </div>
  )
}

export default FaqContent
