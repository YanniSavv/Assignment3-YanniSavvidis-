let currentState = welcoming;
let orderCount = 0;
let pendingItem = null;
 
const MENU = [
  { id: 1, name: "Burger",       price: 9.99  },
  { id: 2, name: "Pizza",        price: 12.99 },
  { id: 3, name: "Tacos",        price: 8.49  },
  { id: 4, name: "Pasta",        price: 11.49 },
  { id: 5, name: "Caesar Salad", price: 7.99  },
];
 
export function handleInput(sInput) {
  return currentState(sInput);
}
 
export function clearInput() {
  currentState = welcoming;
  pendingItem = null;
}
 
export function getOrderCount() {
  return orderCount;
}
 
export function resetOrders() {
  orderCount = 0;
}
 
function welcoming() {
  let aReturn = [];
  currentState = browsing;
  aReturn.push("Welcome to Richie's Diner! 🍔");
  aReturn.push("Here's our menu:");
  MENU.forEach((item) => {
    aReturn.push(`  ${item.id}. ${item.name} — $${item.price.toFixed(2)}`);
  });
  aReturn.push("Type the number of the item you'd like to order.");
  return aReturn;
}
 
function browsing(sInput) {
  let aReturn = [];
  const choice = parseInt(sInput.trim());
  const item = MENU.find((m) => m.id === choice);
 
  if (!item) {
    aReturn.push("Sorry, I didn't catch that. Please enter a menu number (1–5).");
    return aReturn;
  }
 
  pendingItem = item;
  currentState = confirming;
  aReturn.push(`You selected: ${item.name} ($${item.price.toFixed(2)})`);
  aReturn.push("Would you like to confirm this order? (yes / no)");
  return aReturn;
}
 
function confirming(sInput) {
  let aReturn = [];
 
  if (sInput.toLowerCase().startsWith("y")) {
    orderCount++;
    const isFree = orderCount % 10 === 0;
 
    if (isFree) {
      aReturn.push(`🎉 Congratulations! Your ${pendingItem.name} is FREE!`);
      aReturn.push("This is your loyalty reward — every 10th order is on us!");
    } else {
      const remaining = 10 - (orderCount % 10);
      aReturn.push(`✅ Order confirmed: ${pendingItem.name}`);
      aReturn.push(
        `You have ${orderCount} order${orderCount !== 1 ? "s" : ""} total. ${remaining} more until your free order!`
      );
    }
  } else {
    aReturn.push("No problem! Order cancelled.");
  }
 
  currentState = askingAnother;
  pendingItem = null;
  return aReturn;
}
 
function askingAnother(sInput) {
  let aReturn = [];
 
  if (sInput.toLowerCase().startsWith("y")) {
    currentState = browsing;
    aReturn.push("Great! Here's the menu again:");
    MENU.forEach((item) => {
      aReturn.push(`  ${item.id}. ${item.name} — $${item.price.toFixed(2)}`);
    });
    aReturn.push("Type the number of the item you'd like to order.");
  } else {
    currentState = welcoming;
    aReturn.push("Thanks for dining with us! See you next time 👋");
  }
 
  return aReturn;
}