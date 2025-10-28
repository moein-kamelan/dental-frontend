import React from "react";

function GoogleMap() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2527999752!2d-74.14448764398652!3d40.69763123336165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1685551467309!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{border : "auto"}}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default GoogleMap;
