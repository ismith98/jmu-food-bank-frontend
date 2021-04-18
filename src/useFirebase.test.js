import { orderDelivered, getItems, updateItem } from "./hooks/useFirebase";

function setup() {
  function setErrorAlert(msg) {
    console.log("Error: ", msg);
  }

  function setSuccessAlert(msg) {
    console.log("Success", msg);
  }

  const order1 = {
    itemsInCart: [
      {
        amount: 1,
        id: "X96zD40jCT6KZnLOg2GcI",
        imageUrl: "https://i.imgur.com/hXQDHQc.jpg",
        name: "Apple",
        startingAmount: 9,
      },
    ],
    orderId: "Witty-Candles-Work",
    pickupTime: "Mon Mar 01 2021 12:00:00 GMT-0500 (EST)",
    timeOrdered: "Sun Feb 28 2021 19:21:49 GMT-0500 (EST)",
  };

  const order2 = {
    itemsInCart: [
      {
        amount: 1,
        id: 7,
        imageUrl: "https://i.imgur.com/E1Wt4ur.jpg",
        name: "Applesauce",
        startingAmount: 15,
      },
    ],
    orderId: "Bumpy-Yaks-Whisper",
    pickupTime: "Mon Feb 08 2021 12:00:00 GMT-0500 (EST)",
    timeOrdered: "Wed Feb 03 2021 15:26:16 GMT-0500 (EST)",
  };

  const order3 = {
    "Witty-Candles-Work": {
      itemsInCart: [
        {
          amount: 5,
          id: "X96zD40jCT6KZnLOg2GcI",
          imageUrl: "https://i.imgur.com/hXQDHQc.jpg",
          name: "Apple",
          startingAmount: 9,
        },
      ],
      orderId: "Witty-Candles-Work",
      pickupTime: "Mon Mar 01 2021 12:00:00 GMT-0500 (EST)",
      timeOrdered: "Sun Feb 28 2021 19:21:49 GMT-0500 (EST)",
    },
  };

  const appleBeforeChange = {
    amountReserved: 12,
    id: "X96zD40jCT6KZnLOg2GcI",
    imageUrl: "https://i.imgur.com/hXQDHQc.jpg",
    maxReservable: 5,
    name: "Apple",
    totalInventory: 3,
  };

  const appleAfterChange = {
    amountReserved: 11,
    id: "X96zD40jCT6KZnLOg2GcI",
    imageUrl: "https://i.imgur.com/hXQDHQc.jpg",
    maxReservable: 5,
    name: "Apple",
    totalInventory: 2,
  };

  return {
    setErrorAlert,
    setSuccessAlert,
    order1,
    order2,
    order3,
    appleBeforeChange,
    appleAfterChange,
  };
}

test("succesfully updates order of an available item", () => {
  const {
    setErrorAlert,
    setSuccessAlert,
    order1,
    order2,
    order3,
    appleBeforeChange,
    appleAfterChange,
  } = setup();
  /*expect(orderDelivered(order1, setErrorAlert, setSuccessAlert)).toEqual(
    `Order Delivered`
  );*/
  expect(
    getItems(setErrorAlert, setErrorAlert, order1.itemsInCart[0].id)
  ).toEqual(appleAfterChange);
});

test("reserve item that doesn't exist", () => {
  const {
    setErrorAlert,
    setSuccessAlert,
    order1,
    order2,
    order3,
    appleBeforeChange,
    appleAfterChange,
  } = setup();

  expect(orderDelivered(order2, setErrorAlert, setSuccessAlert)).toEqual(
    `Error reserving Applesauce`
  );
});

/*
test("reserve more items than available", async () => {
  await updateItem(appleBeforeChange, setErrorAlert, setErrorAlert);
  expect(orderDelivered(order3, setErrorAlert, setSuccessAlert)).toEqual(
    `Error reserving Applesauce`
  );
  expect(
    getItems(setErrorAlert, setErrorAlert, order1.itemsInCart[0].id)
  ).toEqual(appleAfterChange);
});
*/
