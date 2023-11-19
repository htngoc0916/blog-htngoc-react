import { v4 as uuidv4 } from 'uuid'

export function projecData() {
  return [
    {
      id: uuidv4(),
      title: 'Schedule Management',
      descript: `Công việc đầu tiên của mình là quản lý hệ thống schedule về lịch trình nhập xuất cảng của các tàu container.`,
      languages: 'Python, Selemiun, MariaDB',
      image: '/img/avatar_animal_1.jpg',
      author: 'htngoc',
      workTime: '2019~'
    },
    {
      id: uuidv4(),
      title: 'Air Booking Management',
      descript: `Đây là dự án mình tham gia sau khi kết thúc thời gian thực tập. Xây dựng hệ thống quản lý Booking của hãng hàng không Anam(아남항공) ở Kimpho(김포).`,
      languages: 'C#, MsSql',
      image: '/img/avatar_animal_2.jpg',
      author: 'htngoc',
      workTime: '2020~'
    },
    {
      id: uuidv4(),
      title: 'Container Management',
      descript: `Đây là dự án mất nhiều công sức nhất của mình. Dự án chuyên về quản lý bãi container của công ty SamIk là một trong 4 công ty vận tải lớn của Hàn Quốc`,
      languages: 'C#, DevExpress, ODBC',
      image: '/img/avatar_animal_3.jpg',
      author: 'htngoc',
      workTime: '2022~'
    },
    {
      id: uuidv4(),
      title: 'Java Web',
      descript: `Hiện tại mình đang làm với ngôn ngữ Java, thực hiện một số dự án của công ty và cá nhân của mình`,
      languages: 'Java, Springboot, Reactjs, MySql',
      image: '/img/avatar_animal_4.jpg',
      author: 'htngoc',
      workTime: '2023~'
    }
  ]
}
