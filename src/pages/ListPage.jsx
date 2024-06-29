import { useEffect, useState } from "react";
import img from "../assets/first.png";
import { link } from "../firebase/api";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa6";
function ListPage() {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState({});
  useEffect(() => {
    const getItemData = async function () {
      setLoading(true);
      const res = await fetch(`${link}/api/listingitem/${param.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setResData(data);

      setLoading(false);
    };
    getItemData();
  }, [param.id]);

  return (
    <>
      {!resData.name ? (
        "loading"
      ) : (
        <div>
          <div>
            <img
              src={resData.imageUrls[0]}
              alt=""
              className="w-full h-[80vh] object-cover"
            />
          </div>
          <div className="w-3/5 mx-auto">
            <p className="py-3 text-2xl font-semibold">
              {resData.name} - $ {resData.regularPrice} / month
            </p>
            <p className="flex items-center justify-start gap-2 text-sm mb-3 font-medium">
              <FaLocationDot className="text-green-900" />
              <span>456 Serenity Lane, Meadowville</span>
            </p>
            <div className="flex gap-3 ">
              <button className="bg-red-900 text-white rounded-md py-1  capitalize w-full max-w-[200px]">
                for {resData.type}
              </button>
              <button className="bg-green-900 text-white rounded-md py-1  capitalize w-full max-w-[200px]">
                $ {resData.regularPrice - resData.discountPrice} discount
              </button>
            </div>
            <div className=" my-3">
              <span className="font-semibold ">Description: </span>
              <span>{resData.description}</span>
            </div>
            <div className="text-green-900 flex items-center text-sm font-semibold capitalize gap-4 mb-3">
              <span className="flex items-center  gap-1">
                <FaBed />
                <span>{resData.bathrooms} beds</span>
              </span>
              <span className="flex items-center  gap-1">
                <FaBath />
                <span>{resData.bedrooms} bath</span>
              </span>
              <span className="flex items-center  gap-1">
                <FaParking />
                <span>{resData.parking ? "parking" : "no parking"}</span>
              </span>
              <span className="flex items-center  gap-1">
                <FaChair />
                <span>{resData.furnished ? "furnished" : "not furnished"}</span>
              </span>
            </div>
            <button className="bg-slate-700 w-full py-2 text-white  uppercase rounded-lg">
              contact landlord
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ListPage;
