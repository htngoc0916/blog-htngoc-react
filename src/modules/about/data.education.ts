import { v4 as uuidv4 } from 'uuid'

export function educationData() {
  return [
    {
      id: uuidv4(),
      university: 'Trường ĐH Việt Hàn',
      speciality: 'Khoa Học Máy Tính',
      area: 'Đà Nẵng',
      year: '2012-2015',
      descript: `Mình đã từng học vào trường Trường ĐH Việt - Hàn, khoa Khoa
            học máy tính chuyên ngành mạng máy tính. Nhận Học Bổng du
            học chương trình liên kết 3+2 của Trường Việt-Hàn và Trường
            ĐH Tongmyong Hàn Quốc.`
    },
    {
      id: uuidv4(),
      university: 'Trường ĐH Tongmyong',
      speciality: 'Công nghệ thông tin và Truyền thông',
      area: 'Busan',
      year: '2016 - 2020',
      descript: `Năm 2016 mình đã nhập học vào trường ĐH Tongmyong Hàn Quốc
            khoa Công nghệ thông tin và Truyền thông. Đến năm 2018, sau
            khi tốt nghiệp hệ Đại Học thì mình quyết định học tiếp lên
            cao học. Trong quá trình học cao học thì mình cũng vửa học
            trên trường và vừa đi thực tập tại công ty mà giáo sư đã
            giới thiệu.`
    },
    {
      id: uuidv4(),
      university: 'T2L Co., Ltd',
      speciality: 'Developer',
      area: 'Busan',
      year: '2020 - 2022',
      descript: `Sau thời gian thực tập, mình đã chính thức vào làm tại công
            ty chuyên về phát triển hệ thống phần mềm logistics. Ở đây
            mình cũng đã tích luỹ được nhiều kiến thức để nâng cao kỹ
            năng cho bản thân, cũng như khả năng giao tiếp, và môi
            trường làm việc chuyên nghiệp.`
    },
    {
      id: uuidv4(),
      university: 'Seoul System',
      speciality: 'Java Backend',
      area: 'Seoul',
      year: '2023 ~',
      descript: `Sau khoảng thời gian học tập và làm việc ở Busan, vì muốn
            thử sức ở một lĩnh vực mới và muốn hít thở bầu không khí ở
            thủ đô, nên mình đã quyết định lên Seoul. Và hiện tại mình
            đang làm Dev Backend Java.`
    }
  ]
}
