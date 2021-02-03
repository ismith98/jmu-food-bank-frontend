import firebase from "../firebase";

export function getItems(setLoading, setItems) {
  setLoading(true);
  const foodItemsRef = firebase.database().ref("foodItems/");
  foodItemsRef.on("value", (snapshot) => {
    let value = snapshot.val();
    if (value !== null) {
      // sort by name
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
      //setFilteredFoodItems(foodItems);
      console.log(foodItems);
    }
    setLoading(false);
  });
}
