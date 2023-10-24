import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function DropDown({ name, options, searchParams, param, fn }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const currentChoice = options.find((option) => option.value === searchParams);

  return (
    <div>
      <h3>{name}</h3>
      <article onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
        {currentChoice.name}
      </article>
      {isDropDownOpen && (
        <>
          {options.map((option) => {
            const route = pathname + '?' + fn(param, option.value);
            return (
              <div key={option.value} onClick={() => router.push(route)}>
                {option.name}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
