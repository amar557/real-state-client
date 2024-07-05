function HeroSection() {
  return (
    <div className="w-11/12 sm:w-10/12 mx-auto min-h-[60vh] flex items-start justify-center flex-col">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold first-letter:uppercase sm:leading-[3.4rem]">
        find your next <span>perfect</span>
        <br />
        place with ease
      </h1>
      <p className="text-xs text-slate-500 mt-3">
        Sahand Estate will help you find your home fast, easy and comfortable.
        <br />
        Our expert support are always available.
      </p>
      <button className="text-[#6240af] font-medium text-sm mt-3">
        let's start now...
      </button>
    </div>
  );
}

export default HeroSection;
