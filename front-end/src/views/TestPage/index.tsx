import React, { useEffect, useState } from 'react';
import { imgObj } from '@/interface/imagesApi';
import { getPhotos } from '@/api/images';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

const TestPage = () => {
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<imgObj[]>([]);
  useEffect(() => {
    getPhotos(
      { page: 1, limit: 2 },
      (res) => {
        console.log(res.data);
        setPhotos(res.data.images);
      },
      (content) => {
        message.error(content);
      }
    );
  }, []);
  return (
    <div>
      {photos.map((photo) => {
        return (
          <img key={photo._id} src={photo.url + photo.filename} alt="photo" />
        );
      })}
    </div>
  );
};
export default TestPage;
