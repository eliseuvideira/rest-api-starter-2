declare namespace NodeJS {
  export interface ProcessEnv {
    // Environment
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;
  }
}
