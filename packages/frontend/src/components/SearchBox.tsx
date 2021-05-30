import * as React from 'react';
import { useEffect, useState } from 'react';

export default function SearchBox({ options }: { options: string[] }) {
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    const results = options.filter((x) => x.toLowerCase().startsWith(search.toLowerCase()));
    if (results.length === 0) setSearchResults(['No results']);
    else setSearchResults(results);
    return () => {
      setSearchResults([]);
    };
  }, [search]);

  return (
    <>
      <div className="relative text-gray-600 w-full h-10">
        <input
          type="search"
          name="serch"
          placeholder="Search free high-resolution photos"
          onChange={(e) => {
            setShowList(e.target.value != '');
            setSearch(e.target.value);
          }}
          onBlur={() => setShowList(false)}
          onClick={() => setShowList(true)}
          className="bg-gray-100 px-5 mb-1 rounded-full text-sm h-10 w-full border border-transparent hover:border-gray-300 focus:border-gray-300 focus:bg-white"
        />
        {showList && (
        <div className="flex flex-col bg-white text-black w-full max-h-56 py-2 rounded border border-gray-300">
          <div className="overflow-y-auto">
            {searchResults.map((x) => (
              <div className="flex flex-col justify-center px-4 py-2 hover:bg-gray-100 cursor-pointer w-full">
                <span className="text-sm">{x}</span>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </>
  );
}
