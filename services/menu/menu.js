import { getMenu, updateMenu } from '../../api/menu';

export async function addFoodToMenu(id) {
  const menu = await getMenu();
  let find = false;
  for (let i = 0; i < menu.foodIds.length; i++) {
    if (menu.foodIds[i] === id) {
      menu.amounts[i]++;
      find = true;
      break;
    }
  }
  if (!find) {
    menu.foodIds.push(id);
    menu.amounts.push(1);
  }
  menu.totalAmount++;
  await updateMenu(menu);
  return menu;
}