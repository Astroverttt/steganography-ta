export interface license {
  id: number;
  name: string;
}

const licenseNames = ["Free", "Paid"];

export const artworkLicenses: license[] = licenseNames.map((name, index) => ({
  id: index + 1,
  name,
}));
