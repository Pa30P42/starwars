import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HeartEmptyIcon() {
  return (
    <Svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      // @ts-expect-error TS(2322): Type '{ children: Element; style: any; width: stri... Remove this comment to see the full error message
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 17L2.6623 9.87876C1.5904 8.83888 1 7.45391 1 5.979C1 4.50409 1.5904 3.11912 2.6623 2.07833C4.6603 0.139008 9 0.946415 10 3.45478C11 0.946415 15.3397 0.139008 17.3377 2.07833C18.4096 3.11912 19 4.50409 19 5.979C19 7.45391 18.4096 8.83888 17.3377 9.87876L10 17Z"
        stroke="#E0E0E0"
        stroke-width="1.5"
      />
    </Svg>
  );
}

export default HeartEmptyIcon;
