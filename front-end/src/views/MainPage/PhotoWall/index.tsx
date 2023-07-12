import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

// css
import style from './index.module.scss';

// comp
import TopDisplay from '@/components/TopDisplay';
import ArrangedBox from '@/components/ArrangedBox';
import LoadingComp from '@/components/LoadingComp';

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
import { Modal } from 'antd';

const PhotoWall = () => {
  const {
    state: { classification },
  } = useLocation();
  const dispatch = useAppDispatch();
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<React.ReactNode[][]>([[]]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = (src: string) => {
    setPreviewOpen(true);
    setPreviewImage(src);
  };

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
                style={{
                  backgroundImage: `url(${
                    photo.url +
                    photo.filename +
                    '?x-oss-process=image/format,webp/quality,10'
                  })`,
                }}
              ></div>
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
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
                  handlePreview(photo.url + photo.filename);
                }}
                style={{
                  backgroundImage: `url(${
                    photo.url +
                    photo.filename +
                    '?x-oss-process=image/format,webp/quality,10'
                  })`,
                }}
              ></div>
            );
          }),
        ]);
      },
      (content) => {
        message.error(content);
      }
    );
  }, [classification]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [classification]);
  return (
    <div className={style.wrapper}>
      <TopDisplay img={img}></TopDisplay>
      <div className={style.content}>
        <LoadingComp loading={loading} changeImg></LoadingComp>
        <div className={loading ? 'loading-active' : 'loading-not-active'}>
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
                onClick={() => {
                  handlePreview(img1);
                }}
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
      <Modal
        destroyOnClose
        getContainer={false}
        open={previewOpen}
        title="Preview"
        footer={null}
        onCancel={() => {
          setPreviewOpen(false);
        }}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default PhotoWall;
