'use client';

import { genres } from '../../constants';
import Button from '../../components/shared/Button';
import { useStore } from '../../app/store';
import { useState } from 'react';
import { updateGenres } from '../../lib/actions/user.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Toast from '../shared/Toast';
// This component is used in Onboarding page to pick genres
export default function GenrePicker({ clerkId, genreArr }) {
  const theme = useStore((store) => store.theme);
  const router = useRouter();

  const [pickGenres, setPickGenres] = useState(genreArr);
  const pickedGenresIdArray = pickGenres.map((genre) => genre.genreId);
  // this function is used to handle click on genre button
  function handleClick(id, name) {
    if (pickedGenresIdArray.includes(id)) {
      setPickGenres(pickGenres.filter((genre) => genre.genreId !== id));
    } else {
      setPickGenres([...pickGenres, { genreId: id, name: name }]);
    }
  }
  // this function is used to handle click on next button - it updates genres in db and must have at least 1 genre and max 3 genres
  async function handleSubmit() {
    if (pickGenres.length < 1) {
      toast.custom((t) => (
        <Toast t={t} type={'error'} message={'Please pick min. 1 genres'} />
      ));
      return;
    }
    if (pickGenres.length > 3) {
      toast.custom((t) => (
        <Toast t={t} type={'error'} message={'Please pick max. 3 genres'} />
      ));
      return;
    }
    toast.custom((t) => (
      <Toast t={t} type={'success'} message={'Genres updated'} />
    ));
    await updateGenres({ clerkId: clerkId, genres: pickGenres });
    router.push('/onboarding/appearance');
  }
  // this component renders all genres and handles click on genre button
  return (
    <>
      <article className="flex flex-wrap gap-[10px] justify-center pt-[70px] pb-[46px]">
        {genres.map((genre) => (
          <Button
            key={genre.genreId}
            text={genre.name}
            variant={
              !pickedGenresIdArray.includes(genre.genreId.toString()) &&
              'tertiary'
            }
            attributes="text-[12px] py-[6px] px-[14px] w-max"
            handleClick={() =>
              handleClick(genre.genreId.toString(), genre.name)
            }
          />
        ))}
      </article>
      <hr
        className={`w-full border-t-[0.5px] my-[24px] ${
          theme === 'light' ? 'border-black/20' : 'border-white/20'
        }`}
      />
      <Button
        text={'next'}
        attributes="text-[16px] tracking-[0.96px] py-[13px]"
        buttonWidth={'w-full'}
        handleClick={handleSubmit}
      />
    </>
  );
}
