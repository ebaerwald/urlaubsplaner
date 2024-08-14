export default function LocationElement({
    location,
    index,
    setLocationFocus,
    changeLocation,
    deleteLocation,
  }: {
    location: string;
    index: number;
    setLocationFocus: (index: number) => void;
    changeLocation: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    deleteLocation: (index: number) => void;
  }) {

    const currentDay = new Date().toISOString().split("T")[0];

    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div
        id={`location${index}`}
        className="w-76 text-black flex flex-row items-center justify-between text-sm"
        onClick={() => {
          setLocationFocus(index);
        }}
      >
        <span className="material-symbols-outlined mr-2 fsize-20 hover:cursor-pointer">
          double_arrow
        </span>
        <input
          id={`locationInput${index}`}
          type="text"
          className="mr-2 overflow-auto w-32 focus:outline-none"
          defaultValue={location}
          onChange={(event) => {
            changeLocation(event, index);
          }}
        ></input>
        <input
          type="date"
          className="rounded w-32 mr-2 bg-transparent focus:outline-none"
          defaultValue={currentDay}
        ></input>
        <input
          type="time"
          step={60}
          className="rounded w-24 bg-transparent focus:outline-none"
          defaultValue={currentTime}
        ></input>
        <span
          className="material-symbols-outlined text-black text-2xl ml-2 fsize-20 hover:cursor-pointer"
          onClick={() => deleteLocation(index)}
        >
          delete
        </span>
      </div>
    );
  }