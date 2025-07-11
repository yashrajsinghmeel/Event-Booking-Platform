export const validateEmail = (email) => {
  if (typeof email !== "string") return false;

  const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/*
🚀 Explanation
^[^\s@]+ → one or more characters except whitespace or @

@ → must have a single @

[^\s@]+ → again one or more characters (domain)

\. → a literal dot

[^\s@]{2,}$ → at least 2 characters after dot (like .com, .in)

*/