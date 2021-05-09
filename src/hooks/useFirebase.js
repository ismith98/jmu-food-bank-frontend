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
    (error, committed, snapshot) => {
      if (error) setErrorAlert(`Transaction failed abnormally! |  ${error}`);
      else if (committed) setSuccessAlert("Food Item added!");
      else {
        // Item id already exists
        addItemToDatabase(itemInfo);
      }
      console.log("Food Item's data: ", snapshot.val());
    }
  );
}

export function updateItem(
  path,
  itemInfo,
  oldId,
  setErrorAlert,
  setSuccessAlert,
  onSuccess = () => {}
) {
  const itemRef = firebase.database().ref(`${path}/${itemInfo.id}`);
  itemRef
    .update(itemInfo, () => {
      let afterRemove = () => {
        setSuccessAlert("Update Successful");
        onSuccess();
      };
      if (itemInfo.id !== oldId)
        removeFromDatabase(path, oldId, setErrorAlert, () => {}, afterRemove);
    })
    .catch((error) => setErrorAlert("Update failed: " + error));
}

export function removeFromDatabase(
  path,
  id,
  setErrorAlert,
  setSuccessAlert,
  onSuccess = () => {}
) {
  const ref = firebase.database().ref(`${path}/${id}`);
  ref
    .remove(() => {
      setSuccessAlert("Remove Successful");
      onSuccess();
    })
    .catch((error) => setErrorAlert("Remove Failed: " + error.message));
}

export function orderDelivered(order, setErrorAlert, setSuccessAlert) {
  const foodItemsRef = firebase.database().ref(`foodItems/`);

  return foodItemsRef.transaction(
    (foodItems) => {
      try {
        if (foodItems) {
          let updatedItems = order.itemsInCart.map((oneItemFromCart) => {
            let foodItem = foodItems[oneItemFromCart.id];

            if (foodItem) {
              let itemsAvailable =
                foodItem.totalInventory - oneItemFromCart.amount >= 0; //Change to inventory available eventaully

              if (itemsAvailable) {
                foodItem.totalInventory -= oneItemFromCart.amount;
                foodItem.amountReserved -= oneItemFromCart.amount;
                let id = oneItemFromCart.id;
                return { [id]: foodItem };
              }
              throw new Error(`Not enough ${foodItem.name}(s) available`);
            } else {
              throw new Error(
                `${oneItemFromCart.name} deleted. Visit *link w/ instructions* to resolve this issue`
              );
            }
          });

          return Object.assign(foodItems, ...updatedItems);
        }
      } catch (error) {
        setErrorAlert(error.message);
      }
    },
    (error, committed) => {
      if (error) setErrorAlert(error);
      else if (committed) {
        let afterOrderAdded = () => setSuccessAlert(`Order Delivered`);
        addToCompletedOrders(order, setErrorAlert, afterOrderAdded);
      }
    }
  );
}

export function addToCompletedOrders(order, setErrorAlert, onSuccess) {
  const completedOrdersRef = firebase
    .database()
    .ref(`completedOrders/${order.orderId}`);

  completedOrdersRef.update(order, (error) => {
    if (error)
      setErrorAlert("Failed to add this order to list of completed orders");
    removeFromDatabase(
      "orders",
      order.orderId,
      setErrorAlert,
      () => {},
      onSuccess
    );
  });
}
