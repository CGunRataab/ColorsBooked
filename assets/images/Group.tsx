import { Path, Svg } from 'react-native-svg';

interface Arrow {
  width: string;
  height: string;
  color: string;
}

export const AccountIcon = ({ width, height, color }: Arrow): React.ReactNode => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 20" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.18512 13.3462C4.31751 13.3462 1.01465 13.931 1.01465 16.2729C1.01465 18.6148 4.29655 19.2205 8.18512 19.2205C12.0527 19.2205 15.3546 18.6348 15.3546 16.2938C15.3546 13.9529 12.0737 13.3462 8.18512 13.3462Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.18508 10.0059C10.7232 10.0059 12.7803 7.94779 12.7803 5.40969C12.7803 2.8716 10.7232 0.814453 8.18508 0.814453C5.64699 0.814453 3.58889 2.8716 3.58889 5.40969C3.58032 7.93922 5.62413 9.99731 8.1527 10.0059H8.18508Z"
        stroke={color}
        stroke-width="1.42857"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
