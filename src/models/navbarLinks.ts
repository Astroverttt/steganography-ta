export interface link {
  id: number;
  name: string;
  url: string;
}

const rawLinks = [
  { name: "Explore", url: "/home/explore" },
  { name: "Categories", url: "/home/categories" },
  { name: "Artist", url: "/home/artist" },
  { name: "About Us", url: "/home/about" },
  { name: "Contact", url: "/home/contact" },
];

export const navbarLinks: link[] = rawLinks.map((link, index) => ({
  id: index + 1,
  ...link,
}));
