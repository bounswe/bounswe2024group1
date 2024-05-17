import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const FoodIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000001"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v2.942a3.27 3.27 0 0 0 6.539 0V4M7.27 4v17M21 21a8.5 8.5 0 1 1 0-17"
    />
    <Path
      stroke="#000001"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 17.077a4.577 4.577 0 1 1 0-9.154"
    />
  </Svg>
);
export default FoodIcon;
