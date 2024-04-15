import React, { createContext, useMemo } from 'react';

import filter from 'leo-profanity';

const FilterContext = createContext({});
FilterContext.displayName = 'FilterContext';

const FilterProvider = ({ children }) => {
  filter.loadDictionary('en');
  const russianBadWords = filter.getDictionary('ru');
  filter.add(russianBadWords);

  const value = useMemo(() => ({
    filter,
  }), []);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const { filter: context } = React.useContext(FilterContext);
  return context;
};

export { FilterProvider, useFilter };
