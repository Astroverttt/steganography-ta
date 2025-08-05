export interface category {
  id: number;
  name: string;
}

const categoryNames = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category 6",
  "Category 7",
  "Category 8",
  "Category 9",
  "Category 10",
];

export const artworkCategories: category[] = categoryNames.map(
  (name, index) => ({
    id: index + 1,
    name,
  })
);
