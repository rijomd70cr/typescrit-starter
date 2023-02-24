// capitalizing first letter
export const capitalizingData = (data: string): string => {
  const array = data.split(" ");
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  return array.join(" ");
};
