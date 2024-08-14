import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import LocationElement from "./LocationElement";
import AutocompleteElement from "./AutocompleteElement";
import { Location, Locations } from "../main/page";
import WeatherCard from "./WeatherCard";
import SightsCard from "./SightsCard";
import FoodCard from "./FoodCard";
import HousingCard from "./HousingCard";

export default function Sidebar({ isLoaded, LocationList, setLocationList, FocusedLocation, setFocusedLocation, Duration }: { isLoaded: boolean, LocationList: Locations, setLocationList: Dispatch<SetStateAction<Locations>>, FocusedLocation: number, setFocusedLocation: Dispatch<SetStateAction<number>>, Duration: string}) {
  useEffect(() => {
    console.log(LocationList);
  }, [LocationList]);

  //locationlist
  function getNextIndex(): string {
    let index = 1;
    for (const key of Object.keys(LocationList)) {
      if (parseInt(key) >= index) {
        index = parseInt(key) + 1;
      }
    }
    return index.toString();
  }

  function changeValue(index: string, key: string, value: any) {
    setLocationList({
      ...LocationList,
      [index]: {
        ...LocationList[index],
        [key]: value,
      },
    });
  }
  // --------------------------------

  function addLocation(
    place: Location 
  ) {
    const input = document.getElementById("location") as HTMLInputElement;
    setLocationList({
      ...LocationList,
      [getNextIndex()]: {
        location: place.location,
        unixTime: new Date().getTime(),
        longitude: place.longitude,
        latitude: place.latitude,
        restaurant: place.restaurant,
        tourist_attraction: place.tourist_attraction,
        lodging: place.lodging,
        travelMode: place.travelMode,
      },
    });
    input.value = "";
  }

  function formatUnixTimestamp(unixTimestamp: number) {
    const milliseconds = unixTimestamp;
    const dateObject = new Date(milliseconds);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  //time
  function getPeriod(index: number): string {
    return formatUnixTimestamp(LocationList[index].unixTime);
  }
  // --------------------------------

  // location
  function setLocationFocus(index: number) {
    const input = document.getElementById(
      "locationInput" + index
    ) as HTMLInputElement;
    setFocusedLocation(index);
    const locationList = document.getElementById("locationList") as any;
    for (const location of locationList.children) {
      if (location.id == `location${index}`) {
        location.children[0].style.color = "rgb(14 165 233)";
      } else {
        location.children[0].style.color = "black";
      }
    }
  }

  function changeLocation(event: any, index: number) {
    const locationList = document.getElementById("locationList") as any;
    for (const location of locationList.children) {
      if (location.id == `location${index}`) {
        setFocusedLocation(event.target.value);
      }
    }
  }

  function deleteLocation(index: number) {
    if (index == FocusedLocation) setFocusedLocation(0);
    const { [index]: value, ...rest } = LocationList;
    setLocationList(rest);
  }
  // --------------------------------

  // appearance
  function expand_less() {
    const expand_less = document.getElementById(
      "expand_less"
    ) as HTMLSpanElement;
    const expand_more = document.getElementById(
      "expand_more"
    ) as HTMLSpanElement;
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    expand_less.style.display = "none";
    expand_more.style.display = "block";
    sidebar.style.height = "auto";
  }

  function expand_more() {
    const expand_more = document.getElementById(
      "expand_more"
    ) as HTMLSpanElement;
    const expand_less = document.getElementById(
      "expand_less"
    ) as HTMLSpanElement;
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    expand_more.style.display = "none";
    expand_less.style.display = "block";
    sidebar.style.height = "2rem";
  }

  function changeTravelMode(id: string) {
    const elements = ["carMode", "trainMode", "bikeMode", "walkMode"];
    for (const element of elements) {
      const el = document.getElementById(element) as HTMLSpanElement;
      if (element == id) {
        el.style.color = "rgb(14 165 233)";
      } else {
        el.style.color = "black";
      }
    }
  }
  // --------------------------------

  return (
    <div className="absolute h-auto" id="locationOverview">
      <div
        className="mt-3 w-88 text-black bg-white rounded overflow-hidden"
        id="sidebar"
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <div className=" w-88 h-8 flex rounded border-solid border-2 border-white overflow-hidden items-center">
          <span className="material-symbols-outlined text-black text-2xl mr-2">
            location_on
          </span>
          <AutocompleteElement
            isLoaded={isLoaded}
            addLocation={addLocation}
          />
          <span
            id="expand_less"
            style={{ display: "none" }}
            className="material-symbols-outlined text-black text-2xl ml-24 hover:cursor-pointer"
            onClick={expand_less}
          >
            expand_less
          </span>
          <span
            id="expand_more"
            className="material-symbols-outlined text-black text-2xl ml-24 hover:cursor-pointer"
            onClick={expand_more}
          >
            expand_more
          </span>
        </div>
        <hr className="border-1 border-gray-300 border-solid"></hr>
        <div className="flex flex-row items-center justify-center gap-20">
          <div className="bg-white rounded flex items-center justify-center h-8 hover:cursor-pointer">
            <span
              id="carMode"
              className="material-symbols-outlined"
              onClick={() => {
                changeValue(FocusedLocation.toString(), "travelMode", "car");
                changeTravelMode("carMode");
              }}
            >
              directions_car
            </span>
          </div>
          <div className="bg-white rounded flex items-center justify-center h-8 hover:cursor-pointer">
            <span
              id="trainMode"
              className="material-symbols-outlined"
              onClick={() => {
                changeValue(FocusedLocation.toString(), "travelMode", "train");
                changeTravelMode("trainMode");
              }}
            >
              train
            </span>
          </div>
          <div className="bg-white rounded flex items-center justify-center h-8 hover:cursor-pointer">
            <span
              id="bikeMode"
              className="material-symbols-outlined"
              onClick={() => {
                changeValue(FocusedLocation.toString(), "travelMode", "bike");
                changeTravelMode("bikeMode");
              }}
            >
              directions_bike
            </span>
          </div>
          <div className="bg-white rounded flex items-center justify-center h-8 hover:cursor-pointer">
            <span
              id="walkMode"
              className="material-symbols-outlined"
              onClick={() => {
                changeValue(FocusedLocation.toString(), "travelMode", "walk");
                changeTravelMode("walkMode");
              }}
            >
              directions_walk
            </span>
          </div>
        </div>
        <hr className="border-1 border-gray-300 border-solid"></hr>
        <div id="locationList">
          {Object.keys(LocationList).map((key, index) => {
            return (
              <LocationElement
                location={LocationList[key].location}
                index={parseInt(key)}
                key={index}
                setLocationFocus={setLocationFocus}
                changeLocation={changeLocation}
                deleteLocation={deleteLocation}
              ></LocationElement>
            );
          })}
        </div>
        <hr className="border-1 border-gray-300 border-solid"></hr>
        <div>
          {FocusedLocation != 0 && LocationList[FocusedLocation] && (
            <div>
              <p className="text-center m-2 text-base">Information</p>
              <div>
                <div className="flex flex-row items-center gap-2">
                  <span className="material-symbols-outlined fsize-20">
                    location_on
                  </span>
                  <p className="text-sm">
                    {LocationList[FocusedLocation].location}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="material-symbols-outlined fsize-20">
                    date_range
                  </span>
                  <p className="text-sm">{getPeriod(FocusedLocation)}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="material-symbols-outlined fsize-20">
                    timer
                  </span>
                  <p className="text-sm mr-2">{Duration}</p>
                </div>
              </div>
              <hr className="border-1 border-gray-300 border-solid"></hr>
              <p className="text-center m-2 text-base">Weather</p>
              <WeatherCard latitude={LocationList[FocusedLocation].latitude} longitude={LocationList[FocusedLocation].longitude}/>
              <hr className="border-1 border-gray-300 border-solid"></hr>
              <p className="text-center m-2 text-base">Sights</p>
              <SightsCard tourist_attraction={LocationList[FocusedLocation].tourist_attraction}/>
              <hr className="border-1 border-gray-300 border-solid"></hr>
              <p className="text-center m-2 text-base">Food</p>
              <FoodCard restaurant={LocationList[FocusedLocation].restaurant}/>
              <hr className="border-1 border-gray-300 border-solid"></hr>
              <p className="text-center m-2 text-base">Housing</p>
              <HousingCard lodging={LocationList[FocusedLocation].lodging}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
