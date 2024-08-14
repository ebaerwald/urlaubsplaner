import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import { Location } from "../main/page";

export default function AutocompleteElement({
  isLoaded,
  addLocation,
}: {
  isLoaded: boolean;
  addLocation: (location: Location) => void;
}) {
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService>();
  const getPlaceServices = (
    place: google.maps.places.PlaceResult,
    type: string
  ) => {
    return new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      if (placesService) {
        const request: google.maps.places.PlaceSearchRequest = {
          location: place.geometry?.location,
          radius: 5000, 
          type: type,
        };

        placesService.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log("type: " + type + " " + results);
            resolve(results || []); 
          } else {
            reject(status);
          }
        });
      } else {
        reject("Places service not available");
      }
    });
  };
  const onPlaceChanged = async () => {
    if (searchResult && placesService) {
      const place = searchResult.getPlace();
      const placeObj: Location = {
        location: place.name ?? "",
        latitude: place.geometry?.location?.lat() ?? 0,
        longitude: place.geometry?.location?.lng() ?? 0,
        unixTime: new Date().getTime(),
        restaurant: await getPlaceServices(place, "restaurant").catch(
          () => null
        ),
        tourist_attraction: await getPlaceServices(
          place,
          "tourist_attraction"
        ).catch(() => null),
        lodging: await getPlaceServices(place, "lodging").catch(() => null),
        travelMode: google.maps.TravelMode.DRIVING,
      };
      addLocation(placeObj);
    }
  };
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    console.log("autocomplete: ", autocomplete);
    setSearchResult(autocomplete);
    setPlacesService(
      new google.maps.places.PlacesService(document.createElement("div"))
    );
  };
  return (
    <div>
      {isLoaded && (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            id="location"
            name="location"
            className="rounded outline-none h-8 w-72 text-sm placeholder:text-white"
            placeholder="Location"
          />
        </Autocomplete>
      )}
    </div>
  );
}
