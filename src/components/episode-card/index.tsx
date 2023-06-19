import React, { useEffect, useState } from 'react';
import Card from '../card';
import { type Episode, type EpisodeWithoutId } from '../../types/episode';
import Button from '../button';
import Popover from '../popover';
import { Clapperboard, Eye, Pencil, Trash2, Star } from 'lucide-react';
import Modal from '../modal';
import axios from 'axios';
import Badge from '../badge';
import Loader from '../loader';
import AddEditEpisodeForm from '../../forms/add-edit-episode';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { type EpisodeCardProps } from '../../types/components';

const Index = ({ item, onDelete }: EpisodeCardProps): JSX.Element => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [details, setDetails] = useState<any>();

  const onSaveEpisode = async (data: EpisodeWithoutId): Promise<void> => {
    try {
      const newData: Episode = { id: item.id, ...data };
      const result = await API.graphql(
        graphqlOperation(mutations.editEpisode, {
          episode: newData
        })
      );
      // dispatch(editAction(newData));
      setModalEditOpen(false);
      console.log(result);
      // Handle the response or perform additional actions
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const getEpisodeDetails = async (id: string): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPI_APIKEY}&i=${id}`);
    setDetails(response.data);
  };

  useEffect(() => {
    if (modalOpen) {
      void getEpisodeDetails(item.imdbId);
    }
  }, [modalOpen]);

  const renderFooter = ({ id }: Episode): JSX.Element => (
    <div className="grid grid-cols-3  divide-x divide-gray-300">
      <Button onClick={() => { setModalOpen(true); }} className="text-xs">
        <Eye className="h-4" />Show
      </Button>
      <Button onClick={() => { setModalEditOpen(true); }} className="text-xs">
        <Pencil className="h-4" />Edit
      </Button>
      <Popover
        trigger={(
          <Button link variant="danger" onClick={() => { setOpenPopover(true); }} className="text-xs" size="xs">
            <Trash2 className="stroke-red-600 h-4" />Delete
          </Button>
        )}
        open={openPopover}
      >
        <h3>Are you sure you want to proceed?</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => { setOpenPopover(false); }} rounded border >Cancel</Button>
          <Button onClick={() => { onDelete(id.toString()); setOpenPopover(false); }} variant="danger" rounded>
            I&#39;m sure
          </Button>
        </div>
      </Popover>
    </div>
  );

  const renderDetails = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (details) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="overflow-hidden relative">
            <Badge variant="warning" className="absolute right-2 top-2 flex flex-row gap-1 items-center">
              <Star className="w-4" />
              {details.imdbRating}
            </Badge>
            <img className="object-cover h-full w-full" src={details.Poster} alt={item.title} />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
            <h5 className="text-sm">{item.series}</h5>
            <h2 className="text-lg md:text-xl font-bold">{item.title}</h2>
            <div className='gap-2 flex flex-row'>
                {(Boolean(details.Genre)) && details.Genre.split(',').map((item: any) => <Badge key={item} variant="info">{item}</Badge>)}
              </div>
            <p className='text-sm'><b>Writer: </b>{details.Writer}</p>

            <p className='font-thin'>{details.Plot}</p>
            <p className='text-sm flex flex-row gap-1'><Clapperboard className='h-5' /> {details.Director}</p>
          </div>
        </div>
      );
    }
    return <Loader />;
  };

  return (
    <Card key={item.id} footer={renderFooter(item)}>
        <h5 className="text-sm font-thin">{item.series}</h5>
        <h4 className="">{item.title}</h4>
        <Modal open={modalOpen} onOpenChange={() => { setModalOpen(false); }}>
          <div className="flex flex-col gap-4">
            {renderDetails()}
          </div>
        </Modal>
        <Modal open={modalEditOpen} onOpenChange={setModalEditOpen}>
          <h2 className="text-lg md:text-2xl mb-2 font-bold">Edit episode: {item.title}</h2>
          <AddEditEpisodeForm data={item} onSubmit={onSaveEpisode} onCancel={() => { setModalEditOpen(false); }} />
        </Modal>
    </Card>
  );
};

export default Index;
