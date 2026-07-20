// Ye sirf TypeScript ko information deti hai.
// Express Request object me maine ek nayi property add ki hai.

// Ye normal import nahi hai.
// Hum sirf TypeScript ko bol rahe hain:
// Express ke original types load karo.
import 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      pagination: {
        page: number;
        limit: number;
        skip: number;
      };
    }
  }
}

export {};

// .d.ts ka matlab?

// .d.ts

// =

// Declaration File

// Ye sirf declaration hoti hai.

// Isme implementation nahi hoti.

// Example:

// Tum likhte ho:

// req.pagination

// Express bolta hai:

// Mere Request me pagination naam ki property hi nahi hai.

// To hum TypeScript ko bolte hain:

// Ab hai.

// Bas.

// express ko extand ker rahe hain

// declare module "express-serve-static-core" {

//   interface Request {

//     pagination: ...

//   }

// }

// Isko kehte hain Module Augmentation.

// Matlab:

// express-serve-static-core module ke andar jo Request hai usko extend karo.

// Ye bilkul valid hai.

// Lekin problem ye hai ke Express ke alag versions aur @types/express ki dependency chain ki wajah se kabhi kabhi TypeScript us module ko merge nahi karta.

// Isliye tumhare project me ye work nahi hua.

// Ab wala

// Ab tum likh rahe ho:

// declare global {

//   namespace Express {

//     interface Request {

//       pagination: ...

//     }

//   }

// }

// Ye kehta hai:

// Jahan bhi Express namespace use hoga, uske Request interface me ye property add kar do.

// Ye zyada universal hai.

// Isliye Express v4, v5 dono me almost hamesha kaam karta hai.

// Production projects me bhi bahut log yehi use karte hain.

// export {} kyun?

// Ye line:

// export {};

// file ko module bana deti hai.

// Agar ye na ho to TypeScript kabhi kabhi file ko global script samajhta hai aur declaration ignore kar deta hai.

// Interface Request

// Express ke andar already hota hai:

// interface Request {

// }

// Hum usko dubara nahi bana rahe.

// Hum usko extend kar rahe hain.

// interface Request {

//     pagination: ...

// }

// Matlab

// Original Request

// ↓

// body
// params
// query
// headers

// Ab ban gaya

// body
// params
// query
// headers
// pagination

// Bas.
