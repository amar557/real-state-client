import { MdLocationOn } from "react-icons/md";
import img from "../assets/new.jpeg";
import { useNavigate } from "react-router-dom";
function Card({ item }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-[30%] bg-white rounded-lg overflow-hidden shadow-lg  cursor-pointer"
      onClick={() => navigate(`/listItem/${item._id}`)}
    >
      <div className="h-[320px] sm:h-[220px] overflow-hidden">
        <img
          src={item.imageUrls[0]}
          alt=""
          className=" hover:scale-105 transition-scale cursor-pointer duration-300 w-full h-full object-cover"
          // loading="lazy"
        />
      </div>
      <div className="mt-6 px-3 pb-2 gap-2 flex flex-col  ">
        <h3 className="text-base font-semibold">{item.name}</h3>
        <p className="text-xs flex items-center justify-start gap-1  text-[#14532d]">
          <MdLocationOn />
          <span className="text-slate-500">{item.address}</span>
        </p>
        <p className="text-xs text-slate-500 ">
          {item.description.split(" ").slice(0, 15).join(" ")}...
        </p>
        <span className="text-slate-600 font-semibold">
          ${item.regularPrice}
        </span>
        <p className="text-xs capitalize font-semibold space-x-3">
          <span>{item.bathrooms} baths</span> <span>{item.bedrooms} rooms</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
