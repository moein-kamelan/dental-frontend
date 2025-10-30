import React from 'react'

function CommentCard() {
  return (
      <div className="bg-white rounded-lg  p-8 shadow-lg">
                    <div className="flex gap-1 text-yellow-400 mb-4">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                    <p className="text-paragray mb-6 font-estedad-light line-clamp-3">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-4">
                        <img src="images/review-1.png" alt="reviewer" className="w-16 h-16 rounded-full"/>
                        <div>
                            <h3 className="font-bold text-dark">محسن دادار</h3>
                            <span className="text-paragray text-sm font-estedad-light">مشتری</span>
                        </div>
                    </div>

                    <img src="/images/review-shape.png " alt="review-shape" className='w-[42px] h-8 shrink-0'/>

                    </div>
                </div>
  )
}

export default CommentCard