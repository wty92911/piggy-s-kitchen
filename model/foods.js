import { genFood } from './food';

export function getFoodsList(groupId = 0, length = 10) {
  return genFood(groupId, length);
}

export const foodsList = getFoodsList(0);
