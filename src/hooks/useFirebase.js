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

export function addItemToDatabase(itemInfo, setErrorAlert, setSuccessAlert) {
  itemInfo.id = nanoid();
  const foodItemsRef = firebase.database().ref(`foodItems/${itemInfo.id}`);
  foodItemsRef.transaction(
    (currentData) => {
      if (currentData === null) {
        return itemInfo;
      } else {
        //Item Id already exists
        return; //Abort the transaction
      }
    },
    function (error, committed, snapshot) {
      if (error) {
        setErrorAlert(`Transaction failed abnormally! |  ${error}`);
      } else if (!committed) {
        // Item id already exists
        addItemToDatabase(itemInfo);
      } else {
        setSuccessAlert("Food Item added!");
      }
      console.log("Food Item's data: ", snapshot.val());
    }
  );
}

export function updateItem(itemInfo, setErrorAlert, setSuccessAlert) {
  const itemRef = firebase.database().ref(`foodItems/${itemInfo.itemId}`);
  itemRef
    .update({
      name: itemInfo.itemName,
      id: itemInfo.itemId,
      totalInventory: itemInfo.totalInventory,
    })
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
