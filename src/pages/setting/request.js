import React from "react";
import { Context } from "../../store";
import { useScraper } from "../../api";

export function useAppConfig() {
  const { perform, ...state } = useScraper();
  const [{ api }] = Context.useContext();

  const get = React.useCallback(async (project, category, id) => {
    try {
      await perform(
        `${api.schema}://${api.host}/api/app/config`,
        {
          method: "GET",
        },
        (data) => data
      );
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return { get, ...state };
}
