import type {
  FlightSearchSummary,
} from "@/types/chat";

const FLIGHT360_BASE_URL =
  process.env.NEXT_PUBLIC_FLIGHT360_BASE_URL?.replace(/\/$/, "") ??
  "https://flight360-pc4y8.ondigitalocean.app";
  
interface AirportDetails {
  code: string;
  city: string;
  country: string;
  name: string;
}

const airports: Record<
  string,
  AirportDetails
> = {
  DEL: {
    code: "DEL",
    city: "Delhi",
    country: "India",
    name: "Indira Gandhi Intl",
  },

  IXB: {
    code: "IXB",
    city: "Bagdogra",
    country: "India",
    name: "Bagdogra",
  },

  BOM: {
    code: "BOM",
    city: "Mumbai",
    country: "India",
    name: "Chhatrapati Shivaji Maharaj Intl",
  },

  BLR: {
    code: "BLR",
    city: "Bengaluru",
    country: "India",
    name: "Kempegowda Intl",
  },
};

function formatFlight360Date(
  date: string
) {
  const [
    year,
    month,
    day,
  ] = date.split("-");

  return `${day}/${month}/${year}`;
}

function getCabinCode(
  cabinClass:
    FlightSearchSummary["cabinClass"]
) {
  switch (cabinClass) {
    case "BUSINESS":
      return "B";

    case "FIRST":
      return "F";

    case "PREMIUM_ECONOMY":
      return "P";

    case "ECONOMY":
    default:
      return "E";
  }
}

export function buildFlightSearchUrl(
  search: FlightSearchSummary
) {
  const {
    origin,
    destination,
    departureDate,
  } = search;

  if (
    !origin ||
    !destination ||
    !departureDate
  ) {
    return null;
  }

  const originAirport =
    airports[origin];

  const destinationAirport =
    airports[destination];

  if (
    !originAirport ||
    !destinationAirport
  ) {
    return null;
  }

  const date =
    formatFlight360Date(
      departureDate
    );

  const itinerary =
    `${origin}-${destination}-${date}`;

  const params =
    new URLSearchParams();

  params.set(
    "itinerary",
    itinerary
  );

  params.set(
    "originCity",
    originAirport.city
  );

  params.set(
    "originCountry",
    originAirport.country
  );

  params.set(
    "originName",
    originAirport.name
  );

  params.set(
    "destinationCity",
    destinationAirport.city
  );

  params.set(
    "destinationCountry",
    destinationAirport.country
  );

  params.set(
    "destinationName",
    destinationAirport.name
  );

  params.set(
    "tripType",
    search?.tripType === "ROUND_TRIP"
      ? "R"
      : "O"
  );

  params.set(
    "paxType",
    `A-${search.adults ?? 1}_C-${search.children ?? 0}_I-${search.infants ?? 0}`
  );

  params.set(
    "intl",
    "false"
  );

  params.set(
    "cabinClass",
    getCabinCode(
      search.cabinClass
    )
  );

  params.set(
    "lang",
    "eng"
  );

  params.set(
    "fareType",
    "2"
  );

  return (
    `${FLIGHT360_BASE_URL}` +
    `/flight/search?${params.toString()}`
  );
}