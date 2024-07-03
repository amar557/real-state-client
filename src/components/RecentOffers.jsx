import { link } from "../firebase/api";
import { useEffect, useState } from "react";
import Card from "./Card";
import PrimaryHeading from "./PrimaryHeading";
import SecondaryHeading from "./SecondaryHeading";

function RecentOffers() {
  const [offerData, setOfferData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  useEffect(() => {
    async function getOffersData() {
      const data = await fetch(`${link}/api/searchitem?offer=true&limit=4`, {
        method: "POST",
      });
      const tojs = await data.json();
      setOfferData(tojs.list);
      getRentItems();
    }

    async function getRentItems() {
      const data = await fetch(`${link}/api/searchitem?type=rent&limit=4`, {
        method: "POST",
      });
      const tojs = await data.json();
      setRentData(tojs.list);
      getForSaleItems();
    }
    async function getForSaleItems() {
      const data = await fetch(`${link}/api/searchitem?type=sell&limit=4`, {
        method: "POST",
      });
      const tojs = await data.json();
      setSaleItems(tojs.list);
    }
    getOffersData();
  }, []);

  return (
    <div className="w-10/12  mx-auto">
      <div className="mt-14 w-full">
        <PrimaryHeading>recent offers</PrimaryHeading>
        <SecondaryHeading category={`offer=true`}>
          show more offers
        </SecondaryHeading>
        <div className="gap-5 flex flex-wrap">
          {offerData && offerData.map((item) => <Card item={item} />)}
        </div>
      </div>
      <div className="mt-14 w-full">
        <PrimaryHeading>Recent places for rent</PrimaryHeading>
        <SecondaryHeading category={"type=rent"}>
          show more places for rent
        </SecondaryHeading>
        <div className="gap-5 flex flex-wrap">
          {rentData && rentData.map((item) => <Card item={item} />)}
        </div>
      </div>
      <div className="mt-14 w-full">
        <PrimaryHeading>Recent places for sale</PrimaryHeading>
        <SecondaryHeading category={"type=sell"}>
          Show more places for sale
        </SecondaryHeading>
        <div className="gap-5 flex flex-wrap">
          {saleItems && saleItems.map((item) => <Card item={item} />)}
        </div>
      </div>
    </div>
  );
}

export default RecentOffers;
