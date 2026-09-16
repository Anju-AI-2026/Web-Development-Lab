// ========================================
// JavaScript Conditions - OR Operator
// Program 6
// ========================================


// ---------- OR Operator (||) ----------

let isStudent = true;

let hasPass = true;

if (isStudent == true || hasPass == true) {

    console.log("Entry allowed");

} else {

    console.log("Not allowed");

}


// ---------- Test 2 ----------

isStudent = true;

hasPass = false;

if (isStudent == true || hasPass == true) {

    console.log("Entry allowed");

} else {

    console.log("Not allowed");

}


// ---------- Test 3 ----------

isStudent = false;

hasPass = true;

if (isStudent == true || hasPass == true) {

    console.log("Entry allowed");

} else {

    console.log("Not allowed");

}


// ---------- Test 4 ----------

isStudent = false;

hasPass = false;

if (isStudent == true || hasPass == true) {

    console.log("Entry allowed");

} else {

    console.log("Not allowed");

}