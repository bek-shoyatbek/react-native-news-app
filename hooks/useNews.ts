import { api } from "@/api";
import { SearchNewsResponse } from "@/types";
import { useEffect, useState } from "react";

export const useNews = async (query: string) => {
  const [data, setData] = useState<SearchNewsResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.post("/news", {
          data: {
            q: query,
          },
        });

        if (response.status != 200) {
          setError(new Error("Couldn't fetch news with the query"));
          setLoading(false);
        }
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  }, [query]);
};
