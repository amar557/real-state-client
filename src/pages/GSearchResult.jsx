import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { link } from "../firebase/api";
import Card from "../components/Card";
function GSearchResult() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [sideFormData, setSideFormData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const handleChanges = function (e) {
    if (
      e.target.id === "all" ||
      e.target.id === "sell" ||
      e.target.id === "rent"
    ) {
      setSideFormData({
        ...sideFormData,
        type: e.target.id === "null" ? "all" : e.target.id,
      });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSideFormData({
        ...sideFormData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "asc";

      setSideFormData({ ...sideFormData, sort, order });
    }
    if (e.target.id === "searchTerm") {
      setSideFormData({
        ...sideFormData,
        searchTerm: e.target.value === null ? "" : e.target.value,
      });
    }
  };
  // console.log(sideFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = new URLSearchParams(window.location.search);
    url.set("searchTerm", sideFormData.searchTerm);
    url.set("furnished", sideFormData.furnished);
    url.set("parking", sideFormData.parking);
    url.set("offer", sideFormData.offer);
    url.set("order", sideFormData.order);
    url.set("sort", sideFormData.sort);
    url.set("type", sideFormData.type);
    const query = url.toString();
    navigate(`/search?${query}`);
  };

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    let searchTerm = url.get("searchTerm");
    let furnished = url.get("furnished");
    let parking = url.get("parking");
    let offer = url.get("offer");
    let order = url.get("order");
    let sort = url.get("sort");
    let type = url.get("type");
    if (searchTerm || furnished || parking || offer || order || sort || type) {
      setSideFormData({
        ...sideFormData,
        searchTerm: searchTerm === "null" ? "" : searchTerm,
        furnished: furnished === "true" ? true : false,
        parking: parking === "true" ? true : false,
        offer: offer === "true" ? true : false,
        order: order === "undefined" || order === "null" ? "desc" : order,
        sort: sort === "undefined" || sort === "null" ? "createdAt" : sort,
        type: type === "undefined" || type === "null" ? "all" : type,
      });
    }

    async function getData() {
      setLoading(true);
      const query = url.toString();
      const res = await fetch(`${link}/api/searchitem?${query}`, {
        method: "POST",
      });
      const js = await res.json();
      setListings(js);
      setLoading(false);
    }
    getData();
  }, [window.location.search]);

  return (
    <div className="flex md:flex-row flex-col">
      <div className="border-e-2 min-h-screen">
        <form
          className="p-3 sm:p-7 flex flex-col gap-5 "
          onSubmit={handleSubmit}
        >
          <div className="flex gap-3 items-center">
            <label className="capitalize font-semibold text-nowrap">
              {" "}
              search term
            </label>
            <input
              type="text"
              placeholder="search..."
              className="p-3 rounded-lg flex-1 max-w-[60%]"
              name=""
              id="searchTerm"
              value={sideFormData.searchTerm}
              onChange={handleChanges}
            />
          </div>
          <div className="flex items-start sm:items-center gap-3 ">
            <label className="font-semibold">type:</label>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="scale-150"
                  id="all"
                  checked={sideFormData.type === "all"}
                  onChange={handleChanges}
                />
                <label className="capitalize">sale & rent</label>
              </span>
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="scale-150"
                  id="rent"
                  checked={sideFormData.type === "rent"}
                  onChange={handleChanges}
                />
                <label className="capitalize"> rent</label>
              </span>
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="scale-150"
                  id="sell"
                  checked={sideFormData.type === "sell"}
                  onChange={handleChanges}
                />
                <label className="capitalize">sale </label>
              </span>
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="scale-150"
                  id="offer"
                  checked={sideFormData.offer}
                  onChange={handleChanges}
                />
                <label className="capitalize">offer</label>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 ">
            <label className="font-semibold">amenities:</label>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="scale-150"
                  id="parking"
                  checked={sideFormData.parking}
                  onChange={handleChanges}
                />
                <label className="capitalize">parking</label>
              </span>
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="scale-150"
                  id="furnished"
                  checked={sideFormData.furnished}
                  onChange={handleChanges}
                />
                <label className="capitalize"> furnished</label>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold"> sort:</label>
            <select
              name=""
              id="sort_order"
              className="p-3 rounded-lg outline-none"
              onChange={handleChanges}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">high to low</option>
              <option value="regularPrice_asc">low to high</option>
              <option value="createdAt_desc">latest</option>
              <option value="createdAt_asc">oldest</option>
            </select>
          </div>
          <button className="w-full bg-slate-700 uppercase text-center text-white p-3 rounded-lg">
            search
          </button>
        </form>
      </div>
      <div className="p-7 flex-1">
        <h1 className="capitalize pb-3 text-3xl font-semibold border-b flex-1 w-full">
          listing results:
        </h1>
        <div className="flex flex-wrap gap-5">
          {loading ? (
            <p>loading...</p>
          ) : (
            listings.list &&
            listings?.list.length >= 1 &&
            listings.list.map((item) => (
              // <div className="md:w-[48%] ">
              <Card item={item} />
              // </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GSearchResult;
