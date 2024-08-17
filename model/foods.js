import { genFood } from './food';

export async function getFoodsList(groupId = 0, length = 10) {
  return await genFood(groupId, length);
}

export const foodsList = getFoodsList('0');
