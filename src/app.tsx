import React from 'react';
import { Plus } from 'lucide-react';
import { useEffect, useState, useCallback, type ChangeEvent } from 'react';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import { type GraphQLResult, type GraphQLSubscription } from '@aws-amplify/api';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from './aws-exports';
import { type GetAllEpisodesResponse, type Episode, type EpisodeWithoutId } from './types/episode';
import Search from './components/search';
import Button from './components/button';
import { debounce } from './utils';
import EpisodeCard from './components/episode-card';
import Modal from './components/modal';
import Loader from './components/loader';
import AddEditEpisodeForm from './forms/add-edit-episode';
import { v4 as uuidv4 } from 'uuid';
import { onCreateEpisode, onDeleteEpisode, onUpdateEpisode } from './graphql/subscriptions';
import { setAllAction, addAction, deleteAction, editAction, resetNotificationAction } from './features/episodesSlice';
import { useSelector, useDispatch } from 'react-redux';

Amplify.configure(awsExports);

const App = (): JSX.Element => {
  const {
    list: episodes,
    notification
  }: {
    list: Episode[]
    notification: boolean
  } = useSelector((state: any) => state.episodes);
  const [, setQuery] = useState<null | string>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // subscribe to realtime updates from app sync in case of new episode was created
    API.graphql<GraphQLSubscription<{ onCreateEpisode: Episode }>>(
      graphqlOperation(onCreateEpisode)
    ).subscribe({
      next: ({ value }) => {
        // dispatch the new created episode to the store
        dispatch(addAction(value.data?.onCreateEpisode));
        // show create notification
        setTimeout(() => dispatch(resetNotificationAction()), 5000);
      },
      error: (error) => { console.warn(error); }
    });
    // subscribe to realtime updates from app sync in case of episode was deleted
    API.graphql<GraphQLSubscription<{ onDeleteEpisode: Episode }>>(
      graphqlOperation(onDeleteEpisode)
    ).subscribe({
      next: ({ value }) => {
        // dispatch the deleted episode to the store
        dispatch(deleteAction(value.data?.onDeleteEpisode));
        // show delete notification
        setTimeout(() => dispatch(resetNotificationAction()), 5000);
      },
      error: (error) => { console.warn(error); }
    });
    // subscribe to realtime updates from app sync in case of episode was updated
    API.graphql<GraphQLSubscription<{ onUpdateEpisode: Episode }>>(
      graphqlOperation(onUpdateEpisode)
    ).subscribe({
      next: ({ value }) => {
        // dispatch the updated episode to the store
        dispatch(editAction(value.data?.onUpdateEpisode));
        // show update notification
        setTimeout(() => dispatch(resetNotificationAction()), 5000);
      },
      error: (error) => { console.warn(error); }
    });
  }, []);

  const onAddEpisode = async (data: EpisodeWithoutId): Promise<void> => {
    try {
      // create dynamic id & append it to form data
      const newData = { id: uuidv4(), ...data };
      // send request app sync graphql to create a new episode
      await API.graphql(
        graphqlOperation(mutations.addEpisode, {
          episode: newData
        })
      );
      // close create modal
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEntries = async (search?: string): Promise<void> => {
    setLoading(true);
    // send request to app sync graphql to return list of all episodes
    const result = (await API.graphql({
      query: queries.getAll,
      variables: {
        search
      }
    })) as GraphQLResult<GetAllEpisodesResponse>;
    // update store with most recent list
    dispatch(setAllAction(result.data?.listEpisodes));
    setLoading(false);
  };

  // Define the debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      await fetchEntries(query);
    }, 300), // Set the debounce delay (e.g., 300 milliseconds)
    []
  );

  const onSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    debouncedSearch(event.target.value);
    setQuery(event.target.value);
  };

  useEffect(() => {
    void fetchEntries();
  }, []);

  const onDelete = async (episodeId: string): Promise<void> => {
    // send request to app sync graphql to delete specific episode
    try {
      await API.graphql(
        graphqlOperation(mutations.deleteEpisode, { episodeId })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full min-h-screen bg-cyan-50 bg-opacity-10">
      <div className="container mx-auto">
        <div className="py-16 flex flex-col gap-8">
          <div className="flex-1 mx-4 md:mx-16 flex flex-col md:flex-row gap-4">
            <Search onChange={onSearch} />
            <Button wide onClick={() => { setModalOpen(true); }} rounded size="lg" variant="primary" block>
              <Plus className="h-5" />Add a new episode
            </Button>
          </div>
          {loading && <Loader />}
          {
            !loading && (
              <div className="grid grid-cols-1 mx-4 md:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                  episodes?.map(item => (
                    <EpisodeCard key={item.id} item={item} onDelete={onDelete} />
                  ))
                }
              </div>
            )
          }
          <Modal open={modalOpen} onOpenChange={setModalOpen}>
            <h2 className="text-2xl mb-2 font-bold">Add a new episode</h2>
            <AddEditEpisodeForm onSubmit={onAddEpisode} onCancel={() => { setModalOpen(false); }} />
          </Modal>
        </div>
      </div>
      {
        notification && (
          <div className='fixed right-4 top-4 bg-yellow-500 py-2 px-4 rounded-full font-thin text-white'>
            {notification}
          </div>
        )
      }
    </div>
  );
};

export default App;
