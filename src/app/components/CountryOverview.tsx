'use client';
import { useSelectedCountry } from '@/stores/useSelectedCountry';
import { useFilterStore } from '@/stores/useFilterStore';
import { useChinguStats } from '@/hooks/useChinguStats';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import ReactCountryFlag from 'react-country-flag';
import { getCountryData } from '@/lib/geo';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export const CountryOverview = () => {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const { clearFilter, filters } = useFilterStore();

  const stats = useChinguStats();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      clearFilter('countryName');
      setSelectedCountry(null);
    }
  };

  if (!selectedCountry) return null;

  const countryData = getCountryData(selectedCountry);

  return (
    <Dialog open={!!selectedCountry} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] fixed bottom-12 top-auto translate-y-0 pt-4 bg-chingu-green-600 border-chingu-green-300 rounded-3xl [&>button]:text-chingu-green-100">
        <DialogHeader className="gap-4 flex flex-row items-center">
          <div className="rounded-full p-2 bg-chingu-green-600">
            {countryData?.cca2 || countryData?.cca3 ? (
              <ReactCountryFlag
                countryCode={countryData.cca2 || countryData.cca3}
                svg
                style={{
                  fontSize: '1.8rem',
                  lineHeight: '1.8rem',
                }}
              />
            ) : null}
          </div>

          <DialogTitle className="text-left font-bold text-xl text-white">
            {selectedCountry}
          </DialogTitle>
        </DialogHeader>

        <div className="text-white flex items-center gap-2">
          Number of Chingus:{' '}
          {Object.keys(filters).length > 0 ? (
            <span className="flex items-center gap-1 text-chingu-green-100 font-bold">
              <Users size={16} strokeWidth={3} />
              {stats.summary.filtered}
              <span className="font-medium text-chingu-green-300">
                / {stats.summary.total}
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-2 text-chingu-green-100 font-bold">
              <Users size={16} strokeWidth={3} />
              {stats.summary.total}
            </span>
          )}
        </div>
        {Object.keys(filters).length > 0 ? (
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-chingu-green-100">Filters</h5>
            <div className="flex gap-2">
              {Object.entries(filters).map(([filter, value]) => (
                <Badge
                  key={filter}
                  onClick={() => clearFilter(filter)}
                  className="text-white text-sm bg-chingu-green-400"
                >
                  <span className="capitalize">
                    {value?.replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </span>
                  <X size={12} />
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
        <div className="max-h-[270px] flex gap-4 flex-col overflow-auto scrollbar-hide">
          {Object.entries(stats.counts).map(([category, counts]) => {
            if (category in filters) return null;
            const hasAnyCounts = Object.values(counts).some((val) => val > 0);
            if (!hasAnyCounts) return null;

            return (
              <div key={category} className="flex flex-col">
                <h4 className="capitalize font-semibold mb-1 text-chingu-green-100">
                  {category.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </h4>

                {Object.entries(counts).map(([key, val]) => {
                  const filteredTotal = stats.summary.filtered;

                  const percentOfFiltered =
                    filteredTotal > 0 ? (val / filteredTotal) * 100 : 0;

                  return (
                    <div key={key} className="flex flex-col gap-1 mb-2">
                      <div className="flex flex-row justify-between">
                        <p className="truncate text-white flex items-center gap-2">
                          {key}{' '}
                          <span className="flex items-center gap-2 text-chingu-green-200">
                            <Users size={16} strokeWidth={3} />
                            {val}
                          </span>
                        </p>
                        <p className="text-sm text-white">
                          {percentOfFiltered.toFixed()}%
                        </p>
                      </div>
                      <Progress
                        value={percentOfFiltered}
                        className="progress-track bg-input"
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <DialogFooter className="pt-8">
          {/* <Button className="flex grow bg-[#444]">View Chingus</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
