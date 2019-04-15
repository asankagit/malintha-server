class Hello {
  static world() {
	let o1 = { a: 1,b:10 };
	let o2 = { b: 2,c:3 };
	let obj = { ...o1, ...o2 }; // { a: 1, b: 2 }
    console.log(obj);
  }
}
Hello.world();