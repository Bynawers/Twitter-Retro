import ActionButtons from "./ActionsButtons";

const Comment = (props) => {
  return (
    <button className="border-t-[1px] hover:bg-foreground w-full">
      <div className="h-3" />
      <main className="flex flex-row pl-3 pr-3">
        <div className="flex w-[40px] mr-2">
          <img
            className="flex h-[40px] w-[40px] rounded-full object-cover"
            src="/src/services/images-profile/actuFoot.jpg"
          />
        </div>
        <div className="flex w-full flex-col ">
          <div className="flex h-5 w-full space-x-1 text-sm font-light">
            <span className="font-bold">{props.data.user}</span>
            <span>{props.data.username}</span>
            <span>·</span>
            <span>1h</span>
          </div>
          <div className="text-start">
            <span>{props.data.content}</span>
          </div>
        </div>
      </main>
      <div className="pl-3 pr-3">
        <ActionButtons view="menu" data={props.data.stat} id={props.data._id} />
      </div>
    </button>
  );
};

export default Comment;
