import { MdLocationOn } from "react-icons/md";
import img from "../assets/new.jpeg";
function Card() {
  let text =
    " Escape the hustle and bustle of city life in this 4-bedroom, 2-bathroom lakeside home. Fish off your own private dock, take in breathtaking sunsets from the screened porch, and unwind in the spacious master suite. Perfect for nature enthusiasts.";

  return (
    <div className="w-[30%] bg-white rounded-lg overflow-hidden shadow-lg ">
      <img src={img} alt="" className="h-full w-full" />
      <div className="mt-6 px-3 pb-2 gap-2 flex flex-col  ">
        <h3 className="text-base font-semibold">Tranquil Lakeside Retreat</h3>
        <p className="text-xs flex items-center justify-start gap-1  text-[#14532d]">
          <MdLocationOn />
          <span className="text-slate-500">
            789 Serenity Drive, Lakeview Haven, FAKE789
          </span>
        </p>
        <p className="text-xs text-slate-500 ">
          {text.split(" ").slice(0, 15).join(" ")}...
        </p>
        <span className="text-slate-600 font-semibold">$220</span>
        <p className="text-xs capitalize font-semibold space-x-3">
          <span>5 baths</span> <span>6 rooms</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
