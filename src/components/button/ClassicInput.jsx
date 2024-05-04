import { useState, useRef } from "react";

const ClassicInput = (props) => {
  const [isFocus, setIsFocus] = useState(false);
  const areaRef = useRef(null);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleChange = (e) => {
    if (e.target.value.length <= props.limit) {
      props.setValue(e.target.value);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 px-1 text-gray-600 text-xs w-full">
        <div className="flex justify-between w-full">
          <label className={`mt-2 ml-2 ` + (isFocus ? "text-blue-400" : "")}>
            {props.name}
          </label>
          <label className="mt-2 mr-2">
            {props.current}/{props.limit}
          </label>
        </div>
      </div>

      {props.type !== "area" && (
        <input
          value={props.value}
          onChange={handleChange}
          className="appearance-none pt-6 h-14 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={props.name}
        />
      )}
      {props.type === "area" && (
        <textarea
          value={props.value}
          onChange={handleChange}
          ref={areaRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="appearance-none pt-6 h-[120px] border-2 rounded w-full py-2 px-3 outline-none overflow-hidden resize-none text-blackLight leading-tight focus:outline-none focus:shadow-outline focus:border-blue-400"
        />
      )}
    </div>
  );
};

export default ClassicInput;
