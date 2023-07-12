import React, { useEffect, useState } from 'react';
import moment from 'moment';

// antd
import { Modal, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

// css
import style from './index.module.scss';
import './index.scss';

// redux
import { useAppDispatch } from '@/redux';
import { setChosen } from '@/redux/slice/universal';

// interface
import { ImgObj } from '@/interface/imagesApi';

// api
import { getPhotos } from '@/api/images';

// img
import img from '@/assets/images/timeline.png';

// provider
import { useGlobalMessage } from '@/components/ContextProvider/MessageProvider';

// comp
import TopDisplay from '@/components/TopDisplay';
import LoadingComp from '@/components/LoadingComp';

// 生成带年份分类的时间轴对象
const generateTimeLine = (
  timeline: ImgObj[],
  handlePreview: (src: string) => void
) => {
  // timeLine[] 已经按时间新到旧排序
  if (timeline && timeline.length) {
    const list = [];
    timeline.map((item, index) => {
      if (index < timeline.length - 1) {
        const year1 = moment(item.photoTime).format('YYYY');
        const year2 = moment(timeline[index + 1].photoTime).format('YYYY');
        if (year1 !== year2) {
          list.push({
            dot: (
              <div style={{ marginTop: '15px', marginLeft: '4px' }}>
                <ClockCircleOutlined style={{ fontSize: '14px' }} />
              </div>
            ),
            children: <div className={style.year}>{year2}</div>,
          });
        }
      }
      list.push({
        label: moment(item.photoTime).format('M/DD'),
        dot: <div className={style.dot}></div>,
        children: (
          <div
            id={item._id}
            className={style.itemWrapper}
            // click
            onClick={() => {
              handlePreview(item.url + item.filename);
            }}
          >
            <img
              src={item.url + item.filename}
              alt="photo"
              style={{ display: 'block' }}
            />
          </div>
        ),
        color: 'gray',
      });
    });
    list.unshift({
      dot: (
        <div style={{ marginTop: '15px', marginLeft: '4px' }}>
          <ClockCircleOutlined style={{ fontSize: '14px' }} />
        </div>
      ),
      children: (
        <div className={style.year}>
          {moment(timeline[0].photoTime).format('YYYY')}
        </div>
      ),
    });
    return list;
  }
  return [];
};
const TimeLine = () => {
  const dispatch = useAppDispatch();
  const message = useGlobalMessage();
  const [photos, setPhotos] = useState<ImgObj[]>([]);
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
        limit: 10,
        fields: '',
        sort: '-photoTime',
      },
      async (res) => {
        if (!res.data.images.length) {
          message.error('没有更多照片了！');
          return new Promise(() => {
            // pass
          });
        }
        await message.loadingAsync('加载中...', '加载成功！');
        setPhotos([...photos, ...res.data.images]);
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
    }, 1000);
    dispatch(setChosen(1));
  }, []);

  useEffect(() => {
    getPhotos(
      {
        page: 1,
        limit: 10,
        fields: '',
        sort: '-photoTime',
      },
      (res) => {
        setPhotos(res.data.images);
      },
      (content) => {
        message.error(content);
      }
    );
  }, []);

  return (
    <div className={`${style.wrapper} clearfix`}>
      <TopDisplay img={img}></TopDisplay>
      <div className={style.content}>
        <LoadingComp loading={loading}></LoadingComp>
        <div className={loading ? 'loading-active' : 'loading-not-active'}>
          {photos.length ? (
            <Timeline
              mode="alternate"
              items={generateTimeLine(photos, handlePreview)}
            />
          ) : (
            <div className={style.noTimeLine}>当前没有时间轴~</div>
          )}
          <div className={style.load} onClick={handleClick}>
            <span className="iconfont">&#xe7ef;</span>&nbsp;
            <span>加载更多</span>
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

export default TimeLine;
