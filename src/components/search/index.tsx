import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { type SearchProps } from '../../types/components';

const Search = ({ onChange }: SearchProps): JSX.Element => {
  return (
    <div
      className={
        `grow flex flex-row md:w-2/3 px-8 py-4 border bg-white rounded
        shadow-md focus:border-cyan-800 hover:border-cyan-800
      border-cyan-600`
      }
    >
      <input
        type="text"
        placeholder="search your favorite episode..."
        onChange={onChange}
        className="flex-grow outline-0 font-bold text-lg placeholder:text-slate-400 placeholder:font-thin"
      />
      <SearchIcon className="w-8 stroke-cyan-800"/>
    </div>
  );
};

export default Search;
