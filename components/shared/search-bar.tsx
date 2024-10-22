"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, XCircle } from "lucide-react";
import feedbacks from "@/lib/data";
import Link from "next/link";

interface Feedback {
  id: number;
  title: string;
  description: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<Feedback[]>([]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 0) {
      const results = feedbacks.filter((feedback) =>
        feedback.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleBlur = () => {
    if (!query) {
      setFilteredResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mt-4">
      <Popover>
        <PopoverTrigger asChild>
          {/* Search Bar */}
          <div className="relative z-20 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full shadow-md transition-all w-full focus-within:ring-2 focus-within:ring-primary/50">
            <Search className="text-gray-500 w-5 h-full" />
            <input
              type="text"
              placeholder="Search feedbacks..."
              value={query}
              onChange={handleSearch}
              onBlur={handleBlur}
              className="appearance-none bg-transparent outline-none border-none focus:ring-0 text-gray-900 w-full"
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

        {/* Search Results Popover */}
        <PopoverContent
          className="absolute z-50 w-full max-w-lg bg-white shadow-lg mt-2 p-0 rounded-lg"
          side="bottom"
          align="start"
        >
          {filteredResults.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {filteredResults.map((feedback) => (
                <Link
                  key={feedback.id}
                  href={`/feedback/${feedback.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 transition w-full"
                >
                  <Search className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {feedback.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {feedback.description}
                    </p>
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
