import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ClockIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#303030"
      d="M12 3c4.977 0 9 4.032 9 9 0 4.977-4.023 9-9 9-4.968 0-9-4.023-9-9 0-4.968 4.032-9 9-9Zm-.315 4.437a.674.674 0 0 0-.675.675v4.545c0 .234.126.45.333.576l3.528 2.106a.668.668 0 0 0 .927-.234.678.678 0 0 0-.234-.927L12.36 12.27V8.112a.674.674 0 0 0-.675-.675Z"
    />
  </Svg>
);
export default ClockIcon;
