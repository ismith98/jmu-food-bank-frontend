import firebase from "../firebase";
import { nanoid } from "nanoid";

export function getItems(setLoading, setItems, id = "") {
  setLoading(true);
  const foodItemsRef = firebase.database().ref(`foodItems/${id}`);
  foodItemsRef.on("value", (snapshot) => {
    let value = snapshot.val();
    if (value !== null) {
      let items = Object.values(value);
      let sortedItems = items.sort((item1, item2) => sortByName(item1, item2));
      setItems(sortedItems);
      //setFilteredFoodItems(sortedItems); -> Filter items before sorting
      console.log(sortedItems);
    }
    setLoading(false);
  });
}

function sortByName(item1, item2) {
  var nameA = item1.name.toUpperCase(); // ignore upper and lowercase
  var nameB = item2.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

export function getOrders(setOrders, orderId = "") {
  //setLoading(true);
  const ordersRef = firebase.database().ref(`orders/${orderId}`);
  ordersRef.on("value", (snapshot) => {
    let value = snapshot.val();
    if (value !== null) {
      let orders = Object.values(value);
      let sortedOrders = orders.sort((order1, order2) =>
        sortByTimeOrdered(order1, order2)
      );
      setOrders(sortedOrders);
      //setFilteredFoodItems(foodItems);
      console.log(sortedOrders);
      return orders;
    }
    //setLoading(false);
  });
}

function sortByTimeOrdered(order1, order2) {
  var dateA = new Date(order1.timeOrdered);
  var dateB = new Date(order2.timeOrdered);
  if (dateA > dateB) {
    return -1;
  }
  if (dateA < dateB) {
    return 1;
  }

  // dates must be equal
  return 0;
}

export async function addItemToDatabase(
  itemInfo,
  setErrorAlert,
  setSuccessAlert
) {
  try {
    let result = await addItem(itemInfo);
    checkItemCommitted(result, itemInfo, setSuccessAlert);
  } catch (err) {
    setErrorAlert(`Transaction failed abnormally! |  ${err.error}`);
  }
}

function addItem(itemInfo) {
  itemInfo.id = nanoid();
  const foodItemsRef = firebase.database().ref(`foodItems/${itemInfo.id}`);
  return foodItemsRef.transaction((currentData) => {
    if (currentData === null) {
      return itemInfo;
    } else {
      //Item Id already exists
      return; //Abort the transaction
    }
  });
}

function checkItemCommitted(result, itemInfo, setSuccessAlert) {
  if (result.committed) {
    setSuccessAlert("Food Item added!");
  } else {
    // Item id already exists
    addItemToDatabase(itemInfo);
  }
  console.log("Food Item's data: ", result.snapshot.val());
}

/*
export function addItemToDatabase(itemInfo, setErrorAlert, setSuccessAlert) {
  addItem(itemInfo)
    .then((itemPromise) => followUp(itemPromise, itemInfo, setSuccessAlert))
    .catch((err, setErrorAlert) => {
      console.log(err);
      setErrorAlert(`Transaction failed abnormally! |  ${err.error}`);
    });
}
*/

export async function updateItem(itemInfo, setErrorAlert, setSuccessAlert) {
  const itemRef = firebase.database().ref(`foodItems/${itemInfo.id}`);
  return itemRef
    .update(itemInfo)
    .then(() => setSuccessAlert("Update succeeded."))
    .catch((error) => setErrorAlert("Update failed: " + error.message));
}

export function removeFromDatabase(path, id, setErrorAlert, setSuccessAlert) {
  const ref = firebase.database().ref(`${path}/${id}`);
  ref
    .remove()
    .then(() => setSuccessAlert("Remove Successful"))
    .catch((error) => setErrorAlert("Remove Failed: " + error.message));
}

export async function orderDelivered(order, setErrorAlert, setSuccessAlert) {
  //try {
  let results = await Promise.all(
    order.itemsInCart.map(async (item) => {
      //return { promise: await checkInventoryForOneItem(item), name: item.name };

      /*
      let res = checkInventoryForOneItem(item).catch((e) => {
        console.log("inside err");
        return { committed: false, name: item.name };
      });
      return res;
      */

      try {
        return {
          promise: await checkInventoryForOneItem(item),
          name: item.name,
        };
      } catch (e) {
        if (e.message === "Item unavailable") {
          console.log("item unavail");
        } else if (e.message === "Item deleted") {
          console.log("item deleted");
        }
        return { promise: { committed: false }, name: item.name };

        //return { committed: false, name: item.name };
      }
    })
  );
  console.log(results);
  let unavailableItems = results
    .filter((result) => checkAvailability(result))
    .map((result) => getName(result));
  console.log(unavailableItems);
  if (unavailableItems.length > 0) {
    setErrorAlert(`Error reserving ${unavailableItems.join()}`);
    return `Error reserving ${unavailableItems.join()}`;
  } else {
    setSuccessAlert(`Order Delivered`);
    return `Order Delivered`;
  }
  /*} catch (e) {
    //setErrorAlert(`Error ${e.error}`);
    console.log("error was caught");
  }*/
}

async function checkInventoryForOneItem(item) {
  const foodItemsRef = firebase.database().ref(`foodItems/${item.id}/`);
  return foodItemsRef.transaction((foodItem) => {
    if (foodItem) {
      console.log(foodItem);
      let itemsAvailable = foodItem.totalInventory - item.amount >= 0; //Change to inventory available eventaully
      if (itemsAvailable) {
        foodItem.totalInventory -= item.amount;
        foodItem.amountReserved -= item.amount;
        return foodItem;
      }
      throw new Error("Item unavailable");
      //return; // abort the transaction
    } else {
      throw new Error("Item deleted");
    }
  });
}

function checkAvailability(result) {
  return !result.promise.committed;
}

function getName(result) {
  console.log(result.name);
  return result.name;
}
