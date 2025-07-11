export const validatePhone = (phone) => {
  // if (typeof phone !== "string" || !/^\d+$/.test(phone)) {
  //   return false; // not a string of digits 0-9
  // }
  return /^[6-9]\d{9}$/.test(phone); // must be valid Indian phone
};


/*
| Part           | Meaning                                                 |
| -------------- | ------------------------------------------------------- |
| `/.../`        | The **regular expression** pattern                      |
| `^`            | Start of the string                                     |
| `[6-9]`        | First digit must be 6, 7, 8, or 9                       |
| `\d{9}`        | Exactly **9 digits** after the first one (`\d` = digit) |
| `$`            | End of the string                                       |
| `.test(phone)` | Run this pattern check on `phone` variable              |

*/