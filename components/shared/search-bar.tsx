"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, XCircle } from "lucide-react";
import Link from "next/link";
import { searchFeedback } from "@/lib/actions/feedback.actions";

interface Feedback {
  id: string;
  title: string;
  feedback: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<Feedback[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchSearchQueryResult = async () => {
      if (query.length > 2) {
        setIsSearching(true);
        try {
          const response = await searchFeedback(query);
          if (response?.state === "success") {
            setFilteredResults(response.data);
          } else {
            console.error("Search failed:", response?.message);
            setFilteredResults([]);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setFilteredResults([]);
      }
    };

    fetchSearchQueryResult();
  }, [query]);

  return (
    <div className="relative w-full max-w-lg mx-auto mt-4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative z-20 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-300 w-full focus-within:ring-2 focus-within:ring-primary/50">
            <Search className="text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search feedbacks..."
              value={query}
              onChange={handleSearch}
              className="appearance-none bg-transparent outline-none text-gray-900 w-full placeholder-gray-500"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="focus:outline-none"
              >
                <XCircle className="w-5 h-5 text-gray-400 hover:text-red-500 transition" />
              </button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="absolute z-50 w-[600px] max-w-lg bg-white shadow-lg mt-2 rounded-lg border border-gray-200 p-5"
          side="bottom"
          align="start"
        >
          {isSearching ? (
            <p className="text-sm text-gray-500 p-3 text-center">
              Searching...
            </p>
          ) : filteredResults.length > 0 ? (
            <div className="max-h-60 overflow-y-auto w-full">
              {filteredResults.map((feedback) => (
                <Link
                  key={feedback.id}
                  href={`/feedback/${feedback.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition w-full border-b border-gray-100 last:border-b-0 "
                >
                  <Search className="w-4 h-4 text-primary" />
                  <div className="w-full">
                    <p className="font-medium text-gray-800">
                      {feedback.title}
                    </p>
                    <p className="text-sm text-gray-500">{feedback.feedback}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 p-3">No results found.</p>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
