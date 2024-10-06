import { api } from "@/api";
import { setItem } from "@/helpers/async-storage";
import { getRandomUUID } from "@/helpers/get-random-uuid";
import { SearchNewsResponse } from "@/types";
import { useEffect, useState } from "react";

export const useNews = (query: string) => {
  const [data, setData] = useState<SearchNewsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!query.trim()) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.post("/news", {
          q: query.trim(),
          num: 10,
        });
        let searchNewsResponse: SearchNewsResponse = response.data;
        searchNewsResponse.news = searchNewsResponse.news.map((e) => {
          return { ...e, id: getRandomUUID() };
        });
        setData(searchNewsResponse);
        await setItem("news", searchNewsResponse.news);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "An error occurred",
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  return { data, loading, error };
};
