import { Path, Svg } from 'react-native-svg';

interface Arrow {
  width: string;
  height: string;
  color: string;
}

export const HomeIcon = ({ width, height, color }: Arrow): React.ReactNode => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Path
        d="M7.95702 19.7714V16.7047C7.957 15.9246 8.59292 15.2908 9.38082 15.2856H12.2669C13.0585 15.2856 13.7003 15.9209 13.7003 16.7047V16.7047V19.7809C13.7001 20.4432 14.2341 20.9845 14.9028 21H16.8269C18.7449 21 20.2998 19.4607 20.2998 17.5618V17.5618V8.83784C20.2896 8.09083 19.9353 7.38935 19.3378 6.93303L12.7575 1.6853C11.6047 0.771566 9.96601 0.771566 8.81322 1.6853L2.26183 6.94256C1.66206 7.39702 1.30719 8.09967 1.2998 8.84736V17.5618C1.2998 19.4607 2.85468 21 4.77272 21H6.69677C7.38216 21 7.93778 20.4499 7.93778 19.7714V19.7714"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
