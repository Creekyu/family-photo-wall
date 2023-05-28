import React, { useEffect } from 'react';

// redux
import { setSelectedKey } from '@/redux/slice/backstage';
import { useAppDispatch } from '@/redux';

const EditPhoto = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSelectedKey('edit'));
  }, []);
  return <div>DelPhoto</div>;
};

export default EditPhoto;
