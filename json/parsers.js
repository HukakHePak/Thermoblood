function stringify(obj) {
  switch (typeof obj) {
    case "object":
      if (Array.isArray(obj)) return `[${obj.map(stringify)}]`;
      return `{${Object.entries(obj).map((entry) =>
        entry.map(stringify).join(":")
      )}}`;
    case "string":
      return `"${obj}"`;
    default:
      return obj;
  }
}

function filter(str) {
  return str
    .split("")
    .filter((v) => !['"', " "].includes(v))
    .join("");
}

// #1
console.log(stringify([1, 2, 3, "a", "b", "c"]));

// #2
console.log(stringify({ a: 1, b: 2, c: "eee", d: true }));

// #3
console.log(stringify({ a: ["a", "b", "c"], b: "111", c: "eee" }));

// #4
console.log(
  "[1,2,3,4,5]"
    .slice(1, -1)
    .split(",")
    .map((item) => +item)
    .reduce((sum, item) => sum + item, 0)
);

//#5
console.log(
  `{ "data1": [1,2,3], "data2": [4,5,6], "data3": [7,8,9] }`
    .split("[")
    .slice(1)
    .map((item) => item.split("]")[0])
    .join(",")
    .split(",")
    .reduce((sum, item) => sum + +item, 0)
);

//#6
console.log(
  `<ul>\n${'["user1","user2","user3","user4","user5"]'
    .slice(1, -1)
    .split(",")
    .map((item) => `  <li>${item.slice(1, -1)}</li>`)
    .join("\n")} \n</ul>`
);

//#7
console.log(
  `<table>\n${filter(
    `[ { "name": "user1", "age": 25, "salary": 1000 }, { "name": "user2", "age": 26, "salary": 2000 }, { "name": "user3", "age": 27, "salary": 3000 } ]`
  )
    .split("{")
    .slice(1)
    .map(
      (item, index) =>
        `  ${
          !index
            ? `<tr>\n${item
                .split("}")[0]
                .split(",")
                .map((value) => `    <th>${value.split(":")[0]}</th>`)
                .join("\n")}\n  </tr>\n  `
            : ``
        }<tr>\n${item
          .split("}")[0]
          .split(",")
          .map((value) => `    <td>${value.split(":")[1]}</td>`)
          .join("\n")}</tr>`
    )
    .join("\n")} \n</table>`
);

// #8
console.log(stringify(["user1", "user2", "user3", "user4", "user5"]));

// #9
console.log(
  "<ul> <li>city1</li> <li>city2</li> <li>city3</li> <li>city4</li> </ul>"
    .split("<li>")
    .slice(1)
    .map((item) => item.split("</li>")[0])
);

// #10
console.log(
  "<table> <tr> <th>Фамилия</th> <th>Имя</th> <th>Отчество</th> </tr> <tr> <td>Иванов</td> <td>Иван</td> <td>Иванович</td> </tr> <tr> <td>Петров</td> <td>Петр</td> <td>Петрович</td> </tr> <tr> <td>Сидоров</td> <td>Сидр</td> <td>Сидорович</td> </tr> </table>"
    .split("</tr>")
    .slice(1)
    .map((item) =>
      Object.fromEntries(
        item
          .split("<td>")
          .slice(1)
          .map((name, index) => [
            [["surname", "name", "patronumyc"][index]],
            name.split("</td>")[0]
          ])
      )
    )
);

// #11
console.log(
  stringify([
    ...'["user1","user2","user3","user4","user5"]'
      .slice(1, -1)
      .split(",")
      .map((item) => item.slice(1, -1)),
    "user6"
  ])
);

// #12
console.log(
  (function () {
    const arr = '["user1","user2","user3","user4","user5"]'
      .slice(1, -1)
      .split(",")
      .map((item) => item.slice(1, -1));
    arr[1] = "user6";
    return stringify(arr);
  })()
);

// #13
console.log(
  (function () {
    const arr = filter(
      `[ { "name": "user1", "age": 25, "salary": 1000 }, { "name": "user2", "age": 26, "salary": 2000 }, { "name": "user3", "age": 27, "salary": 3000 } ]`
    )
      .split("{")
      .slice(1)
      .map((item) =>
        Object.fromEntries(
          item
            .split("}")[0]
            .split(",")
            .map((pair) => pair.split(":"))
            .map((item) => [item[0], +item[1] >= 0 ? +item[1] : item[1]])
        )
      );

    arr.push({ name: "user4", age: 11, salary: 10 });

    return stringify(arr);
  })()
);
