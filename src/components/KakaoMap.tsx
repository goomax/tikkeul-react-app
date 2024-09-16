import { ENV } from '@/constants/config';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

interface Vertex {
  lat: number;
  lng: number;
}

interface Road {
  name: string;
  distance: number;
  duration: number;
  traffic_speed: number;
  traffic_state: number;
  vertexes: number[];
}

interface Section {
  distance: number;
  duration: number;
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
  roads: Road[];
}

interface KakaoMapProps {
  correctRoute?: boolean;
  coordinates: Vertex[];
  width?: string;
  height?: string;
  level?: number;
  style?: React.CSSProperties | undefined;
}

const KakaoMap = ({ coordinates, correctRoute, style, width = '100%', height = '100%', level = 8 }: KakaoMapProps) => {
  const theme = useTheme();
  const [allVertexes, setAllVertexes] = useState<Vertex[]>([]);

  const formatVertexes = (vertexes: number[]): Vertex[] => {
    const formatted: Vertex[] = [];
    for (let i = 0; i < vertexes.length; i += 2) {
      formatted.push({ lat: vertexes[i + 1], lng: vertexes[i] });
    }
    return formatted;
  };

  useEffect(() => {
    if (correctRoute) {
      axios
        .request<{
          routes: {
            sections: Section[];
          }[];
        }>({
          method: 'post',
          url: 'https://apis-navi.kakaomobility.com/v1/waypoints/directions',
          headers: {
            Authorization: `KakaoAK ${ENV.KAKAO_REST_KEY}`,
          },
          data: {
            origin: {
              x: coordinates[0].lng,
              y: coordinates[0].lat,
            },
            destination: {
              x: coordinates[coordinates.length - 1].lng,
              y: coordinates[coordinates.length - 1].lat,
            },
            waypoints: coordinates.slice(1, -1).map((coord) => ({
              x: coord.lng,
              y: coord.lat,
            })),
          },
        })
        .then((res) => {
          const combinedVertexes: Vertex[] = res.data.routes[0].sections.flatMap((section) =>
            section.roads.flatMap((road) => formatVertexes(road.vertexes)),
          );

          setAllVertexes(combinedVertexes);
        });
    }
  }, [coordinates, correctRoute]);

  return (
    <Map
      center={{ lat: coordinates[0].lat, lng: coordinates[0].lng }}
      style={{
        width,
        height,
        ...style,
      }}
      level={level}
    >
      {coordinates.map((coord, index) => (
        <MapMarker key={index} position={{ lat: coord.lat, lng: coord.lng }} />
      ))}
      <Polyline
        path={(correctRoute ? allVertexes : coordinates).map((coord) => ({ lat: coord.lat, lng: coord.lng }))}
        strokeWeight={6}
        strokeColor={theme.palette.secondary.main}
        strokeOpacity={0.8}
        strokeStyle="solid"
      />
    </Map>
  );
};

export default KakaoMap;
