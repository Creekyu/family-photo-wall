import React, { useEffect, useState } from 'react';

// antd
import { Modal } from 'antd';

// css
import style from './index.module.scss';

// api
import { getPhotos } from '@/api/images';

// interface
import { cls, clsValue, ImgObj } from '@/interface/imagesApi';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

// img
import img from '@/assets/images/rand-8.png';

// comp
import ArrangedBox from '@/components/ArrangedBox';

// util
import { onPreview } from '@/utils';

interface PhotoBoxProps {
  classification: cls;
  title: clsValue;
  rand: number;
  onClick: () => void;
}

const PhotoBox: React.FC<PhotoBoxProps> = ({
  classification,
  title,
  rand,
  onClick,
}) => {
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<React.ReactNode[]>([]);
  const [randPhoto, setRandPhoto] = useState(img);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = (src: string) => {
    setPreviewOpen(true);
    setPreviewImage(src);
  };

  useEffect(() => {
    // 获取一张随机图片
    import(`@/assets/images/rand-${rand || 8}.png`).then((response) => {
      setRandPhoto(response.default);
    });
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
        setPhotos(
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
          })
        );
      },
      (content) => {
        message.error(content);
      }
    );
  }, []);
  return (
    <>
      <div className={`${style.photosBox} clearfix`}>
        <div className={style.title}>
          <div>{title}</div>
          <div onClick={onClick}>查看更多{'>>'}</div>
        </div>
        <div className={`${style.photos} clearfix`}>
          {photos.length ? (
            <>
              <ArrangedBox photos={photos}></ArrangedBox>
            </>
          ) : (
            <div
              className={style.noPhoto}
              style={{ backgroundImage: `url(${randPhoto})` }}
              onClick={() => {
                handlePreview(randPhoto);
              }}
            >
              <div>该板块暂时未上传图片~</div>
            </div>
          )}
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
    </>
  );
};

export default PhotoBox;
