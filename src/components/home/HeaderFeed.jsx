const HeaderFeed = () => {
  return (
    <div className="border-b-[1px] h-14 sticky top-0 w-full bg-opacity-50 backdrop-filter backdrop-blur-md">
      <div className="flex flex-row flex-1 w-full h-full">
        <div className="flex flex-[3] justify-center hover:bg-gray-200 items-center transition-all duration-300 cursor-pointer">
          <span>Pour vous</span>
        </div>
        <div className="flex flex-[4] justify-center hover:bg-gray-200 items-center transition-all duration-300 cursor-pointer">
          <span>Abonnement</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderFeed;
