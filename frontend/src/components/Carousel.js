import React from "react";
import { Carousel } from "react-responsive-carousel";

const Caro =() => {
return(
<Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
    <div>
      <img alt="" src="/assets/11.webp" />
    </div>
    <div>
      <img alt="" src="/assets/12.webp" />
    </div>
    <div>
      <img alt="" src="/assets/13.webp" />
    </div>
    

        </Carousel>
        )
}

export default Caro;