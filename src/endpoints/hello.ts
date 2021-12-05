import { endpoint } from "../functions/endpoint";

export interface HelloBody {
  message: string;
}

export const hello = endpoint<HelloBody>(async () => {
  return {
    status: 200,
    body: {
      message: "Hello World!",
    },
  };
});

export interface HelloMessageBody {
  message: string;
}

export interface HelloMessageArgs {
  params: {
    username: string;
  };
}

export const helloUsername = endpoint<HelloMessageBody, HelloMessageArgs>(
  async (args) => {
    const {
      params: { ...params },
    } = args;

    return {
      status: 200,
      body: {
        message: `Hello ${params.username}!`,
      },
    };
  },
);
