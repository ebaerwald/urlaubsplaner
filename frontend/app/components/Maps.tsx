"use client";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Locations } from "../main/page";

export default function MapsPage({
  isLoaded,
  LocationList,
  FocusedLocation,
  setDuration,
}: {
  isLoaded: boolean;
  LocationList: Locations;
  FocusedLocation: number;
  setDuration: Dispatch<SetStateAction<string>>;
}) {
  const [currentPosition, setCurrentPosition] = useState<
    | {
        lat: number;
        lng: number;
      }
    | null
    | 0
  >({ lat: 54, lng: 10 });
  const [directionsList, setDirectionsList] = useState<
    google.maps.DirectionsResult[] | null
  >(null);

  // const getCurrentPosition = () => {
  //   try {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setCurrentPosition({
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           });
  //         },
  //         (error) => {
  //           console.warn("Error getting user location:", error);
  //           setCurrentPosition(0);
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 10000,
  //           maximumAge: 0,
  //         }
  //       );
  //     } else {
  //       console.warn("Geolocation is not supported by this browser.");
  //       setCurrentPosition(0);
  //     }
  //   } catch (error) {
  //     console.warn("Error getting user location:", error);
  //     setCurrentPosition({ lat: 54, lng: 10 });
  //   }
  // };

  useEffect(() => {
    if (isLoaded) {
      if (currentPosition === null) {
        // getCurrentPosition();
      } else {
        const directionsService = new google.maps.DirectionsService();
        for (let i = 0; i < Object.keys(LocationList).length; i++) {
          const key = Object.keys(LocationList)[i];
          const location = LocationList[key];
          const origin =
            i === 0
              ? currentPosition
              : {
                  lat: LocationList[Object.keys(LocationList)[i - 1]].latitude,
                  lng: LocationList[Object.keys(LocationList)[i - 1]].longitude,
                };
          if (origin === 0) continue;

          directionsService.route(
            {
              origin: origin,
              destination: { lat: location.latitude, lng: location.longitude },
              travelMode: location.travelMode,
            },
            (res: google.maps.DirectionsResult | null) => {
              if (res !== null) {
                setDirectionsList((directionsList) => [
                  ...(directionsList ?? []),
                  res,
                ]);
                const route = res.routes[0];
                const duration = route.legs[0].duration?.text;
                if (i === FocusedLocation && duration) setDuration(duration);
              }
            }
          );
        }
      }
    }
  }, [LocationList, currentPosition, isLoaded]);

  return (
    <div>
      {isLoaded && currentPosition && (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          zoom={10}
          center={currentPosition}
        >
          {directionsList &&
            directionsList.map((directions, index) => (
              <DirectionsRenderer
                key={index}
                directions={directions}
                options={{
                  draggable: true,
                  markerOptions: {
                    clickable: true,
                  },
                }}
              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
}
