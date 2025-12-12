'use client';
import { Map, List } from 'lucide-react';
import { useShowCountryList } from '@/stores/useShowCountryList';

export const ViewToggle = () => {
  const { isCountryListDisplayed, showCountryList, hideCountryList } =
    useShowCountryList();

  const handleChange = () => {
    if (isCountryListDisplayed) hideCountryList();
    else showCountryList();
  };

  return (
    <label className="flex items-center w-16 h-8 cursor-pointer select-none bg-dark-bg border border-chingu-green-300 rounded-full p-0.5 absolute top-30 z-20 left-1/2 -translate-x-1/2">
      {/* The checkbox */}
      <input
        type="checkbox"
        checked={isCountryListDisplayed}
        onChange={handleChange}
        className="peer appearance-none w-full h-full rounded-full"
      />

      {/* Sliding knob */}
      <span className="absolute left-0 h-8 w-8 rounded-full bg-chingu-green-500 border border-chingu-green-200 shadow transition-transform duration-300 peer-checked:translate-x-8 z-0" />

      {/* Left icon (Map) */}
      <Map className="absolute left-2 h-4 w-4 text-chingu-green-100 z-10 transition-opacity peer-checked:opacity-50" />

      {/* Right icon (List) */}
      <List className="absolute right-2 h-4 w-4 text-chingu-green-100 z-10 transition-opacity opacity-50 peer-checked:opacity-100" />
    </label>
  );
};
