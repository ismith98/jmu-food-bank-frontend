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

export function addItemToDatabase(itemInfo) {
  itemInfo.itemId = nanoid();
  const foodItemsRef = firebase.database().ref(`foodItems/${itemInfo.itemId}`);
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
        return {
          error: true,
          message: `Transaction failed abnormally! |  ${error}`,
        };
        //setErrorAlert(`Transaction failed abnormally! |  ${error}`);
      } else if (!committed) {
        // Item id already exists
        addItemToDatabase(itemInfo);
      } else {
        return {
          error: false,
          message: "Food Item added!",
        };
        //setSuccessAlert("Food Item added!");
      }

      /*
      console.log("Food Item's data: ", snapshot.val());
      if (itemKeyExists) {
        addItemToDatabase(itemInfo);
      }
      */
    }
  );
}

export function updateItem(itemInfo) {
  const itemRef = firebase.database().ref(`foodItems/${itemInfo.itemId}`);
  itemRef
    .update({
      name: itemInfo.itemName,
      id: itemInfo.itemId,
      totalInventory: itemInfo.totalInventory,
    })
    .then(function () {
      console.log("Update succeeded.");
    })
    .catch(function (error) {
      console.log("Update failed: " + error.message);
    });
}

export function deleteItem(itemId) {
  const itemRef = firebase.database().ref(`foodItems/${itemId}`);
  itemRef
    .remove()
    .then(function () {
      console.log("Remove succeeded.");
    })
    .catch(function (error) {
      console.log("Remove failed: " + error.message);
    });
}

export function deleteOrder(orderId) {
  const itemRef = firebase.database().ref(`orders/${orderId}`);
  itemRef
    .remove()
    .then(function () {
      console.log("Remove succeeded.");
    })
    .catch(function (error) {
      console.log("Remove failed: " + error.message);
    });
}
