import { handleInput, clearInput, getOrderCount, resetOrders } from '../src/Order.js';
 
describe("Tests all stages of a food order", function () {
 
  beforeEach(function () {
    clearInput();
    resetOrders();
  });
 
  it("test welcome message", function () {
    const aResults = handleInput("hello");
    expect(aResults[0]).toBe("Welcome to Richie's Diner! 🍔");
  });
 
  it("test menu is shown on welcome", function () {
    const aResults = handleInput("hello");
    expect(aResults[1]).toBe("Here's our menu:");
  });
 
  it("test valid item selection", function () {
    handleInput("hello");
    const aResults = handleInput("1");
    expect(aResults[0]).toBe("You selected: Burger ($9.99)");
  });
 
  it("test invalid item selection", function () {
    handleInput("hello");
    const aResults = handleInput("99");
    expect(aResults[0]).toBe("Sorry, I didn't catch that. Please enter a menu number (1–5).");
  });
 
  it("test order confirmation yes", function () {
    handleInput("hello");
    handleInput("1");
    const aResults = handleInput("yes");
    expect(aResults[0]).toBe("✅ Order confirmed: Burger");
  });
 
  it("test order confirmation no", function () {
    handleInput("hello");
    handleInput("2");
    const aResults = handleInput("no");
    expect(aResults[0]).toBe("No problem! Order cancelled.");
  });
 
  it("test order count increments on confirmation", function () {
    handleInput("hello");
    handleInput("1");
    handleInput("yes");
    expect(getOrderCount()).toBe(1);
  });
 
  it("test order count does not increment on cancel", function () {
    handleInput("hello");
    handleInput("1");
    handleInput("no");
    expect(getOrderCount()).toBe(0);
  });
 
  it("test 10th order is free", function () {
    for (let i = 0; i < 9; i++) {
      clearInput();
      handleInput("hello");
      handleInput("1");
      handleInput("yes");
      handleInput("yes");
    }
    clearInput();
    handleInput("hello");
    handleInput("1");
    const aResults = handleInput("yes");
    expect(aResults[0]).toBe("🎉 Congratulations! Your Burger is FREE!");
  });
 
  it("test order count resets loyalty cycle after 10th order", function () {
    for (let i = 0; i < 10; i++) {
      clearInput();
      handleInput("hello");
      handleInput("1");
      handleInput("yes");
      handleInput("yes");
    }
    expect(getOrderCount()).toBe(10);
    clearInput();
    handleInput("hello");
    handleInput("1");
    const aResults = handleInput("yes");
    expect(aResults[0]).toBe("✅ Order confirmed: Burger");
  });
 
  it("test asking another order - yes", function () {
    handleInput("hello");
    handleInput("1");
    handleInput("yes");
    const aResults = handleInput("yes");
    expect(aResults[0]).toBe("Great! Here's the menu again:");
  });
 
  it("test asking another order - no", function () {
    handleInput("hello");
    handleInput("1");
    handleInput("yes");
    const aResults = handleInput("no");
    expect(aResults[0]).toBe("Thanks for dining with us! See you next time 👋");
  });
 
});