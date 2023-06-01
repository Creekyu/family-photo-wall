import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

// css
import style from './index.module.scss';

// comp
import TopDisplay from '@/components/TopDisplay';
import ArrangedBox from '@/components/ArrangedBox';

// img
import img from '@/assets/images/photowall.png';
import img1 from '@/assets/images/noPhoto.png';

// interface
import { ClsEnum, cls, ImgObj } from '@/interface/imagesApi';

// api
import { getPhotos } from '@/api/images';

// util
import { onPreview } from '@/utils';

// provider
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

// redux
import { useAppDispatch } from '@/redux';
import { setChosen } from '@/redux/slice/universal';

const PhotoWall = () => {
  const {
    state: { classification },
  } = useLocation();
  const dispatch = useAppDispatch();
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<React.ReactNode[][]>([[]]);
  const [page, setPage] = useState(1);

  const handleClick = () => {
    getPhotos(
      {
        page: page + 1,
        limit: 15,
        fields: '',
        sort: '-_id',
        options: `classification=${classification}`,
      },
      async (res) => {
        if (!res.data.images.length) {
          message.error('没有更多照片了！');
          return new Promise(() => {
            // pass
          });
        }
        await message.loadingAsync('加载中...', '加载成功！');
        setPhotos([
          ...photos,
          res.data.images.map((photo: ImgObj) => {
            return (
              <div
                key={photo._id}
                className={style.link}
                onClick={() => {
                  onPreview(photo.url + photo.filename);
                }}
              >
                <img
                  src={photo.url + photo.filename}
                  alt="photo"
                  className={style.img}
                />
              </div>
            );
          }),
        ]);
        setPage(page + 1);
      },
      (content) => {
        message.error(content);
      }
    );
  };

  useEffect(() => {
    switch (classification) {
      case 'memory':
        dispatch(setChosen(2));
        break;
      case 'bigEvent':
        dispatch(setChosen(3));
        break;
      case 'now':
        dispatch(setChosen(4));
        break;
      case 'others':
        dispatch(setChosen(5));
        break;
    }
  }, []);

  useEffect(() => {
    getPhotos(
      {
        page: 1,
        limit: 15,
        fields: '',
        sort: '-_id',
        options: `classification=${classification}`,
      },
      (res) => {
        setPage(1);
        setPhotos([
          res.data.images.map((photo: ImgObj) => {
            return (
              <div
                key={photo._id}
                className={style.link}
                onClick={() => {
                  onPreview(photo.url + photo.filename);
                }}
              >
                <img
                  src={photo.url + photo.filename}
                  alt="photo"
                  className={style.img}
                />
              </div>
            );
          }),
        ]);
      },
      (content) => {
        message.error(content);
      }
    );
  }, [classification]);
  return (
    <div className={style.wrapper}>
      <TopDisplay img={img}></TopDisplay>
      <div className={style.content}>
        <div className={style.title}>{ClsEnum[classification as cls]}</div>
        <div className={style.photos}>
          {photos[0].length
            ? photos.map((photoList, index) => {
                return (
                  <ArrangedBox photos={photoList} key={index}></ArrangedBox>
                );
              })
            : undefined}
          {photos[0].length ? undefined : (
            <div
              className={style.noPhoto}
              style={{ backgroundImage: `url(${img1})` }}
            >
              <div>当前分类暂时没有照片~</div>
            </div>
          )}
        </div>
        <div className={style.load} onClick={handleClick}>
          加载更多
        </div>
      </div>
    </div>
  );
};

export default PhotoWall;
