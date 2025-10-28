import React from 'react'

function HelpLine() {
  return (
        <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h5 className="text-primary font-bold text-lg">کمک اضطراری</h5>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark">نیاز به تماس ضروری</h2>
                        <p className="text-paragray leading-relaxed">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    </div>
                    
                    <ul className="space-y-4 text-paragray">
                        <li className="flex items-start gap-3">
                            <i className="fas fa-check-circle text-secondary mt-1"></i>
                            <span>۲۴/۷ با بیمارستان ما تماس بگیرید.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fas fa-check-circle text-secondary mt-1"></i>
                            <span>۲۴ ساعت در بیمارستان ما باز است.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="fas fa-check-circle text-secondary mt-1"></i>
                            <span>اورژانس با شماره تلفن ما تماس بگیرید.</span>
                        </li>
                    </ul>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl">
                            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                                <i className="fas fa-phone-alt text-primary text-2xl"></i>
                            </div>
                            <div>
                                <p className="text-sm text-paragray">شماره تماس</p>
                                <a href="callto:123456789" className="font-bold text-dark">۱۳ ۲۳۲۳ ۰۴۵ ۸۸۰+</a>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl">
                            <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                                <i className="fas fa-comment-alt-lines text-primary text-2xl"></i>
                            </div>
                            <div>
                                <p className="text-sm text-paragray">ارسال ایمیل</p>
                                <a href="mailto:example@gmail.com" className="font-bold text-dark">help.info@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <img src="images/helpline_img.png" alt="helpline" className="w-full"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HelpLine