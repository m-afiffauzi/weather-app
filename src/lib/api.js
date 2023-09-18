export const url = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const geoApiOtions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_GEO_API_KEY}`,
    "X-RapidAPI-Host": `${process.env.REACT_APP_GEO_API_HOST}`,
  },
};
