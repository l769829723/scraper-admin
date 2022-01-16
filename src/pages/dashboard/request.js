import React from "react";
import { Context } from "../../store";
import { useScraper } from "../../api";

export function useProjects() {
  const { perform, ...state } = useScraper();
  const [{ api }] = Context.useContext();

  const get = React.useCallback(async () => {
    try {
      await perform(
        `${api.schema}://${api.host}/api/scrapy/projects`,
        {
          method: "GET",
        },
        ({ projects }) => projects?.filter((p) => p !== "default")
      );
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return { get, ...state };
}

export function useStatus() {
  const { perform, ...state } = useScraper();
  const [{ api }] = Context.useContext();

  const get = React.useCallback(async (project) => {
    try {
      await perform(
        `${api.schema}://${api.host}/api/scrapy/jobs?project=${project}`,
        {
          method: "GET",
        },
        ({ pending, running, finished }) => ({ pending, running, finished })
      );
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return { get, ...state };
}

export function useSummary() {
  const { perform, ...state } = useScraper();
  const [{ api }] = Context.useContext();

  const get = React.useCallback(async () => {
    try {
      await perform(
        `${api.schema}://${api.host}/api/scrapy/jobs?project=collector`,
        {
          method: "GET",
        },
        (data) => {}
      );
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return { get, ...state };
}
