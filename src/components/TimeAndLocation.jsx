import React from "react";

function TimeAndLocation({ data }) {
  const unixDate = new Date(data.dt * 1000);
  return (
    <div className="flex flex-col text-black justify-center items-center text-center">
      {data.sys ? (
        <>
          <p className="font-semibold">
            {unixDate.toLocaleDateString("en-US", {
              weekday: "long",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            <br />
            {unixDate.toLocaleTimeString("en-US", {
              timeStyle: "short",
            })}
          </p>
          <div className="flex justify-center items-center my-3">
            <p className="font-semibold text-2xl">
              {data.name}, {data.sys.country}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default TimeAndLocation;
