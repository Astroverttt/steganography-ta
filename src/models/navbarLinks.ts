export interface link {
  id: number;
  name: string;
  url: string;
}

const rawLinks = [{ name: "Explore", url: "/home/explore" }];

export const navbarLinks: link[] = rawLinks.map((link, index) => ({
  id: index + 1,
  ...link,
}));
