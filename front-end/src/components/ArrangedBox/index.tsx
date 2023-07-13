import React from 'react';

// antd
import { Col, Row } from 'antd';

// css
import style from './index.module.scss';

// provider
import { useViewport } from '@/components/ContextProvider/ViewportProvider';

// global
import { BREAK_POINT } from '@/global';

interface ArrangedBoxProps {
  photos: React.ReactNode[];
}

const ArrangedBox: React.FC<ArrangedBoxProps> = ({ photos }) => {
  const { width } = useViewport();
  const colStyle = width > BREAK_POINT ? { height: 157 } : { height: 46.63 };
  const col2Style =
    width > BREAK_POINT ? { height: 157 * 2 } : { height: 46.63 * 2 };
  const rowStyle = width > BREAK_POINT ? { height: 157 } : { height: 46.63 };
  return (
    <div className={style.wrapper}>
      {photos.length >= 0 ? (
        <Row>
          <Col span={12}>
            <Row style={rowStyle}>
              {photos[0] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[0]}
                </Col>
              ) : undefined}
              {photos[1] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[1]}
                </Col>
              ) : undefined}
            </Row>
            <Row style={rowStyle}>
              {photos[2] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[2]}
                </Col>
              ) : undefined}
              {photos[3] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[3]}
                </Col>
              ) : undefined}
            </Row>
          </Col>
          {photos[4] ? (
            <Col span={12} style={col2Style} className={style.hover}>
              {photos[4]}
            </Col>
          ) : undefined}
        </Row>
      ) : undefined}
      {photos.length > 5 ? (
        <Row>
          <Col span={6}>
            {photos[5] ? (
              <Row style={rowStyle} className={style.hover}>
                {photos[5]}
              </Row>
            ) : undefined}
            {photos[6] ? (
              <Row style={rowStyle} className={style.hover}>
                {photos[6]}
              </Row>
            ) : undefined}
          </Col>
          {photos[7] ? (
            <Col span={12} style={col2Style} className={style.hover}>
              {photos[7]}
            </Col>
          ) : undefined}
          <Col span={6}>
            {photos[8] ? (
              <Row style={rowStyle} className={style.hover}>
                {photos[8]}
              </Row>
            ) : undefined}
            {photos[9] ? (
              <Row style={rowStyle} className={style.hover}>
                {photos[9]}
              </Row>
            ) : undefined}
          </Col>
        </Row>
      ) : undefined}

      {photos.length > 10 ? (
        <Row>
          {photos[10] ? (
            <Col span={12} style={col2Style} className={style.hover}>
              {photos[10]}
            </Col>
          ) : undefined}
          <Col span={12}>
            <Row style={rowStyle}>
              {photos[11] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[11]}
                </Col>
              ) : undefined}
              {photos[12] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[12]}
                </Col>
              ) : undefined}
            </Row>
            <Row style={rowStyle}>
              {photos[13] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[13]}
                </Col>
              ) : undefined}
              {photos[14] ? (
                <Col span={12} style={colStyle} className={style.hover}>
                  {photos[14]}
                </Col>
              ) : undefined}
            </Row>
          </Col>
        </Row>
      ) : undefined}
    </div>
  );
};

export default ArrangedBox;
