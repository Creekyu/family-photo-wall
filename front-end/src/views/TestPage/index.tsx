import React, { useEffect, useState } from 'react';
import { ImgObj } from '@/interface/imagesApi';
import { delSingle, getPhotos, delMany } from '@/api/images';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

const TestPage = () => {
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<ImgObj[]>([]);
  const handleDel = () => {
    // delSingle('123.png');
    delMany(['123.png']);
  };
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
      <button onClick={handleDel}>del</button>
      {photos.map((photo) => {
        return (
          <img key={photo._id} src={photo.url + photo.filename} alt="photo" />
        );
      })}
    </div>
  );
};
export default TestPage;
