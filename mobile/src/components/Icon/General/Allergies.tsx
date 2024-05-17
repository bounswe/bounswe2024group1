import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const AllergiesIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M19.396 4.604a5.48 5.48 0 0 0-9.251 2.822 2.347 2.347 0 0 1-2.013 1.881 5.87 5.87 0 1 0 6.561 6.56 2.35 2.35 0 0 1 1.881-2.011 5.48 5.48 0 0 0 2.822-9.252Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M4.719 19.28s.041-3.563 2.194-5.715c2.152-2.152 3.326-.979 4.696-2.348 1.37-1.37.979-2.936 2.74-4.697 1.76-1.76 5.047-1.92 5.047-1.92M18.653 7.696a2.434 2.434 0 0 1-1.565 2.347M8.087 18.262a2.388 2.388 0 0 0 2.74-1.174"
    />
  </Svg>
);
export default AllergiesIcon;
