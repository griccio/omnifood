//get the element
let node = document.getElementById("first");
node.innerHTML = "<p>this text has changed by javascript</p>";
console.log(node.innerHTML);

console.log(node.innerText);

// node.setAttribute("class", "second");
// node.removeAttribute("class");

//add a class
node.classList.add("third");
console.log(node.classList);
node.classList.remove("margin--sb");
node.classList.remove("first");
let i = 0;
function test() {
  console.log("You clicked button two");
  i = i + 1;
  let count = document.querySelector(".counter");
  count.innerText = i;
}
let btn2 = document.getElementById("btnTest2");
btn2.addEventListener("click", test);
