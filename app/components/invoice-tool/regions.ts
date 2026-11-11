/** Billing-address options for the card flow. Countries with a list get a
 *  dropdown for state/province; the rest get a free-text field. */

export const countries: { code: string; name: string }[] = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "NZ", name: "New Zealand" },
    { code: "IE", name: "Ireland" },
    { code: "ES", name: "Spain" },
    { code: "IT", name: "Italy" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "NL", name: "Netherlands" },
    { code: "PH", name: "Philippines" },
    { code: "TH", name: "Thailand" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "ZA", name: "South Africa" },
    { code: "KE", name: "Kenya" },
    { code: "PE", name: "Peru" },
    { code: "CR", name: "Costa Rica" },
    { code: "MX", name: "Mexico" },
];

const pairs = (list: [string, string][]) => list.map(([code, name]) => ({ code, name }));

export const subdivisions: Record<string, { code: string; name: string }[]> = {
    US: pairs([
        ["AL", "Alabama"],
        ["AK", "Alaska"],
        ["AZ", "Arizona"],
        ["AR", "Arkansas"],
        ["CA", "California"],
        ["CO", "Colorado"],
        ["CT", "Connecticut"],
        ["DE", "Delaware"],
        ["DC", "District of Columbia"],
        ["FL", "Florida"],
        ["GA", "Georgia"],
        ["HI", "Hawaii"],
        ["ID", "Idaho"],
        ["IL", "Illinois"],
        ["IN", "Indiana"],
        ["IA", "Iowa"],
        ["KS", "Kansas"],
        ["KY", "Kentucky"],
        ["LA", "Louisiana"],
        ["ME", "Maine"],
        ["MD", "Maryland"],
        ["MA", "Massachusetts"],
        ["MI", "Michigan"],
        ["MN", "Minnesota"],
        ["MS", "Mississippi"],
        ["MO", "Missouri"],
        ["MT", "Montana"],
        ["NE", "Nebraska"],
        ["NV", "Nevada"],
        ["NH", "New Hampshire"],
        ["NJ", "New Jersey"],
        ["NM", "New Mexico"],
        ["NY", "New York"],
        ["NC", "North Carolina"],
        ["ND", "North Dakota"],
        ["OH", "Ohio"],
        ["OK", "Oklahoma"],
        ["OR", "Oregon"],
        ["PA", "Pennsylvania"],
        ["RI", "Rhode Island"],
        ["SC", "South Carolina"],
        ["SD", "South Dakota"],
        ["TN", "Tennessee"],
        ["TX", "Texas"],
        ["UT", "Utah"],
        ["VT", "Vermont"],
        ["VA", "Virginia"],
        ["WA", "Washington"],
        ["WV", "West Virginia"],
        ["WI", "Wisconsin"],
        ["WY", "Wyoming"],
        ["PR", "Puerto Rico"],
    ]),
    CA: pairs([
        ["AB", "Alberta"],
        ["BC", "British Columbia"],
        ["MB", "Manitoba"],
        ["NB", "New Brunswick"],
        ["NL", "Newfoundland and Labrador"],
        ["NS", "Nova Scotia"],
        ["NT", "Northwest Territories"],
        ["NU", "Nunavut"],
        ["ON", "Ontario"],
        ["PE", "Prince Edward Island"],
        ["QC", "Quebec"],
        ["SK", "Saskatchewan"],
        ["YT", "Yukon"],
    ]),
    AU: pairs([
        ["ACT", "Australian Capital Territory"],
        ["NSW", "New South Wales"],
        ["NT", "Northern Territory"],
        ["QLD", "Queensland"],
        ["SA", "South Australia"],
        ["TAS", "Tasmania"],
        ["VIC", "Victoria"],
        ["WA", "Western Australia"],
    ]),
};

export const countryName = (code: string) =>
    countries.find((c) => c.code === code)?.name ?? code;

export const regionName = (country: string, region: string) =>
    subdivisions[country]?.find((r) => r.code === region)?.name ?? region;

export const regionLabel = (country: string) =>
    country === "US"
        ? "State"
        : country === "CA"
          ? "Province or territory"
          : country === "AU"
            ? "State or territory"
            : "State, province or region";

export const postalLabel = (country: string) =>
    country === "US" ? "ZIP code" : "Postal code";
