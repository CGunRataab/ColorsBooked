import { Path, Svg } from 'react-native-svg';

interface Arrow {
  width: string;
  height: string;
  color: string;
}

export const EnterArrow = ({ width, height, color }: Arrow): React.ReactNode => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill={color}>
      <Path
        fill-rule="evenodd"
        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
      />
    </Svg>
  );
};
