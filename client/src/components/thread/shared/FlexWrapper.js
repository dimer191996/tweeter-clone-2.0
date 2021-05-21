import React from "react";

export default function FlexWrapper({
  children,
  border = " border-t border-b",
  borderColor = "gray-300",
  mx = "6",
  position = "center",
  div1 = "",
  div2 = "items-center  flex",
}) {
  return (
    <div className={` mx-${mx}  ${border} border-${borderColor} ${div1} `}>
      <div className={` justify-${position} ${div2} `}>{children}</div>
    </div>
  );
}
