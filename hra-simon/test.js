var array = ["pending"];

$(".btn").on("click", function() {
  if (array[0] == "pending") {
    array.pop("pending");
    array.push("active");
    console.log(array);
  } else if (array[0] == "active") {
    alert("Stop clicking so much!");
  }
})
