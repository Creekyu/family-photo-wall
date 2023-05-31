import React, { useEffect, useState } from 'react';

// antd
import { Col, Row } from 'antd';

// css
import style from './index.module.scss';

// api
import { getPhotos } from '@/api/images';

// interface
import { cls, clsValue, ImgObj } from '@/interface/imagesApi';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

// img
import img from '@/assets/images/rand-8.png';

interface PhotoBoxProps {
  classification: cls;
  title: clsValue;
  rand: number;
}

const PhotoBox: React.FC<PhotoBoxProps> = ({ classification, title, rand }) => {
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<React.ReactNode[]>([]);
  const [randPhoto, setRandPhoto] = useState(img);
  const onPreview = (url: string) => {
    const src = url as string;
    const image = new Image();
    image.src = src;
    // 居中
    image.style.position = 'absolute';
    image.style.left = '0';
    image.style.right = '0';
    image.style.bottom = '0';
    image.style.top = '0';
    image.style.margin = 'auto';
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    // 获取一张随机图片
    import(`@/assets/images/rand-${rand}.png`).then((response) => {
      setRandPhoto(response.default);
    });
  }, []);

  useEffect(() => {
    getPhotos(
      {
        page: 1,
        limit: 10,
        fields: '',
        sort: '_id',
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
          })
        );
      },
      (content) => {
        message.error(content);
      }
    );
  }, []);
  return (
    <div className={`${style.photosBox} clearfix`}>
      <div className={style.title}>{title}</div>
      <div className={`${style.photos} clearfix`}>
        {photos.length ? (
          <>
            <Row>
              <Col span={12}>
                <Row style={{ height: '50%' }}>
                  <Col span={12}>{photos[0]}</Col>
                  <Col span={12}>{photos[1]}</Col>
                </Row>
                <Row style={{ height: '50%' }}>
                  <Col span={12}>{photos[2]}</Col>
                  <Col span={12}>{photos[3]}</Col>
                </Row>
              </Col>
              <Col span={12}>{photos[4]}</Col>
            </Row>
            <Row>
              <Col span={6}>
                <Row style={{ height: '50%' }}>{photos[5]}</Row>
                <Row style={{ height: '50%' }}>{photos[6]}</Row>
              </Col>
              <Col span={12}>{photos[7]}</Col>
              <Col span={6}>
                <Row style={{ height: '50%' }}>{photos[8]}</Row>
                <Row style={{ height: '50%' }}>{photos[9]}</Row>
              </Col>
            </Row>
          </>
        ) : (
          <div
            className={style.noPhoto}
            style={{ backgroundImage: `url(${randPhoto})` }}
            onClick={() => {
              onPreview(randPhoto);
            }}
          >
            <div>该板块暂时未上传图片~</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoBox;
