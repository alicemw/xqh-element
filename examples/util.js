export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

// export function deepClone(obj) {
//   //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
//   let objClone = Array.isArray(obj) ? [] : {};
//   //进行深拷贝的不能为空，并且是对象或者是
//   if (obj && typeof obj === "object") {
//     for (key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         if (obj[key] && typeof obj[key] === "object") {
//           objClone[key] = deepClone1(obj[key]);
//         } else {
//           objClone[key] = obj[key];
//         }
//       }
//     }
//   }
//   return objClone;
// }
