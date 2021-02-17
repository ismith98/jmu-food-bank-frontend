import firebase from "../firebase";

export function getItems(setLoading, setItems) {
  setLoading(true);
  const foodItemsRef = firebase.database().ref("foodItems/");
  foodItemsRef.on("value", (snapshot) => {
    let value = snapshot.val();
    if (value !== null) {
      let items = Object.values(value);
      // sort by name
      let foodItems = items.sort((a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setItems(foodItems);
      //setFilteredFoodItems(foodItems);
      console.log(foodItems);
    }
    setLoading(false);
  });
}

export function getOrders(/*setLoading,*/ setOrders) {
  //setLoading(true);
  const ordersRef = firebase.database().ref("orders/");
  ordersRef.on("value", (snapshot) => {
    let value = snapshot.val();
    if (value !== null) {
      value = Object.values(value);
      /*
      // sort by timeOrdered
      let foodItems = value.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setItems(foodItems);
      */
      setOrders(value);
      //setFilteredFoodItems(foodItems);
      //console.log(foodItems);
      console.log(value);
    }
    //setLoading(false);
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
