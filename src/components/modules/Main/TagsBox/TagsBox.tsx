import React from 'react'

function TagsBox() {
  return (
    <aside className="content-aside-card tags-panel text-dark p-6" aria-label="برچسب مقالات">
                <h5 className="main-header">برچسب مقالات</h5>
                <ul className="flex items-center flex-wrap gap-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      اورولوژی
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                     >
                      متخصص زنان و
                      زایمان
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      پزشکی
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      اطفال
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      تست کرونا
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      دندانپزشکی
                      
                    </a>
                  </li>
                </ul>
              </aside>
  )
}

export default TagsBox
