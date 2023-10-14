import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const LeftIcon = (props: SvgProps) => {
  const {width, height} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M15.707 4.293a1 1 0 0 1 0 1.414L9.414 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
export default LeftIcon;
