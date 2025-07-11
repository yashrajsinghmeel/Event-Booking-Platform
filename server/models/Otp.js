// models/Otp.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true }, // hashed
  createdAt: { type: Date, default: Date.now, expires: 300 }, // TTL: 5 min
});

export default mongoose.model('Otp', otpSchema);

/**
 Difference between two different syntax
 1. First Syntax
 const User = mongoose.model("User", userSchema);
 export default User;

 {
 ✅ What it does:
    Creates a User model from userSchem
    Stores it in a variable User
    Exports the variable

 ✅ When to use:
    When you need to use the model inside the same file before exporting
    When you want more readable and reusable code

 ➕ Example:
    {
        const User = mongoose.model("User", userSchema);
        User.find(); // ✅ You can use the model before export
        export default User;

    }
 }

 2. Second Syntax
 export default mongoose.model('Otp', otpSchema);

  {
   ✅ What it does:
      Directly exports the Mongoose model for "Otp" without assigning it to a variable

   ✅ When to use:
      When you don’t need to use the model in the same file
      For short or utility files where readability is still clear

   ⚠️ Limitation:
      You can't use the model inside the same file unless you import it again.
  }  

  🧠 Best Practice
     For large or production codebases, use the first approach for clarity and debugging:
     Only use the second one-liner style when you're confident you don’t need local usage in the file.



 */