import React, { useEffect, useState } from 'react';

// css
import style from './index.module.scss';

// api
import { getPhotos } from '@/api/images';

// interface
import { cls, clsValue, ImgObj } from '@/interface/imagesApi';
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';
import { Col, Row } from 'antd';

interface PhotoBoxProps {
  classification: cls;
  title: clsValue;
}

const PhotoBox: React.FC<PhotoBoxProps> = ({ classification, title }) => {
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<React.ReactNode[]>([]);
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
              <a
                href={photo.url + photo.filename}
                target="_blank"
                rel="noreferrer"
                key={photo._id}
                className={style.link}
              >
                <img
                  src={photo.url + photo.filename}
                  alt="photo"
                  className={style.img}
                />
              </a>
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
      </div>
    </div>
  );
};

export default PhotoBox;
