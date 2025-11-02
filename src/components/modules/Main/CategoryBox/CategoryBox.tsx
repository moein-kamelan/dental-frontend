import React from 'react'

function CategoryBox() {
  return (
      <div className=" section-border text-dark p-6">
                <h5 className="main-header">دسته‌بندی</h5>
                <ul className="space-y divide-y-2 divide-main-border-color">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      اورولوژی
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                     >
                      متخصص زنان و
                      زایمان
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      پزشکی
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      اطفال
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      تست کرونا
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      دندانپزشکی
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                </ul>
              </div>
  )
}

export default CategoryBox