export interface MobileAirport {
  code: string;
  city: string;
  name: string;
}

export const MOBILE_AIRPORTS: MobileAirport[] = [
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International" },
  { code: "IXB", city: "Bagdogra", name: "Bagdogra Airport" },
  { code: "GOI", city: "Goa", name: "Goa International" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International" },
  { code: "MAA", city: "Chennai", name: "Chennai International" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhas Chandra Bose International" },
];
