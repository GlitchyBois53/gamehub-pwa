import DropDown from './DropDown';
import { useCallback } from 'react';

export default function Sort({ searchParams }) {
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const orderOptions = [
    {
      name: 'Ascending',
      value: 'asc',
    },
    {
      name: 'Descending',
      value: 'desc',
    },
  ];

  const sortOptions = [
    {
      name: 'Total Rating',
      value: 'total_rating',
    },
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Release Date',
      value: 'first_release_date',
    },
  ];

  return (
    <article className="mt-[18px] flex justify-between">
      {searchParams?.search && (
        <h2 className="text-[12px] font-semibold tracking-[0.72px] uppercase">
          Showing results for{' '}
          <span className="italic">"{searchParams.search}"</span>
        </h2>
      )}
      <div className='flex gap-[18px]'>
        <DropDown
          name={'Order'}
          options={orderOptions}
          fn={createQueryString}
          param={'order'}
          searchParams={searchParams.order || 'desc'}
        />
        <DropDown
          name={'Sort By'}
          options={sortOptions}
          fn={createQueryString}
          param={'sort'}
          searchParams={searchParams.sort || 'total_rating'}
        />
      </div>
    </article>
  );
}
