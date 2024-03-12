const PostYourself = () => {
  return (
    <div className="flex h-[84px] pt-1 pb-3 pl-4 pr-4">
      <div className="flex h-full w-[40px] mr-2 items-center">
        <img
          className="flex h-[40px] w-[40px] rounded-full object-cover"
          src="/src/assets/defaultAvatar.png"
        />
      </div>
      <div className="flex w-full h-full justify-between items-center">
        <span className="text-xl font-medium text-icon">
          Postez votre réponse
        </span>
        <Button />
      </div>
    </div>
  );
};

const Button = () => {
  return (
    <div className="bg-twitter text-white p-3 h-9 rounded-2xl">
      <span className="">Répondre</span>
    </div>
  );
};

export default PostYourself;
