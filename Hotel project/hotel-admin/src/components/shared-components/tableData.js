import TextCollapsed from './TextCollapsed'
import ImageCarousel from './ImageCarousel';
import { NavLink} from 'react-router-dom';
import { Space } from 'antd'

import FormButton from './FormButton';

export const columns = [
   {
      title: 'Index',
      dataIndex: 'key',
      key: 'index',
      render: (item, obj, index) => (index + 1)
   },
   {
      title: 'Room Name',
      dataIndex: 'nameRoom',
      key: 'name',
   },
   {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
   },
   {
      title: 'Rooms Available',
      dataIndex: 'quantity',
      key: 'quantity',
   },
   {
      title: 'Maximum Guests',
      dataIndex: 'maxPerson',
      key: 'maxPerson',
   },
   {
      title: 'Bed',
      dataIndex: 'bed',
      key: 'bed',
   },
   {
      title: 'Bathrooms',
      dataIndex: 'bathrooms',
      key: 'bathrooms',
   },
   {
      title: 'Convenient',
      dataIndex: 'convenient',
      key: 'convenient',
      render: ( text => <TextCollapsed text={text} />)
   },
   {
      title: 'Introduction',
      dataIndex: 'introduction',
      key: 'introduction',
      render: ( text => <TextCollapsed text={text} />)
   },
   {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageLinks =>  <ImageCarousel imageLinks={imageLinks}/>)
   },
   {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
         <Space size="middle">
            <FormButton record={record}/>
         </Space>
      ),
   },
];

