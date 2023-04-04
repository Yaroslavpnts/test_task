import { isAxiosError } from 'axios';

export const setError = (error: unknown, setter: (error: string) => void) => {
  if (isAxiosError(error)) {
    const { response } = error as {
      response: {
        data: {
          message: string;
        };
      };
    };
    setter(response.data.message);
  } else {
    const { message } = error as { message: string };
    setter(message);
  }
};
