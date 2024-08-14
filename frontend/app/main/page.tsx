"use client";
import { useEffect, useState } from "react";
import MapsPage from "../components/Maps";
import Sidebar from "../components/Sidebar";
import { useLoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places", "routes"];
export type Location = {
  location: string;
  unixTime: number;
  longitude: number;
  latitude: number;
  restaurant: google.maps.places.PlaceResult[] | null;
  tourist_attraction: google.maps.places.PlaceResult[] | null;
  lodging: google.maps.places.PlaceResult[] | null;
  travelMode: google.maps.TravelMode;
};

export type Locations = {
  [index: string]: Location;
};

export default function MainPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  });
  const [LocationList, setLocationList] = useState<Locations>({});
  const [FocusedLocation, setFocusedLocation] = useState<number>(0);
  const [Duration, setDuration] = useState<string>("");

  return (
    <div className="overflow-hidden h-screen flex">
      <MapsPage isLoaded={isLoaded} LocationList={LocationList} FocusedLocation={FocusedLocation} setDuration={setDuration}/>
      <Sidebar isLoaded={isLoaded} LocationList={LocationList} setLocationList={setLocationList} FocusedLocation={FocusedLocation} setFocusedLocation={setFocusedLocation} Duration={Duration}/>
    </div>
  );
}
