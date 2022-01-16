import React from "react";
import { Context } from "../store";
import { useFetch } from "../utils/hook";

export function useDetection() {
  const [{ api }, setContext] = Context.useContext();

  const { perform, ...result } = useFetch();

  const detect = async () => {
    try {
      await perform(`${api.schema}://${api.host}/api`, {
        method: "OPTIONS",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { ...result, detect };
}

export function useScraper() {
  const [{ credential }] = Context.useContext();

  const { perform: performFetch, ...state } = useFetch();

  const perform = React.useCallback(async (url, options, callback) => {
    if (!Object.keys(credential || {})?.length) {
      throw new Error("Invalid Credentials");
    }
    return await performFetch(
      url,
      {
        ...options,
        headers: { ...options.headers, ...credential },
      },
      callback
    );
  }, []);

  return { perform, ...state };
}
