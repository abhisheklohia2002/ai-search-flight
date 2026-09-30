export type ChatResponseType =
  | "MESSAGE"
  | "ASK_MISSING_INFO"
  | "FLIGHT_RESULTS"
  | "CALENDAR_RESULTS"
  | "ERROR";

export interface ChatRequest {
  sessionId: string;
  message: string;
}

export interface Airline {
  code: string;
  name: string;
  logo?: string | null;
}

export interface FlightOption {
  id: string;

  airline: Airline;

  flightNumber: string;

  origin: string;
  destination: string;

  departureTime: string;
  arrivalTime: string;

  durationMinutes: number;

  stops: number;
  via: string[];

  price: {
    amount: number;
    currency: string;
  };

  refundable: boolean;

  seatsLeft?: number | null;

  reviewUrl?: string;
}

export interface FlightSearchSummary {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;

  adults?: number;
  children?: number;
  infants?: number;

  cabinClass?: string;

  preferredAirline?: string;
  nonStopOnly?: boolean;
  maxPrice?: number;

  tripType?: "ONE_WAY" | "ROUND_TRIP";
}

export interface CalendarFareOption {
  airlineCode: string;
  airlineName: string;
  departureDate: string;
  fare: number;
  baseFare: number;
  tax: number;
  otherCharges: number;
  fuelSurcharge: number;
  currency: string;
  isLowestFareOfMonth: boolean;
  isHighestFareOfMonth: boolean;
}

export interface CalendarFareResult {
  traceId: string;
  origin: string;
  destination: string;
  fares: CalendarFareOption[];
}

export interface ChatResponse {
  success: boolean;
  sessionId?: string;
  type: ChatResponseType;
  message: string;
  data?: {
    flights?: FlightOption[];
    calendarFares?: CalendarFareResult[];
    search?: FlightSearchSummary;
    traceId?: string;
    expiryAt?: string;
  };
}

export type ChatRole = "user" | "assistant";

export interface ChatMessageItem {
  id: string;
  role: ChatRole;
  content: string;
  type?: ChatResponseType;
}
