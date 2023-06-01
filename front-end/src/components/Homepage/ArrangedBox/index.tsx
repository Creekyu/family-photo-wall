import React from 'react';
import { Col, Row } from 'antd';

interface ArrangedBoxProps {
  photos: React.ReactNode[];
}

const ArrangedBox: React.FC<ArrangedBoxProps> = ({ photos }) => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Row style={{ height: '50%' }}>
            <Col span={12}>{photos[0] ? photos[0] : undefined}</Col>
            <Col span={12}>{photos[1] ? photos[1] : undefined}</Col>
          </Row>
          <Row style={{ height: '50%' }}>
            <Col span={12}>{photos[2] ? photos[2] : undefined}</Col>
            <Col span={12}>{photos[3] ? photos[3] : undefined}</Col>
          </Row>
        </Col>
        <Col span={12}>{photos[4] ? photos[4] : undefined}</Col>
      </Row>
      <Row>
        <Col span={6}>
          <Row style={{ height: '50%' }}>
            {photos[5] ? photos[5] : undefined}
          </Row>
          <Row style={{ height: '50%' }}>
            {photos[6] ? photos[6] : undefined}
          </Row>
        </Col>
        <Col span={12}>{photos[7] ? photos[7] : undefined}</Col>
        <Col span={6}>
          <Row style={{ height: '50%' }}>
            {photos[8] ? photos[8] : undefined}
          </Row>
          <Row style={{ height: '50%' }}>
            {photos[9] ? photos[9] : undefined}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>{photos[10] ? photos[10] : undefined}</Col>
        <Col span={12}>
          <Row style={{ height: '50%' }}>
            <Col span={12}>{photos[11] ? photos[11] : undefined}</Col>
            <Col span={12}>{photos[12] ? photos[12] : undefined}</Col>
          </Row>
          <Row style={{ height: '50%' }}>
            <Col span={12}>{photos[13] ? photos[13] : undefined}</Col>
            <Col span={12}>{photos[14] ? photos[14] : undefined}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ArrangedBox;
