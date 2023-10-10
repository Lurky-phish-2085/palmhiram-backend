import {FunctionParser} from "firebase-backend";

exports = new FunctionParser(
  {
    rootPath: __dirname,
    exports,
    verbose: true,
  }
).exports;
