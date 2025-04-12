import { useEffect, useRef, useState } from "react";
import { MapStyle } from "../style/styled";
import clsx from "clsx";
import axios from "axios";

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAOMap = () => {
  const mapRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const [address, setAddress] = useState("");
  const markerListRef = useRef<any[]>([]); // 기존 마커 추적용

  // 마커 모두 제거
  const clearMarkers = () => {
    markerListRef.current.forEach((m) => m.setMap(null));
    markerListRef.current = [];
  };

  //  마커 생성 로직 공통화
  const drawMarkers = (map: any, places: any[]) => {
    const infoWindow = infoWindowRef.current;

    clearMarkers(); // 기존 마커 제거

    places.forEach((place: any) => {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        map,
        position: markerPosition,
        title: place.place_name,
      });

      const content = `
        <div style="
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            font-size: 13px;
            line-height: 1.5;
        ">
          <strong>${place.place_name}</strong><br/>
          <p style="margin: 0;">${place.road_address_name || ""}</p>
        </div>
      `;

      window.kakao.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(map, "click", () => {
        infoWindow.close();
      });

      markerListRef.current.push(marker); // 추적
    });
  };

  // 초기 실행 - 현재 위치 기반 마커
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            const mapContainer = document.getElementById("map");
            const mapOption = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 5,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
            mapRef.current = map;

            // 현재 위치 마커
            new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(lat, lng),
              title: "현재 위치",
            });

            const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
            infoWindowRef.current = infoWindow;

            // 주변 피트니스 장소 불러오기
            const res = await axios.post("http://localhost:5001/maps/search", {
              lat,
              lng,
            });
            drawMarkers(map, res.data);
          });
        }
      });
    });
  }, []);

  //  주소 → 좌표 검색 핸들러
  const handleAddressSearch = async () => {
    try {
      const res = await axios.post("http://localhost:5001/maps/find", {
        address,
      });

      const { latitude, longitude, address: resultAddr } = res.data;
      const latLng = new window.kakao.maps.LatLng(latitude, longitude);
      const map = mapRef.current;
      map.setCenter(latLng);

      // 주소 위치 마커 하나 추가
      const mainMarker = new window.kakao.maps.Marker({
        map,
        position: latLng,
        title: resultAddr,
      });

      const content = `
        <div style="
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            font-size: 13px;
            line-height: 1.5;
        ">
          <strong>${resultAddr}</strong>
        </div>
      `;
      infoWindowRef.current.setContent(content);
      infoWindowRef.current.open(map, mainMarker);

      //  검색 위치 기준 피트니스 장소 다시 조회 및 마커 표시
      const nearby = await axios.post("http://localhost:5001/maps/search", {
        lat: latitude,
        lng: longitude,
      });
      drawMarkers(map, nearby.data);
    } catch (err) {
      alert("주소 검색 실패");
    }
  };

  return (
    <>
      <MapStyle className={clsx("main-wrap")}>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="주소 입력"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: "4px", width: "300px" }}
          />
          <button
            onClick={handleAddressSearch}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            테스트
          </button>
        </div>
        <div id="map" className="main-map" style={{ height: "500px" }}></div>
      </MapStyle>
    </>
  );
};

export default KAKAOMap;
