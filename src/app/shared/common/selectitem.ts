import { DateService } from "../services/date.util.service";

export interface SelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}

export interface NXOption {
    id: string;
    // maopt: string = '';
    name: string;
}

export class ThongKeRow {
    mabenhnhan: string;
    patient: string;
    namsinh: number;
    khu: string;
    thuoc: string;
    sang = 0;
    chieu = 0;
    toi = 0;
    songay = 1;
}
export class NhiXuanOptions {
    public static thuocTypes = [
        { label: '---', value: 0, code: 'all'},
        { label: 'Thuốc thường', value: 1, code: 'tt'},
        { label: 'Tiêu hao', value: 2, code: 'th'},
        { label: 'xQuang', value: 3, code: 'xq'},
        { label: 'Điện Tim', value: 4, code: 'dt'},
        { label: 'Xét Nghiệm', value: 5, code: 'xn'},
        { label: 'Phòng dịch', value: 6, code: 'pd'},
        { label: 'Hướng Thần', value: 7, code: 'ht'},
        { label: 'Gây Nghiện', value: 8, code: 'gn' },
        { label: 'Dịch Vụ', value: 9, code: 'dv'},
        { label: 'Loại khác', value: 10, code: 'khac'}, // using for thongke PHIEUKHAC
    ];

    public static loaiCLSs: any[] = [
        { id: '0', name: ' Chọn' },
        { id: 'XQ', name: 'XQuang' }, // just xuat to CC
        { id: 'SA', name: 'Siêu Âm' },
        { id: 'XN', name: 'Xét Nghiệm' },
        { id: 'TH', name: 'Tiêu Hao' },
        { id: 'UNKNOW', name: 'Khác' },
    ];
    public static khoNhaps: NXOption[] = [
        { id: '0', name: ' Tất cả' },
        { id: 'KTN', name: 'Kho Tự nguyện' }, // just xuat to CC
        { id: 'DVY', name: 'Kho Dịch Vụ y tế' },
        { id: 'KNS', name: 'Kho Ngân sách' },
    ];

    public static khuXuatTN: NXOption[] = [// kho
        { id: 'CCYT', name: 'CCYT' },
    ]
    public static khuXuatNS: NXOption[] = [// kho
        { id: '0', name: ' Tất cả' },
        { id: 'CC1', name: 'Khu Cắt cơn 1' },
        { id: 'CC2', name: 'Khu Cắt cơn 2' },
        { id: 'SK1', name: 'Khu PHSK 1' },
        { id: 'SK2', name: 'Khu PHSK 2' },
        { id: 'SK3', name: 'Khu PHSK 3' },
    ];
    public static khuXuatDVYT: NXOption[] = [// kho
        { id: '0', name: ' Tất cả' },
        { id: 'DVYT', name: 'Khu DVYT' },
        { id: 'TN', name: 'Khu Tự Nguyện' },
        { id: 'DAN', name: 'Dân' },
        { id: 'NO', name: 'Nợ' },

    ]
    // public static khukbs: NXOption[] = [];
    public static khukbs: NXOption[] = [
        { id: '0', name: ' Tất cả' },
        { id: 'CC1', name: 'Khu Cắt cơn 1' },
        { id: 'CC2', name: 'Khu Cắt cơn 2' },
        { id: 'SK1', name: 'Khu PHSK 1' },
        { id: 'SK2', name: 'Khu PHSK 2' },
        { id: 'SK3', name: 'Khu PHSK 3' },
        { id: 'DVYT', name: 'Khu DVYT' },
        { id: 'TN', name: 'Khu Tự Nguyện' },
        { id: 'DAN', name: 'Dân' },
        { id: 'NO', name: 'Nợ' },
        { id: 'CCYT', name: 'CCYT' }
    ];

    public static doctors: NXOption[] = [
        { id: '0', name: 'Chọn bác sĩ---' },
        { id: 'bstuyen', name: 'Hán Thị Hồng Tuyến' }, //abc123
        { id: 'bshnghia', name: 'Trần Hữu Nghĩa' }, //abc1231
        { id: 'bsxuyen', name: 'Lê Thị Xuyến' }, //abc1232
        { id: 'bstung', name: 'Nguyễn Trần Thanh Tùng' }, //abc1233
        { id: 'bsnnghia', name: 'Nguyễn Ngọc Nghĩa' }, //abc1234
        // { id: '6', name: 'Khác' }
    ];

    public static cachDungs = [
        { id: 'Chọn---', name: 'Chọn---' },
        { id: 1, name: 'Tiêm TM', type: 1 },
        { id: 2, name: 'Tiêm bắp', type: 1 },
        { id: 3, name: 'Bôi', type: 4 },
        { id: 4, name: 'Uống', type: 1 },
        { id: 5, name: 'Truyền TM', type: 2 },
        { id: 7, name: 'Thụt trực tràng', type: 3 },
        { id: 8, name: 'Hô hấp', type: 3 },
        { id: 9, name: 'Nhỏ mắt', type: 4 },
        { id: 10, name: 'Nhỏ mũi', type: 4 },
        { id: 11, name: 'Nhỏ tai', type: 4 },
        { id: 12, name: 'Xịt mũi', type: 4 },
        { id: 13, name: 'Đặt âm đạo', type: 1 },
        { id: 14, name: 'Khác', type: 3 },
      ];
    // public static cachDungs: NXOption[] = [
    //     { id: '0', name: 'Chọn cách dùng---' },
    //     { id: '1', name: 'Tiêm TM' },
    //     { id: '2', name: 'Tiêm bắp' },
    //     { id: '3', name: 'Bôi' },
    //     { id: '4', name: 'Uống' },
    //     { id: '5', name: 'Truyền TM' },
    //     { id: '6', name: 'Khác' }
    // ];

    public static donviDungs: NXOption[] = [
        { id: '1', name: 'Chọn đơn vị---' },
        { id: '2', name: 'Viên' },
        { id: '3', name: 'Lần' },
        { id: '4', name: 'Lọ' },
        { id: '5', name: 'Hộp' },
        { id: '6', name: 'Vỉ' },
        { id: '7', name: 'Tuýt' },
        { id: '8', name: 'Ống' },
        { id: '9', name: 'Chai' },
        { id: '10', name: 'Giọt' },
        { id: '11', name: 'ml' },
        { id: '12', name: 'cc' },
        { id: '13', name: 'Tube' },
        { id: '14', name: 'Cục' },
        { id: '15', name: 'Cái' },
        { id: '16', name: 'Bộ' },
        { id: '17', name: 'Tấm' },
        { id: '18', name: 'Gói' },
        { id: '19', name: 'Bình' },
    ];
    public static chandoansE: NXOption[] = [
        {
            id: "E58",
            name: "Thiếu Canxi do chế độ ăn"
        },
        {
            id: "E66",
            name: "Bệnh béo phì"
        },
        {
            id: "E86",
            name: "Sốc giảm thể tích"
        },
        {
            id: "E87.6",
            name: "Hạ Kali máu"
        },
    ]
    public static chandoans: NXOption[] = [
        {
            id: "E58",
            name: "Thiếu Canxi do chế độ ăn"
        },
        {
            id: "E66",
            name: "Bệnh béo phì"
        },
        {
            id: "E86",
            name: "Sốc giảm thể tích"
        },
        {
            id: "E87.6",
            name: "Hạ Kali máu"
        },
        {
            id: "F39",
            name: "Rối loạn khí sắc"
        },
        {
            id: "F30",
            name: "Hưng cảm"
        },
        {
            id: "F31",
            name: "Rối loạn cảm xúc lưỡng cực"
        },
        {
            id: "F11",
            name: "Rối loạn tâm thần và hành vi do sử dụng các dạng thuốc phiện"
        },
        {
            id: "F12",
            name: "Rối loạn tâm thần và hành vi do sử dụng cần sa"
        },
        {
            id: "F15.5",
            name: "Rối loạn tâm thần và hành vi do sử dụng chất kích thích khác bao gồm Cafein"
        },
        {
            id: "F16",
            name: "Rối loạn tâm thần và hành vi do sử dụng các chất gây ảo giác"
        },
        {
            id: "F16.3",
            name: "Hội chứng cai"
        },
        {
            id: "F19",
            name: "Rối loạn tâm thần và hành vi do sử dụng nhiều loại ma túy và chất tác động tâm thần khác"
        },
        {
            id: "F19.5",
            name: "Rối loạn tâm thần có ảo giác và hoang tưởng"
        },
        {
            id: "F20",
            name: "Tâm thần phân liệt"
        },
        {
            id: "F32",
            name: "Trầm cảm"
        },
        {
            id: "F40",
            name: "Rối loạn lo âu"
        },
        {
            id: "F51",
            name: "Rối loạn giấc ngủ"
        },
        {
            id: "F91",
            name: "Rối loạn hành vi"
        },
        {
            id: "G25",
            name: "Hội chứng ngoại tháp"
        },
        {
            id: "G40",
            name: "Động kinh"
        },
        {
            id: "G64",
            name: "Bệnh dây thần kinh ngoại biên"
        },
        {
            id: "G55.2",
            name: "Chèn ép rễ thần kinh và đám rối trong thoái hóa đốt sống"
        },
        {
            id: "G55.1",
            name: "Chèn ép rễ thần kinh và đám rối trong bệnh đĩa đệm đốt sống"
        },
        {
            id: "M47",
            name: "Thoái hóa đốt sống"
        },
        {
            id: "H00",
            name: "Lẹo và chắp mắt"
        },
        {
            id: "H10",
            name: "Viêm kết mạc"
        },
        {
            id: "H60",
            name: "Viêm tai ngoài"
        },
        {
            id: "H65",
            name: "Viêm tai giữa không nung mũ"
        },
        {
            id: "H66",
            name: "Viêm tai giữa nung mũ"
        },
        {
            id: "I10",
            name: "Tăng huyết áp"
        },
        {
            id: "I20",
            name: "Cơn đau thắt ngực"
        },
        {
            id: "I15",
            name: "Cao huyết áp thứ phát"
        },
        {
            id: "I21",
            name: "Nhồi máu cơ tim cấp"
        },
        {
            id: "I25.5",
            name: "Bệnh lý cơ tim do thiếu máu cục bộ"
        },
        {
            id: "I50",
            name: "Suy tim"
        },
        {
            id: "I47.2",
            name: "Rối loạn nhịp nhanh thất"
        },
        {
            id: "I80",
            name: "Viêm và tắc tĩnh mạch"
        },
        {
            id: "I83",
            name: "Dãn tĩnh mạch chi dưới"
        },
        {
            id: "I84.1",
            name: "Trĩ nội có biến chứng"
        },
        {
            id: "I81.2",
            name: "Trĩ nội không biến chứng"
        },
        {
            id: "I84.5",
            name: "Trĩ ngoại không biến chứng"
        },
        {
            id: "I95",
            name: "Huyết áp thấp"
        },
        {
            id: "I95.1",
            name: "Hạ huyết áp tư thế"
        },
        {
            id: "J00",
            name: "Viêm mũi họng cấp"
        },
        {
            id: "J31.5",
            name: "Viêm mũi họng mạn"
        },
        {
            id: "J01",
            name: "Viêm xoang cấp"
        },
        {
            id: "J32",
            name: "Viêm xoang mạn"
        },
        {
            id: "J02",
            name: "Viêm họng cấp"
        },
        {
            id: "J31.2",
            name: "Viêm họng mạn"
        },
        {
            id: "J03",
            name: "Viêm Amydan cấp"
        },
        {
            id: "J10",
            name: "Cảm cúm do Virus"
        },
        {
            id: "J04",
            name: "Viêm thanh quản, khí quản"
        },
        {
            id: "J20",
            name: "Viêm phế quản cấp"
        },
        {
            id: "J30.4",
            name: "Viêm mũi dị ứng"
        },
        {
            id: "J44",
            name: "Bệnh phổi tắc nghẽn mạn tính"
        },
        {
            id: "J45",
            name: "Hen phế quản"
        },
        {
            id: "J90",
            name: "Tràn dịch màng phổi (T)"
        },
        {
            id: "J90",
            name: "Tràn dịch màng phổi (P)"
        },
        {
            id: "J93",
            name: "Tràn khí màng phổi (T)"
        },
        {
            id: "J93",
            name: "Tràn khí màng phổi (P)"
        },
        {
            id: "K02",
            name: "Sâu răng"
        },
        {
            id: "K05",
            name: "Viêm nướu"
        },
        {
            id: "K11.2",
            name: "Viêm tuyến nước bọt"
        },
        {
            id: "K12",
            name: "Viêm loét miệng"
        },
        {
            id: "K14.0",
            name: "Viêm lưỡi"
        },
        {
            id: "K21",
            name: "Bệnh trào ngược dạ dày thực quản"
        },
        {
            id: "K29",
            name: "Viêm dạ dày, tá tràng"
        },
        {
            id: "K35",
            name: "Viêm ruột thừa"
        },
        {
            id: "K40",
            name: "Thoát vị bẹn"
        },
        {
            id: "K51",
            name: "Viêm loét đại tràng"
        },
        {
            id: "K58",
            name: "Hội chứng ruột kích thích"
        },
        {
            id: "K60.5",
            name: "Lỗ dò hậu môn trực tràng"
        },
        {
            id: "K61",
            name: "Áp xe vùng hậu môn trực tràng"
        },
        {
            id: "K80",
            name: "Sỏi mật"
        },
        {
            id: "K85",
            name: "Viêm tuỵ cấp"
        },
        {
            id: "K92.0",
            name: "Nôn ra máu"
        },
        {
            id: "K92.1",
            name: "Ỉa phân đen"
        },
        {
            id: "K92.2",
            name: "Chảy máu tiêu hóa"
        },
        {
            id: "L02",
            name: "Áp xe, nhọt"
        },
        {
            id: "L03",
            name: "Viêm mô tế bào"
        },
        {
            id: "L20",
            name: "Viêm da dị ứng"
        },
        {
            id: "L23",
            name: "Viêm da tiếp xúc"
        },
        {
            id: "L40",
            name: "Vảy nến"
        },
        {
            id: "L50",
            name: "Mề đay"
        },
        {
            id: "B18.1",
            name: "Viêm gan B mạn"
        },
        {
            id: "B18.2",
            name: "Viêm gan C mạn"
        },
        {
            id: "B20",
            name: "Nhiễm HIV"
        },
        {
            id: "B26",
            name: "Quai bị"
        },
        {
            id: "B30",
            name: "Viêm kết mạc do virus"
        },
        {
            id: "B35.0",
            name: "Nhiễm nấm da, nấm da đầu"
        },
        {
            id: "B6.0",
            name: "Bệnh lang ben"
        },
        {
            id: "B35.1",
            name: "Nấm móng"
        },
        {
            id: "B37.0",
            name: "Nhiễm nấm Candida miệng, họng"
        },
        {
            id: "B86",
            name: "Bệnh cái ghẻ"
        },
        {
            id: "B82",
            name: "Nhiễm ký sinh trùng đường ruột không xác định"
        },
        {
            id: "D17",
            name: "Bướu mỡ"
        },
        {
            id: "D18",
            name: "Bướu mạch máu"
        },
        {
            id: "D50",
            name: "Thiếu máu do thiếu sắt"
        },
        {
            id: "D51",
            name: "Thiếu máu do thiếu Vitamin B12"
        },
        {
            id: "D63.8",
            name: "Thiếu máu trong các bệnh mạn tính"
        },
        {
            id: "E06",
            name: "Viêm giáp"
        },
        {
            id: "E06",
            name: "Cường giáp (Bướu giáp lan tỏa + Nhiễm độc giáp)"
        },
        {
            id: "E10",
            name: "Đái tháo đường phụ thuộc Insulin"
        },
        {
            id: "E11",
            name: "Đái tháo đường không phụ thuộc Insulin"
        },
        {
            id: "E16.2",
            name: "Hạ đường huyết"
        },
        {
            id: "E24",
            name: "Hội chứng Cushing"
        },
        {
            id: "E43",
            name: "Suy dinh dưỡng nặng"
        },
        {
            id: "E44",
            name: "Suy dinh dưỡng nhẹ và vừa"
        },
        {
            id: "A04",
            name: "Nhiễm trùng đường ruột do vi khuẩn khác"
        },
        {
            id: "A03.9",
            name: "Nhiễm Shigella không xác định"
        },
        {
            id: "A05",
            name: "Nhiễm độc thức ăn do vi trùng khác"
        },
        {
            id: "A09",
            name: "Tiêu chảy và viêm dạ dày ruột do nhiễm trùng"
        },
        {
            id: "A07",
            name: "Bệnh đường ruột do ký sinh trùng đơn bào "
        },
        {
            id: "A08",
            name: "Nhiễm trùng đường ruột do virus"
        },
        {
            id: "A15.0",
            name: "Lao phổi AFB (+)"
        },
        {
            id: "A15.4",
            name: "Lao hạch"
        },
        {
            id: "A15.6",
            name: "Lao màng phổi"
        },
        {
            id: "A16.0",
            name: "Lao AFB âm"
        },
        {
            id: "A18.2",
            name: "Bệnh lý hạch lympho ngoại vi do lao"
        },
        {
            id: "A54",
            name: "Nhiễm lậu cầu"
        },
        {
            id: "A53.9",
            name: "Giang mai không xác định"
        },
        {
            id: "A60",
            name: "Nhiễm Herpes vùng hậu môn sinh dục"
        },
        {
            id: "A59.0",
            name: "Viêm âm đạo (khí hư)"
        },
        {
            id: "A66",
            name: "Ghẻ cóc"
        },
        {
            id: "P39.1",
            name: "Viêm kết mạc mắt"
        },
        {
            id: "P23",
            name: "Viêm phổi"
        },
        {
            id: "A75.9",
            name: "Sốt phát ban"
        },
        {
            id: "A91",
            name: "Sốt xuất huyết Dengue"
        },
        {
            id: "B01",
            name: "Thủy đậu"
        },
        {
            id: "B02",
            name: "Bệnh Zona"
        },
        {
            id: "B05",
            name: "Sởi"
        },
        {
            id: "L73.8",
            name: "Viêm nang lông"
        },
        {
            id: "L70.0",
            name: "Mụn trứng cá thông thường"
        },
        {
            id: "L81",
            name: "Rối loạn sắc tố da"
        },
        {
            id: "L82",
            name: "Dày sừng tiết bã"
        },
        {
            id: "L84",
            name: "Mắt cá và chai chân"
        },
        {
            id: "L85.1",
            name: "Bệnh dày sừng mắc phải"
        },
        {
            id: "L91.0",
            name: "Sẹo lồi"
        },
        {
            id: "L90.5",
            name: "Biến dạng do sợi"
        },
        {
            id: "L93",
            name: "Lupus ban đỏ"
        },
        {
            id: "G73.7",
            name: "Viêm cơ"
        },
        {
            id: "M06.4",
            name: "Viêm nhiều khớp"
        },
        {
            id: "M45",
            name: "Viêm cột sống dính khớp"
        },
        {
            id: "M10 ",
            name: "Bệnh Gout"
        },
        {
            id: "M13.0",
            name: "Viêm đa khớp không xác định"
        },
        {
            id: "M13.9",
            name: "Viêm khớp không xác định"
        },
        {
            id: "M16",
            name: "Thoái hóa khớp háng"
        },
        {
            id: "M17",
            name: "Thoái hóa khớp gối"
        },
        {
            id: "M18",
            name: "Thoái hóa khớp cổ, bàn, ngón tay"
        },
        {
            id: "M47",
            name: "Thoái hóa cột sống"
        },
        {
            id: "M25.4",
            name: "Tràn dịch khớp"
        },
        {
            id: "M25.5",
            name: "Đau khớp"
        },
        {
            id: "M25.7",
            name: "Gai xương"
        },
        {
            id: "M25.9",
            name: "Bệnh khớp không xác định"
        },
        {
            id: "M33.2",
            name: "Viêm đa cơ"
        },
        {
            id: "M49.0",
            name: "Lao cột sống"
        },
        {
            id: "M51.1",
            name: "Đau thần kinh hông to do bệnh đĩa đệm"
        },
        {
            id: "M53.1",
            name: "Hội chứng tay cổ (vai gáy)"
        },
        {
            id: "M54",
            name: "Đau lưng"
        },
        {
            id: "M54.2",
            name: "Đau vùng cổ gáy"
        },
        {
            id: "M54.3",
            name: "Đau dây thần kinh tọa"
        },
        {
            id: "M60",
            name: "Viêm cơ"
        },
        {
            id: "M60.0",
            name: "Viêm cơ nhiễm khuẩn"
        },
        {
            id: "M62.3",
            name: "Hội chứng bất động (liệt 2 chi dưới)"
        },
        {
            id: "M70",
            name: "Những rối loạn mô mềm liên quan đến biến động quá mức và bị đè ép"
        },
        {
            id: "M75",
            name: "Tổn thương tai (T)"
        },
        {
            id: "M75",
            name: "Tổn thương tai (P)"
        },
        {
            id: "M79.3",
            name: "Viêm mô mỡ dưới da"
        },
        {
            id: "M81.8",
            name: "Loãng xương không xác định"
        },
        {
            id: "M84",
            name: "Rối loạn về sự liên tục của xương (gãy xương)"
        },
        {
            id: "M86",
            name: "Cốt tủy viêm (viêm tủy xương)"
        },
        {
            id: "N00",
            name: "Hội chứng viêm cầu thận cấp"
        },
        {
            id: "N03",
            name: "Hội chứng viêm cầu thận mạn"
        },
        {
            id: "N04",
            name: "Hội chứng thận hư"
        },
        {
            id: "R31",
            name: "Tiểu máu không xác định"
        },
        {
            id: "N13.3",
            name: "Thận ứ nước không xác  định"
        },
        {
            id: "N13.2",
            name: "Thận ứ nước do sỏi và niệu quản gây tắc"
        },
        {
            id: "N39.0",
            name: "Viêm đường tiết niệu không xác định"
        },
        {
            id: "N17",
            name: "Suy thận cấp"
        },
        {
            id: "N18",
            name: "Suy thận mạn"
        },
        {
            id: "N20.0",
            name: "Sỏi thận (T)"
        },
        {
            id: "N20.0",
            name: "Sỏi thận (P)"
        },
        {
            id: "N20.1",
            name: "Sỏi niệu quản"
        },
        {
            id: "N20.2",
            name: "Sỏi thận + Sỏi niệu quản"
        },
        {
            id: "N21.0",
            name: "Sỏi bàng quang"
        },
        {
            id: "N23",
            name: "Cơn đau quặn thận không xác định"
        },
        {
            id: "N30",
            name: "Viêm bàng quang"
        },
        {
            id: "N41.9",
            name: "Viêm tuyến tiền liệt không xác định"
        },
        {
            id: "N45",
            name: "Viêm tinh hoàn, mào tinh hoàn"
        },
        {
            id: "N48.1",
            name: "Viêm quy đầu"
        },
        {
            id: "N49.2",
            name: "Viêm bùi"
        },
        {
            id: "N61",
            name: "Viêm vú (T)"
        },
        {
            id: "N61",
            name: "Viêm vú (P)"
        },
        {
            id: "N76",
            name: "Viêm âm đạo, âm hộ "
        },
        {
            id: "N77",
            name: "Viêm loét âm hộ, âm đạo"
        },
        {
            id: "N83.2",
            name: "U nang buồng trứng không xác định"
        },
        {
            id: "N92.1",
            name: "Rong kinh"
        },
        {
            id: "N92.6",
            name: "Kinh nguyệt không đều"
        },
        {
            id: "N94.6",
            name: "Đau bụng kinh (không xác định)"
        },
        {
            id: "000",
            name: "Thai ngoài tử cung"
        },
        {
            id: "R00.0",
            name: "Nhịp tim nhanh"
        },
        {
            id: "R00.1",
            name: "Nhịp tim chậm"
        },
        {
            id: "R04",
            name: "Chảy máu cam"
        },
        {
            id: "R04.2",
            name: "Ho ra máu"
        },
        {
            id: "R07.3",
            name: "Đau ngực không xác định"
        },
        {
            id: "R09.2",
            name: "Suy tuần hoàn, hô hấp"
        },
        {
            id: "R10.0",
            name: "Đau bụng cấp"
        },
        {
            id: "R14",
            name: "Chướng bụng"
        },
        {
            id: "R16",
            name: "Gan to, lách to không xác định"
        },
        {
            id: "R18",
            name: "Cổ trướng"
        },
        {
            id: "R20",
            name: "Rối loạn cảm giác da "
        },
        {
            id: "R40.2",
            name: "Hôn mê không xác định"
        },
        {
            id: "R44.0",
            name: "Ảo thanh"
        },
        {
            id: "R44.1",
            name: "Ảo thị"
        },
        {
            id: "R50",
            name: "Sốt không rõ nguyên nhân"
        },
        {
            id: "R51",
            name: "Đau đầu"
        },
        {
            id: "R53",
            name: "Suy nhược cơ thể"
        },
        {
            id: "F48.0",
            name: "Suy nhược thần kinh"
        },
        {
            id: "R56.8",
            name: "Cơn động kinh"
        },
        {
            id: "R57.1",
            name: "Shock do giảm thể tích"
        },
        {
            id: "R57.0",
            name: "Shock do tim"
        },
        {
            id: "R60.9",
            name: "Phù không xác định"
        },
        {
            id: "S00",
            name: "Chấn thương vùng đầu mặt"
        },
        {
            id: "S01",
            name: "Vết thương vùng đầu"
        },
        {
            id: "S05",
            name: "Tổn thương mắt và ổ mắt"
        },
        {
            id: "S116",
            name: "Tổn thương cơ và gân vùng cổ"
        },
        {
            id: "S20",
            name: "Chấn thương lồng ngực"
        },
        {
            id: "S21",
            name: "Vết thương lồng ngực"
        },
        {
            id: "S22",
            name: "Gãy xương sườn"
        },
        {
            id: "S30",
            name: "Chấn thương vùng bụng, lưng"
        },
        {
            id: "S31",
            name: "Vết thương vùng bụng, lưng"
        },
        {
            id: "S42.0",
            name: "Gãy xương đòn (T)"
        },
        {
            id: "S42.0",
            name: "Gãy xương đòn (P)"
        },
        {
            id: "S50",
            name: "Chấn thương vùng cẳng tay (T)"
        },
        {
            id: "S50",
            name: "Chấn thương vùng cẳng tay (P)"
        },
        {
            id: "S51",
            name: "Vết thương hở cẳng tay (T)"
        },
        {
            id: "S51",
            name: "Vết thương hở cẳng tay (P)"
        },
        {
            id: "S60",
            name: "Chấn thương vùng cổ bàn tay (T)"
        },
        {
            id: "S60",
            name: "Chấn thương vùng cổ bàn tay (P)"
        },
        {
            id: "S61",
            name: "Vết thương hở cổ bàn tay (T)"
        },
        {
            id: "S61",
            name: "Vết thương hở cổ bàn tay (P)"
        },
        {
            id: "S80",
            name: "Chấn thương vùng cẳng chân (T)"
        },
        {
            id: "S80",
            name: "Chấn thương vùng cẳng chân (P)"
        },
        {
            id: "S81",
            name: "Vết thương hở cẳng chân (T)"
        },
        {
            id: "S81",
            name: "Vết thương hở cẳng chân (P)"
        },
        {
            id: "S82",
            name: "Gãy xương cẳng chân (T)"
        },
        {
            id: "S82",
            name: "Gãy xương cẳng chân (P)"
        },
        {
            id: "S90",
            name: "Chấn thương vùng cổ bàn chân (T)"
        },
        {
            id: "S90",
            name: "Chấn thương vùng cổ bàn chân (P)"
        },
        {
            id: "S91",
            name: "Vết thương hở cổ bàn chân (T)"
        },
        {
            id: "S91",
            name: "Vết thương hở cổ bàn chân (P)"
        },
        {
            id: "S92",
            name: "Gãy xương bàn chân (T)"
        },
        {
            id: "S92",
            name: "Gãy xương bàn chân (P)"
        },
        {
            id: "T00",
            name: "Đa chấn thương phần mềm nhiều vùng cơ thể"
        },
        {
            id: "T01",
            name: "Đa vết thương phần mềm nhiều vùng cơ thể"
        },
        {
            id: "T18",
            name: "Dị vật đường tiêu hóa"
        },
        {
            id: "T20",
            name: "Bỏng đầu cổ"
        },
        {
            id: "T21",
            name: "Bỏng tại thân"
        },
        {
            id: "T22",
            name: "Bỏng vai chi trên"
        },
        {
            id: "T23",
            name: "Bỏng cổ tay, bàn tay"
        },
        {
            id: "T24",
            name: "Bỏng háng và chi dưới"
        },
        {
            id: "T25",
            name: "Bỏng cổ chân, bàn chân"
        },
        {
            id: "T29",
            name: "Bỏng và ăn mòn nhiều vùng cơ thể"
        },
        {
            id: "X70",
            name: "Tự hại bằng treo làm nghẹt đường thở"
        },
        {
            id: "X69",
            name: "Cố tình tự đầu độc bằng và phơi nhiễm các hóa chất và chất có\r\n hại khác không có đặc điểm"
        },
        {
            id: "X77",
            name: "Cố tình tự hại bằng vật nhọn"
        }
    ];

    public static ketquaCLSs: NXOption[] = [
        { id: '1', name: 'Chọn kết quả---' },
        { id: '2', name: 'Heroin dương tính' },
        { id: '3', name: 'ATS dương tính' },
        { id: '4', name: 'Heroin dương tính & ATS dương tính' },
        { id: '5', name: 'Cần sa' },
        { id: '6', name: 'Bình thường' },
        // { id: '6', name: 'Khác' }
    ];

    public static hoiChungOpt: NXOption[] = [
        { id: '0', name: 'Chọn hội chứng---' },
        { id: '1', name: 'Hội chứng Cai Heroin nhẹ' },
        { id: '2', name: 'Hội chứng Cai Heroin trung bình' },
        { id: '3', name: 'Hội chứng Cai Heroin nặng' },
        { id: '4', name: 'Hội chứng Cai ATS nhẹ' },
        { id: '5', name: 'Hội chứng Cai ATS trung bình' },
        { id: '6', name: 'Hội chứng Cai ATS nặng' },
        { id: '7', name: 'Hội chứng Cai Heroin và ATS nhẹ' },
        { id: '8', name: 'Hội chứng Cai Heroin và ATS trung bình' },
        { id: '9', name: 'Hội chứng Cai Heroin và ATS nặng' },
        // { id: '4', name: 'Khác' }
    ];

    public static benhChinh: NXOption[] = [
        { id: '0', name: 'Chon bệnh---' },
        { id: '1', name: 'Nghiện Heroin' },
        { id: '2', name: 'Nghiện ATS' },
        { id: '3', name: 'Không nghiện' },
        { id: '4', name: 'Nghiện Heroin và nghiện ATS' }
    ];

    public static ppDieuTri: NXOption[] = [
        { id: '0', name: 'Chọn phương pháp' },
        { id: '1', name: 'An thần kinh' },
        { id: '2', name: 'Chống loạn thần' },
        { id: '3', name: 'Chống trầm cảm' }
    ];

    public static kqDieuTri: NXOption[] = [
        { id: '0', name: 'Chọn---' },
        { id: '1', name: 'Hội chứng cai ổn' },
        { id: '2', name: 'Kém' },
        { id: '2', name: 'Bình thường' },
        { id: '2', name: 'Tốt' },
        { id: '3', name: 'Tử vong' },
        // { id: '4', name: 'Khác' },
    ];

    public static huongDieuTri: NXOption[] = [
        { id: '0', name: 'Chọn---' },
        { id: '1', name: 'Chuyển đổi SH' },
        { id: '2', name: 'Lưu bệnh' },
        { id: '3', name: 'Chuyển khu PHSK' },
        // { id: '4', name: 'Khác' },
    ];

}

export class XntReportRowModel {
    // type: number;
    thuoc: string;
    unit: string;
    tondauky: number;
    taxplus: number; // taxplus
    ttd: number;
    sln: number;
    dgn: number;
    ttn: number;
    slx: number;
    dgx: number;
    ttx: number;
    toncuoi: number;
    dgc: number;
    ttc: number;
}

export class ISummaryModel {
    type: number; // 1. Nhap, 2. Xuat, 3. Chi tiet, 4. Tong hop
    typename: string;
    tong: number;
}

export class XntSummaryModel {
    type: number; // 1. Nhap, 2. Xuat, 3. Chi tiet, 4. Tong hop
    typename: string;

    tondauky: number;
    ttd: number;

    sln: number;
    ttn: number;

    slx: number;
    ttx: number;
    
    toncuoi: number;
    ttc: number;
}

export class ExportExcelOption {
    type = 0;
    fileName: string;
    sheetName: string;
    sheetHeader: string;
    // obj: Object;
    objId: string;
    tkFrom: Date;
    tkTo: Date;
    
    constructor() {
        this.tkFrom =  DateService.newUTCDate(new Date());
        this.tkTo = DateService.newUTCDate(new Date());
    }
}

export class ExportXntExcelOption {
    type = 0;
    fileName: string;
    objId: string;
    tkFrom: Date;
    tkTo: Date;
    allThuoc: boolean;
    tondau: boolean = true;
    nhap: boolean = true;
    xuat: boolean = true;
    toncuoi: boolean = true;
    
    constructor() {
        this.tkFrom =  new Date();//DateService.newUTCDate(new Date());
        this.tkTo = new Date();//DateService.newUTCDate(new Date());
        this.allThuoc = false;
        this.tondau = true;
        this.nhap = true;
        this.xuat = true;
        this.toncuoi = true;
    }
}

export class ExportBNDungThuocExcelOption {
    type = 4;
    fileName: string;
    objId: string;
    tkFrom: Date;
    tkTo: Date;
    
    constructor() {
        this.tkFrom =  new Date();//DateService.newUTCDate(new Date());
        this.tkTo = new Date();//DateService.newUTCDate(new Date());
    }
}
