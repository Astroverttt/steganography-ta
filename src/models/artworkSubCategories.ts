export interface subCategory {
  id: number;
  name: string;
}

const subCategoryNames = [
  "Sub Category 1",
  "Sub Category 2",
  "Sub Category 3",
  "Sub Category 4",
  "Sub Category 5",
];

export const artworkSubCategories: subCategory[] = subCategoryNames.map(
  (name, index) => ({
    id: index + 1,
    name,
  })
);
