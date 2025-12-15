import { Filter } from './components/Filter';
import { SearchBar } from './components/SearchBar';
import { ViewToggle } from './components/ViewToggle';
import { Map } from './components/Map';
import { CountryList } from './components/CountryList';
import { CountryOverview } from './components/CountryOverview';
import { HomeOverlay } from './components/HomeOverlay';

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* MAP LAYER */}
      <div className="fixed inset-0 z-0">
        <Map />
      </div>

      {/* HOME (HERO + ABOUT) OVERLAY */}
      <HomeOverlay />

      {/* MAP UI (only visible in map view via store logic) */}
      <div className="relative z-20">
        <div className="bg-black w-full flex md:justify-center">
          <div className="flex w-full md:w-auto gap-2 items-center p-1">
            <Filter />
            <SearchBar />
          </div>
        </div>
        <ViewToggle />
        <CountryList />
        <CountryOverview />
      </div>
    </div>
  );
}
