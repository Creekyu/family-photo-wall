import React from 'react';

// antd
import { Col, Row } from 'antd';

interface ArrangedBoxProps {
  photos: React.ReactNode[];
}

const ArrangedBox: React.FC<ArrangedBoxProps> = ({ photos }) => {
  const colStyle = { height: '100%', maxHeight: '200px', minHeight: 157 };
  const rowStyle = { height: '50%', minHeight: 157 };
  return (
    <>
      {photos.length >= 0 ? (
        <Row>
          <Col span={12}>
            <Row style={{ height: '50%' }}>
              {photos[0] ? (
                <Col span={12} style={colStyle}>
                  {photos[0]}
                </Col>
              ) : undefined}
              {photos[1] ? (
                <Col span={12} style={colStyle}>
                  {photos[1]}
                </Col>
              ) : undefined}
            </Row>
            <Row style={{ height: '50%' }}>
              {photos[2] ? (
                <Col span={12} style={colStyle}>
                  {photos[2]}
                </Col>
              ) : undefined}
              {photos[3] ? (
                <Col span={12} style={colStyle}>
                  {photos[3]}
                </Col>
              ) : undefined}
            </Row>
          </Col>
          {photos[4] ? (
            <Col span={12} style={{ minHeight: 157 * 2 }}>
              {photos[4]}
            </Col>
          ) : undefined}
        </Row>
      ) : undefined}
      {photos.length > 5 ? (
        <Row>
          <Col span={6}>
            {photos[5] ? <Row style={rowStyle}>{photos[5]}</Row> : undefined}
            {photos[6] ? <Row style={rowStyle}>{photos[6]}</Row> : undefined}
          </Col>
          {photos[7] ? (
            <Col span={12} style={{ minHeight: 157 * 2 }}>
              {photos[7]}
            </Col>
          ) : undefined}
          <Col span={6}>
            {photos[8] ? <Row style={rowStyle}>{photos[8]}</Row> : undefined}
            {photos[9] ? <Row style={rowStyle}>{photos[9]}</Row> : undefined}
          </Col>
        </Row>
      ) : undefined}

      {photos.length > 10 ? (
        <Row>
          {photos[10] ? (
            <Col span={12} style={{ minHeight: 157 * 2 }}>
              {photos[10]}
            </Col>
          ) : undefined}
          <Col span={12}>
            <Row style={rowStyle}>
              {photos[11] ? (
                <Col span={12} style={colStyle}>
                  {photos[11]}
                </Col>
              ) : undefined}
              {photos[12] ? (
                <Col span={12} style={colStyle}>
                  {photos[12]}
                </Col>
              ) : undefined}
            </Row>
            <Row style={rowStyle}>
              {photos[13] ? (
                <Col span={12} style={colStyle}>
                  {photos[13]}
                </Col>
              ) : undefined}
              {photos[14] ? (
                <Col span={12} style={colStyle}>
                  {photos[14]}
                </Col>
              ) : undefined}
            </Row>
          </Col>
        </Row>
      ) : undefined}
    </>
  );
};

export default ArrangedBox;
