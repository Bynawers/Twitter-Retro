import { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { useAuth } from "../../hooks/AuthProvider";

import EmojiPicker from "emoji-picker-react";

const TooltipEmoji = (props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = () => {};
  return (
    <ReactTooltip
      id="emojisPicker"
      openOnClick={true}
      clickable
      place="bottom"
      render={() => (
        <div className="absolute font-bold text-base z-50">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
      style={{
        borderRadius: 15,
        zIndex: 9999,
      }}
    />
  );
};

export default TooltipEmoji;
