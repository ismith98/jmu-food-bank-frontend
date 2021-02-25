import firebase from "../firebase";
import { nanoid } from "nanoid";

export function getItems(setLoading, setItems) {
  setLoading(true);
  const foodItemsRef = firebase.database().ref("foodItems/");
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

export function getOrders(/*setLoading,*/ setOrders) {
  //setLoading(true);
  const ordersRef = firebase.database().ref("orders/");
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

export function addItemToDatabase(itemInfo, setErrorAlert, setSuccessAlert) {
  addItem(itemInfo)
    .then((committed, snapshot) =>
      followUp(committed, snapshot, itemInfo, setErrorAlert, setSuccessAlert)
    )
    .catch((error, setErrorAlert) =>
      setErrorAlert(`Transaction failed abnormally! |  ${error}`)
    );
}

function followUp(itemPromise, itemInfo, setSuccessAlert) {
  console.log(`item Promise: ${itemPromise}`);
  if (!itemPromise.committedcommitted) {
    // Item id already exists
    addItemToDatabase(itemInfo);
  } else {
    setSuccessAlert("Food Item added!");
  }
  console.log("Food Item's data: ", itemPromise.snapshot.val());
}

export function updateItem(itemInfo, setErrorAlert, setSuccessAlert) {
  const itemRef = firebase.database().ref(`foodItems/${itemInfo.id}`);
  itemRef
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

/*
export function orderDelivered(order, setInventoryAvailable) {
  order.itemsInCart.forEach((item) =>
    checkInventoryForOneItem(item, setInventoryAvailable)
  );
}

function checkInventoryForOneItem(
  item,
  setInventoryAvailable,
  setVisitedAllItems
) {
  const foodItemsRef = firebase.database().ref(`foodItems/${item.id}/`);
  foodItemsRef.transaction(
    (foodItem) => {
      if (foodItem) {
        console.log(foodItem);
        let itemsAvailable =
          foodItem.totalInventory - foodItem.amountReserved - item.amount >= 0;
        if (!itemsAvailable) {
          setInventoryAvailable(false);
          useErrorAlert(
            `There is not enough ${item.name} in the inventory to complete this transaction`
          );
        } else {
          foodItem.amountReserved -= item.amount;
        }
        return foodItem;
      } else {
        useErrorAlert(
          `${item.name} id has changed from when this user reserved it`
        );
        return;
      }
    },
    function (error, committed, snapshot) {
      if (error) {
        useErrorAlert(`Error reserving ${item.name} |  ${error}`);
        setStartOrder(false);
        setOrderComplete(true);
      } else if (!committed) {
        setNameOfItemUnavailable(item.name);
        /*
        setStartOrder(false);
        setOrderComplete(true);*/
/*
      } else if (committed) {
        setUnprocessedItems((prevAmount) => prevAmount - 1);
      }
      if (item.id === itemsInCart[itemsInCart.length - 1].id) {
        setVisitedAllItems(true);
      }
    }
  );
}

*/
