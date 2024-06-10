import PaginationCmp from "../components/Pagination";
import HeroSection from "../components/HeroSection";
import RecentOffers from "../components/RecentOffers";

function Home() {
  return (
    <div>
      <HeroSection />
      <PaginationCmp />
      <RecentOffers />
    </div>
  );
}

export default Home;
