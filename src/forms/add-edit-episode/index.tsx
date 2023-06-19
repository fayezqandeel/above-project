import React from 'react';
import { useForm } from 'react-hook-form';
import Field from '../../components/field';
import Button from '../../components/button';
import { type Episode } from '../../types/episode';
import { type AddSaveEpisodeForm } from '../../types/forms';

const Index = ({ onSubmit, onCancel, data }: AddSaveEpisodeForm): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<Episode>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-0 md:gap-2">
        <Field
          label="Series"
          placeholder="enter series name..."
          error={(errors.series != null) && <span>series is required!</span>}
        >
          <input defaultValue={data?.series as string} type="text" {...register('series', { required: true })} />
        </Field>
        <Field
          label="Title"
          placeholder="enter episode title..."
          error={(errors.title != null) && <span>title is required!</span>}
        >
          <input defaultValue={data?.title as string} type="text" {...register('title', { required: true })} />
        </Field>
        <Field
          label="Description"
          placeholder="enter episode description..."
          error={(errors.description != null) && <span>description is required!</span>}
        >
          <textarea {...register('description', { required: true })} defaultValue={data?.description as string}>
          </textarea>
        </Field>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-1 md:gap-2">
          <Field
            label="Season #"
            placeholder="enter season number..."
            error={(errors.seasonNumber != null) && <span>season number is required!</span>}
          >
            <input
              min={1}
              defaultValue={data?.seasonNumber}
              type="number"
              {...register('seasonNumber', { required: true })}
            />
          </Field>
          <Field
            placeholder="enter episode number..."
            label="Episode #"
            error={(errors.episodeNumber != null) && <span>episode number is required!</span>}
          >
            <input
              min={1}
              type="number"
              defaultValue={data?.episodeNumber}
              {...register('episodeNumber', { required: true })}
            />
          </Field>
          <Field
            label="Release Date"
            placeholder="enter release date..."
            error={(errors.releaseDate != null) && <span>release date is required!</span>}
          >
            <input
              type="date"
              defaultValue={data?.releaseDate as string}
              {...register('releaseDate', { required: true })}
            />
          </Field>
        </div>
        <Field
          label="IMDB ID"
          placeholder="enter IMDB ID..."
          error={(errors.imdbId != null) && <span>IMDB ID is required!</span>}
        >
          <input type="text" defaultValue={data?.imdbId} {...register('imdbId', { required: true })} />
        </Field>
      </div>
      <div className='flex flex-row-reverse mt-0 md:mt-4 border-t gap-2 pt-4'>
        <Button wide size="sm" type="submit" rounded variant="primary">Save</Button>
        <Button wide size="sm" onClick={onCancel} rounded>Cancel</Button>
      </div>
    </form>
  );
};

export default Index;
