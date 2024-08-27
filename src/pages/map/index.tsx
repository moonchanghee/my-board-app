import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const { naver } = window;

    if (naver) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.978), // 서울 좌표
        zoom: 10,
      };
      const map = new naver.maps.Map('map', mapOptions);
    }
  }, []);

  return <div id="map" style={{ width: '500px', height: '400px' }} />;
};

export default Map;
