import React, { useState, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import './FruitQuiz.css';

const Video = React.forwardRef(({ videoSrc }, ref) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({ showModal, isModalOpen })
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal destroyOnClose={true} maskClosable={false} width={800} open={isModalOpen} onCancel={handleCancel} footer={null} closeIcon={<CloseCircleOutlined />}>
        <div className='video'>
          <video controls >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </Modal>
    </>
  );
})


export default Video