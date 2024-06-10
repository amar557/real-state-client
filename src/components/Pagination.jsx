import img1 from "../assets/first.png";
import img2 from "../assets/second.jpeg";
import img3 from "../assets/third.jpeg";
import img4 from "../assets/fourth.jpeg";

import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const swiperimages = [img1, img2, img3, img4];
function PaginationCmp() {
  return (
    <div className="">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {swiperimages.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt="" className="w-full h-[80vh] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PaginationCmp;
