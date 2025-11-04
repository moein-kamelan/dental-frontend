import React from "react";

function StatItem() {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl py-7.5 px-5">
      <div className="flex items-center gap-5">
        <div className="size-15 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <i className="far fa-handshake text-3xl text-accent"></i>
        </div>
        <div>
          <p className="text-sm font-estedad-light">تعداد نوبت ها</p>
          <h3 className="text-[34px] font-estedad-semibold">۲۵۵</h3>
          <p className="text-sm font-estedad-light">۱۵ روز</p>
        </div>
      </div>
    </div>
  );
}

export default StatItem;
