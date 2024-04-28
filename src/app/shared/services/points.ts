import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class GEOservices {
    DTC_SearchGeo = [];

    dataPoints = [
        {
            key: 'vi',
            description: 'Tiếng việt',
            datas: [
                {
                    title: 'Việt nam',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'HAN',
                            cityName: 'Hà Nội',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'SGN',
                            cityName: 'Hồ Chí Minh',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'DAD',
                            cityName: 'Đà Nẵng',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'DIN',
                            cityName: 'Điện Biên Phủ',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'HPH',
                            cityName: 'Hải Phòng',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'THD',
                            cityName: 'Thanh Hóa',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VII',
                            cityName: 'Vinh',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VDH',
                            cityName: 'Quảng Bình',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VCL',
                            cityName: 'Quảng Nam',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'HUI',
                            cityName: 'Huế',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'PXU',
                            cityName: 'PleiKu',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'TBB',
                            cityName: 'Phú Yên',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'BMV',
                            cityName: 'Ban Mê Thuột',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'CXR',
                            cityName: 'Nha Trang',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'UIH',
                            cityName: 'Qui Nhơn',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'DLI',
                            cityName: 'Đà Lạt',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VCA',
                            cityName: 'Cần Thơ',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VKG',
                            cityName: 'Kiên Giang',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'CAH',
                            cityName: 'Cà Mau',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'PQC',
                            cityName: 'Phú Quốc',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VCS',
                            cityName: 'Côn Đảo',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VDO',
                            cityName: 'Vân Đồn',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        }
                    ]
                },
                {
                    title: 'Châu Á',
                    subData: [
                        {
                            title: 'Đông dương',
                            dataGeoCode: [
                                {
                                    code: 'PNH',
                                    cityName: 'Phnôm Pênh',
                                    countryName: 'Campuchia',
                                    countryCode: 'KH'
                                },
                                {
                                    code: 'REP',
                                    cityName: 'Siem Reap',
                                    countryName: 'Campuchia',
                                    countryCode: 'KH'
                                },
                                {
                                    code: 'VTE',
                                    cityName: 'Viên Chăn',
                                    countryName: 'Lào',
                                    countryCode: 'LA'
                                },
                                {
                                    code: 'LPQ',
                                    cityName: 'Luông pra băng',
                                    countryName: 'Lào',
                                    countryCode: 'LA'
                                }
                            ]
                        },
                        {
                            title: 'Đông Nam Á',
                            dataGeoCode: [
                                {
                                    code: 'JKT',
                                    cityName: 'Jakarta',
                                    countryName: 'Indonesia',
                                    countryCode: 'ID'
                                },
                                {
                                    code: 'BKK',
                                    cityName: 'Băng Cốc',
                                    countryName: 'Thái Lan',
                                    countryCode: 'TH'
                                },
                                {
                                    code: 'DPS',
                                    cityName: 'Bali Denpasar',
                                    countryName: 'Indonesia',
                                    countryCode: 'ID'
                                },
                                {
                                    code: 'KUL',
                                    cityName: 'Kuala Lumpur',
                                    countryName: 'Malaysia',
                                    countryCode: 'MY'
                                },
                                {
                                    code: 'MNL',
                                    cityName: 'Manila',
                                    countryName: 'Philippines',
                                    countryCode: 'PH'
                                },
                                {
                                    code: 'SIN',
                                    cityName: 'Singapore',
                                    countryName: 'Singapore',
                                    countryCode: 'SG'
                                },
                                {
                                    code: 'RGN',
                                    cityName: 'Yangon',
                                    countryName: 'Myanmar',
                                    countryCode: 'MM'
                                }
                            ]
                        },
                        {
                            title: 'Đông Bắc Á',
                            dataGeoCode: [
                                {
                                    code: 'BJS',
                                    cityName: 'Bắc Kinh',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'PEK',
                                    cityName: 'Bắc Kinh',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'PVG',
                                    cityName: 'Thượng Hải',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'SHA',
                                    cityName: 'Thượng Hải',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'CAN',
                                    cityName: 'Quảng Châu',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'TPE',
                                    cityName: 'Đài Bắc',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'RMQ',
                                    cityName: 'Đài Trung',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'KHH',
                                    cityName: 'Cao Hùng',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'TNN',
                                    cityName: 'Đài Nam',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'HKG',
                                    cityName: 'Hồng Kông',
                                    countryName: 'Hồng Kông',
                                    countryCode: 'HK'
                                },
                                {
                                    code: 'NRT',
                                    cityName: 'Tokyo',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'HND',
                                    cityName: 'Tokyo',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'NGO',
                                    cityName: 'Nagoya',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'FUK',
                                    cityName: 'Fukuoka',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'OSA',
                                    cityName: 'Osaka',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'KIX',
                                    cityName: 'Osaka',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'ICN',
                                    cityName: 'Seoul',
                                    countryName: 'Hàn quốc',
                                    countryCode: 'KR'
                                },
                                {
                                    code: 'SEL',
                                    cityName: 'Seoul',
                                    countryName: 'Hàn quốc',
                                    countryCode: 'KR'
                                },
                                {
                                    code: 'PUS',
                                    cityName: 'Pusan',
                                    countryName: 'Hàn quốc',
                                    countryCode: 'KR'
                                }
                            ]
                        },
                        {
                            title: 'Tây Á',
                            dataGeoCode: [
                                {
                                    code: 'BOM',
                                    cityName: 'Mumbai',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'DEL',
                                    cityName: 'Đê-li',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'KTM',
                                    cityName: 'Kathmandu',
                                    countryName: 'Nepal',
                                    countryCode: 'NP'
                                },
                                {
                                    code: 'DAC',
                                    cityName: 'Dhaka',
                                    countryName: 'Băng la đét',
                                    countryCode: 'BD'
                                },
                                {
                                    code: 'CMB',
                                    cityName: 'Colombo',
                                    countryName: 'Sri Lanka',
                                    countryCode: 'LK'
                                },
                                {
                                    code: 'CCU',
                                    cityName: 'Kolkata',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'IST',
                                    cityName: 'Istanbul',
                                    countryName: 'Thổ nhĩ kỳ',
                                    countryCode: 'TR'
                                },
                                {
                                    code: 'DXB',
                                    cityName: 'Dubai',
                                    countryName: 'Ả rập thống nhất',
                                    countryCode: 'AE'
                                }
                            ]
                        },
                    ],
                    dataGeoCode: [
                    ]
                },
                {
                    title: 'Châu Âu',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'CDG',
                            cityName: 'Paris',
                            countryName: 'Pháp',
                            countryCode: 'FR',
                            fontWeight: false,
                        },
                        {
                            code: 'LON',
                            cityName: 'Luân Đôn',
                            countryName: 'Anh quốc',
                            countryCode: 'GB',
                            fontWeight: false,
                        },
                        {
                            code: 'MAN',
                            cityName: 'Manchester',
                            countryName: 'Anh quốc',
                            countryCode: 'GB',
                            fontWeight: false,
                        },
                        {
                            code: 'TXL',
                            cityName: 'Berlin',
                            countryName: 'Đức',
                            countryCode: 'DE',
                            fontWeight: false,
                        },
                        {
                            code: 'FRA',
                            cityName: 'Frankfurt',
                            countryName: 'Đức',
                            countryCode: 'DE',
                            fontWeight: false,
                        },
                        {
                            code: 'AMS',
                            cityName: 'Amsterdam',
                            countryName: 'Hà Lan',
                            countryCode: 'NL',
                            fontWeight: false,
                        },
                        {
                            code: 'MAD',
                            cityName: 'Madrid',
                            countryName: 'Tây Ban Nha',
                            countryCode: 'ES',
                            fontWeight: false,
                        },
                        {
                            code: 'MOW',
                            cityName: 'Mát-xờ-cơ-va',
                            countryName: 'Nga',
                            countryCode: 'RU',
                            fontWeight: false,
                        },
                        {
                            code: 'GVA',
                            cityName: 'Geneva',
                            countryName: 'Thụy Sỹ',
                            countryCode: 'CH',
                            fontWeight: false,
                        },
                        {
                            code: 'PRG',
                            cityName: 'Praha',
                            countryName: 'Cộng hòa Séc',
                            countryCode: 'RU',
                            fontWeight: false,
                        },
                        {
                            code: 'ROM',
                            cityName: 'Rome',
                            countryName: 'Ý',
                            countryCode: 'IT',
                            fontWeight: false,
                        },
                        {
                            code: 'VIE',
                            cityName: 'Viên',
                            countryName: 'Áo',
                            countryCode: 'AT',
                            fontWeight: false,
                        },
                        {
                            code: 'CPH',
                            cityName: 'Cô-pen-ha-gen',
                            countryName: 'Đan mạch',
                            countryCode: 'DK',
                            fontWeight: false,
                        },
                    ]
                },
                {
                    title: 'Hoa kỳ - Canada',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'NYC',
                            cityName: 'New York',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'JFK',
                            cityName: 'New York',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'WAS',
                            cityName: 'Washington',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'LAX',
                            cityName: 'Los Angeles',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'SFO',
                            cityName: 'San Francisco',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'LAX',
                            cityName: 'Los Angeles',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'ALT',
                            cityName: 'Atlanta',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'BOS',
                            cityName: 'Boston',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'CHI',
                            cityName: 'Chicago',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'DFW',
                            cityName: 'Dallas',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'DEN',
                            cityName: 'Denver',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'HNL',
                            cityName: 'Honolulu',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'MIA',
                            cityName: 'Miami',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'MSP',
                            cityName: 'Minneapolis',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'PHL',
                            cityName: 'Philadelphia',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'PDX',
                            cityName: 'Portland (Oregon)',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'SEA',
                            cityName: 'Seattle',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'STL',
                            cityName: 'St Louis',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'YVR',
                            cityName: 'Vancouver',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YYZ',
                            cityName: 'Toronto',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YOW',
                            cityName: 'Ottawa',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YMQ',
                            cityName: 'Montreal',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                    ]
                },
                {
                    title: 'Châu Úc - Châu Phi',
                    subData: [
                        {
                            title: 'Châu Úc',
                            dataGeoCode: [
                                {
                                    code: 'MEL',
                                    cityName: 'Men-bơn',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'SYD',
                                    cityName: 'Sydney',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'ADL',
                                    cityName: 'Adelaide',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'BNE',
                                    cityName: 'Brisbane',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'Auckland',
                                    cityName: 'Brisbane',
                                    countryName: 'Niu di lân',
                                    countryCode: 'NZ'
                                },
                                {
                                    code: 'WLG',
                                    cityName: 'Wellington',
                                    countryName: 'Niu di lân',
                                    countryCode: 'NZ'
                                },
                            ]
                        },
                        {
                            title: 'Châu Phi',
                            dataGeoCode: [
                                {
                                    code: 'NBO',
                                    cityName: 'Nairobi',
                                    countryName: 'Kenya',
                                    countryCode: 'KE'
                                },
                                {
                                    code: 'MPM',
                                    cityName: 'Maputo',
                                    countryName: 'Mozambique',
                                    countryCode: 'MZ'
                                },
                                {
                                    code: 'LAD',
                                    cityName: 'Luanda',
                                    countryName: 'Ăng gô la',
                                    countryCode: 'AO'
                                },
                                {
                                    code: 'JNB',
                                    cityName: 'Johannesburg',
                                    countryName: 'Nam Phi',
                                    countryCode: 'ZA'
                                },
                                {
                                    code: 'CPT',
                                    cityName: 'Cape Town',
                                    countryName: 'Nam Phi',
                                    countryCode: 'ZA'
                                },
                                {
                                    code: 'DAR',
                                    cityName: 'Dar Es Salaam',
                                    countryName: 'Tanzania',
                                    countryCode: 'TZ'
                                },
                            ]
                        },
                    ],
                    dataGeoCode: []
                }
            ]
        },
        {
            key: 'en',
            description: 'Tiếng anh',
            datas: [
                {
                    title: 'Việt nam',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'HAN',
                            cityName: 'Hà Nội',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'SGN',
                            cityName: 'Hồ Chí Minh',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'DAD',
                            cityName: 'Đà Nẵng',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'DIN',
                            cityName: 'Điện Biên Phủ',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'HPH',
                            cityName: 'Hải Phòng',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'THD',
                            cityName: 'Thanh Hóa',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VII',
                            cityName: 'Vinh',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VDH',
                            cityName: 'Quảng Bình',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VCL',
                            cityName: 'Quảng Nam',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'HUI',
                            cityName: 'Huế',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'PXU',
                            cityName: 'PleiKu',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'TBB',
                            cityName: 'Phú Yên',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'BMV',
                            cityName: 'Ban Mê Thuột',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'CXR',
                            cityName: 'Nha Trang',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'UIH',
                            cityName: 'Qui Nhơn',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'DLI',
                            cityName: 'Đà Lạt',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VCA',
                            cityName: 'Cần Thơ',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VKG',
                            cityName: 'Kiên Giang',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'CAH',
                            cityName: 'Cà Mau',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'PQC',
                            cityName: 'Phú Quốc',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VCS',
                            cityName: 'Côn Đảo',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        }
                    ]
                },
                {
                    title: 'Châu Á',
                    subData: [
                        {
                            title: 'Đông dương',
                            dataGeoCode: [
                                {
                                    code: 'PNH',
                                    cityName: 'Phnôm Pênh',
                                    countryName: 'Campuchia',
                                    countryCode: 'KH'
                                },
                                {
                                    code: 'REP',
                                    cityName: 'Siem Reap',
                                    countryName: 'Campuchia',
                                    countryCode: 'KH'
                                },
                                {
                                    code: 'VTE',
                                    cityName: 'Viên Chăn',
                                    countryName: 'Lào',
                                    countryCode: 'LA'
                                },
                                {
                                    code: 'LPQ',
                                    cityName: 'Luông pra băng',
                                    countryName: 'Lào',
                                    countryCode: 'LA'
                                }
                            ]
                        },
                        {
                            title: 'Đông Nam Á',
                            dataGeoCode: [
                                {
                                    code: 'JKT',
                                    cityName: 'Jakarta',
                                    countryName: 'Indonesia',
                                    countryCode: 'ID'
                                },
                                {
                                    code: 'BKK',
                                    cityName: 'Băng Cốc',
                                    countryName: 'Thái Lan',
                                    countryCode: 'TH'
                                },
                                {
                                    code: 'DPS',
                                    cityName: 'Bali Denpasar',
                                    countryName: 'Indonesia',
                                    countryCode: 'ID'
                                },
                                {
                                    code: 'KUL',
                                    cityName: 'Kuala Lumpur',
                                    countryName: 'Malaysia',
                                    countryCode: 'MY'
                                },
                                {
                                    code: 'MNL',
                                    cityName: 'Manila',
                                    countryName: 'Philippines',
                                    countryCode: 'PH'
                                },
                                {
                                    code: 'SIN',
                                    cityName: 'Singapore',
                                    countryName: 'Singapore',
                                    countryCode: 'SG'
                                },
                                {
                                    code: 'RGN',
                                    cityName: 'Yangon',
                                    countryName: 'Myanmar',
                                    countryCode: 'MM'
                                }
                            ]
                        },
                        {
                            title: 'Đông Bắc Á',
                            dataGeoCode: [
                                {
                                    code: 'BJS',
                                    cityName: 'Bắc Kinh',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'PVG',
                                    cityName: 'Thượng Hải',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'CAN',
                                    cityName: 'Quảng Châu',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'HKG',
                                    cityName: 'Hồng Kông',
                                    countryName: 'Hồng Kông',
                                    countryCode: 'HK'
                                },
                                {
                                    code: 'NRT',
                                    cityName: 'Tokyo',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'HND',
                                    cityName: 'Tokyo',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'NGO',
                                    cityName: 'Nagoya',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'FUK',
                                    cityName: 'Fukuoka',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'OSA',
                                    cityName: 'Osaka',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'ICN',
                                    cityName: 'Seoul',
                                    countryName: 'Hàn quốc',
                                    countryCode: 'KR'
                                },
                                {
                                    code: 'PUS',
                                    cityName: 'Pusan',
                                    countryName: 'Hàn quốc',
                                    countryCode: 'KR'
                                }
                            ]
                        },
                        {
                            title: 'Tây Á',
                            dataGeoCode: [
                                {
                                    code: 'BOM',
                                    cityName: 'Mumbai',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'DEL',
                                    cityName: 'Đê-li',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'KTM',
                                    cityName: 'Kathmandu',
                                    countryName: 'Nepal',
                                    countryCode: 'NP'
                                },
                                {
                                    code: 'DAC',
                                    cityName: 'Dhaka',
                                    countryName: 'Băng la đét',
                                    countryCode: 'BD'
                                },
                                {
                                    code: 'CMB',
                                    cityName: 'Colombo',
                                    countryName: 'Sri Lanka',
                                    countryCode: 'LK'
                                },
                                {
                                    code: 'CCU',
                                    cityName: 'Kolkata',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'IST',
                                    cityName: 'Istanbul',
                                    countryName: 'Thổ nhĩ kỳ',
                                    countryCode: 'TR'
                                },
                                {
                                    code: 'DXB',
                                    cityName: 'Dubai',
                                    countryName: 'Ả rập thống nhất',
                                    countryCode: 'AE'
                                }
                            ]
                        },
                    ],
                    dataGeoCode: [
                    ]
                },
                {
                    title: 'Châu Âu',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'CDG',
                            cityName: 'Paris',
                            countryName: 'Pháp',
                            countryCode: 'FR',
                            fontWeight: false,
                        },
                        {
                            code: 'LON',
                            cityName: 'Luân Đôn',
                            countryName: 'Anh quốc',
                            countryCode: 'GB',
                            fontWeight: false,
                        },
                        {
                            code: 'MAN',
                            cityName: 'Manchester',
                            countryName: 'Anh quốc',
                            countryCode: 'GB',
                            fontWeight: false,
                        },
                        {
                            code: 'TXL',
                            cityName: 'Berlin',
                            countryName: 'Đức',
                            countryCode: 'DE',
                            fontWeight: false,
                        },
                        {
                            code: 'FRA',
                            cityName: 'Frankfurt',
                            countryName: 'Đức',
                            countryCode: 'DE',
                            fontWeight: false,
                        },
                        {
                            code: 'AMS',
                            cityName: 'Amsterdam',
                            countryName: 'Hà Lan',
                            countryCode: 'NL',
                            fontWeight: false,
                        },
                        {
                            code: 'MAD',
                            cityName: 'Madrid',
                            countryName: 'Tây Ban Nha',
                            countryCode: 'ES',
                            fontWeight: false,
                        },
                        {
                            code: 'MOW',
                            cityName: 'Mát-xờ-cơ-va',
                            countryName: 'Nga',
                            countryCode: 'RU',
                            fontWeight: false,
                        },
                        {
                            code: 'GVA',
                            cityName: 'Geneva',
                            countryName: 'Thụy Sỹ',
                            countryCode: 'CH',
                            fontWeight: false,
                        },
                        {
                            code: 'PRG',
                            cityName: 'Praha',
                            countryName: 'Cộng hòa Séc',
                            countryCode: 'RU',
                            fontWeight: false,
                        },
                        {
                            code: 'ROM',
                            cityName: 'Rome',
                            countryName: 'Ý',
                            countryCode: 'IT',
                            fontWeight: false,
                        },
                        {
                            code: 'VIE',
                            cityName: 'Viên',
                            countryName: 'Áo',
                            countryCode: 'AT',
                            fontWeight: false,
                        },
                        {
                            code: 'CPH',
                            cityName: 'Cô-pen-ha-gen',
                            countryName: 'Đan mạch',
                            countryCode: 'DK',
                            fontWeight: false,
                        },
                    ]
                },
                {
                    title: 'Hoa kỳ - Canada',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'NYC',
                            cityName: 'New York',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'JFK',
                            cityName: 'New York',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'WAS',
                            cityName: 'Washington',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'LAX',
                            cityName: 'Los Angeles',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'SFO',
                            cityName: 'San Francisco',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'LAX',
                            cityName: 'Los Angeles',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'ALT',
                            cityName: 'Atlanta',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'BOS',
                            cityName: 'Boston',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'CHI',
                            cityName: 'Chicago',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'DFW',
                            cityName: 'Dallas',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'DEN',
                            cityName: 'Denver',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'HNL',
                            cityName: 'Honolulu',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'MIA',
                            cityName: 'Miami',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'MSP',
                            cityName: 'Minneapolis',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'PHL',
                            cityName: 'Philadelphia',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'PDX',
                            cityName: 'Portland (Oregon)',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'SEA',
                            cityName: 'Seattle',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'STL',
                            cityName: 'St Louis',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'YVR',
                            cityName: 'Vancouver',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YYZ',
                            cityName: 'Toronto',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YOW',
                            cityName: 'Ottawa',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YMQ',
                            cityName: 'Montreal',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                    ]
                },
                {
                    title: 'Châu Úc - Châu Phi',
                    subData: [
                        {
                            title: 'Châu Úc',
                            dataGeoCode: [
                                {
                                    code: 'MEL',
                                    cityName: 'Men-bơn',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'SYD',
                                    cityName: 'Sydney',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'ADL',
                                    cityName: 'Adelaide',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'BNE',
                                    cityName: 'Brisbane',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'Auckland',
                                    cityName: 'Brisbane',
                                    countryName: 'Niu di lân',
                                    countryCode: 'NZ'
                                },
                                {
                                    code: 'WLG',
                                    cityName: 'Wellington',
                                    countryName: 'Niu di lân',
                                    countryCode: 'NZ'
                                },
                            ]
                        },
                        {
                            title: 'Châu Phi',
                            dataGeoCode: [
                                {
                                    code: 'NBO',
                                    cityName: 'Nairobi',
                                    countryName: 'Kenya',
                                    countryCode: 'KE'
                                },
                                {
                                    code: 'MPM',
                                    cityName: 'Maputo',
                                    countryName: 'Mozambique',
                                    countryCode: 'MZ'
                                },
                                {
                                    code: 'LAD',
                                    cityName: 'Luanda',
                                    countryName: 'Ăng gô la',
                                    countryCode: 'AO'
                                },
                                {
                                    code: 'JNB',
                                    cityName: 'Johannesburg',
                                    countryName: 'Nam Phi',
                                    countryCode: 'ZA'
                                },
                                {
                                    code: 'CPT',
                                    cityName: 'Cape Town',
                                    countryName: 'Nam Phi',
                                    countryCode: 'ZA'
                                },
                                {
                                    code: 'DAR',
                                    cityName: 'Dar Es Salaam',
                                    countryName: 'Tanzania',
                                    countryCode: 'TZ'
                                },
                            ]
                        },
                    ],
                    dataGeoCode: []
                }
            ]
        },
        {
            key: 'fr',
            description: 'Tiếng pháp',
            datas: [
                {
                    title: 'Việt nam',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'HAN',
                            cityName: 'Hà Nội',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'SGN',
                            cityName: 'Hồ Chí Minh',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'DAD',
                            cityName: 'Đà Nẵng',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: true,
                        },
                        {
                            code: 'DIN',
                            cityName: 'Điện Biên Phủ',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'HPH',
                            cityName: 'Hải Phòng',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'THD',
                            cityName: 'Thanh Hóa',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VII',
                            cityName: 'Vinh',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VDH',
                            cityName: 'Quảng Bình',
                            countryName: 'Việt Nam',
                            countryCode: 'VN',
                            fontWeight: false,
                        },
                        {
                            code: 'VCL',
                            cityName: 'Quảng Nam',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'HUI',
                            cityName: 'Huế',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'PXU',
                            cityName: 'PleiKu',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'TBB',
                            cityName: 'Phú Yên',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'BMV',
                            cityName: 'Ban Mê Thuột',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'CXR',
                            cityName: 'Nha Trang',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'UIH',
                            cityName: 'Qui Nhơn',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'DLI',
                            cityName: 'Đà Lạt',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VCA',
                            cityName: 'Cần Thơ',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VKG',
                            cityName: 'Kiên Giang',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'CAH',
                            cityName: 'Cà Mau',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'PQC',
                            cityName: 'Phú Quốc',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        },
                        {
                            code: 'VCS',
                            cityName: 'Côn Đảo',
                            countryName: 'Việt Nam',
                            countryCode: 'VN'
                        }
                    ]
                },
                {
                    title: 'Châu Á',
                    subData: [
                        {
                            title: 'Đông dương',
                            dataGeoCode: [
                                {
                                    code: 'PNH',
                                    cityName: 'Phnôm Pênh',
                                    countryName: 'Campuchia',
                                    countryCode: 'KH'
                                },
                                {
                                    code: 'REP',
                                    cityName: 'Siem Reap',
                                    countryName: 'Campuchia',
                                    countryCode: 'KH'
                                },
                                {
                                    code: 'VTE',
                                    cityName: 'Viên Chăn',
                                    countryName: 'Lào',
                                    countryCode: 'LA'
                                },
                                {
                                    code: 'LPQ',
                                    cityName: 'Luông pra băng',
                                    countryName: 'Lào',
                                    countryCode: 'LA'
                                }
                            ]
                        },
                        {
                            title: 'Đông Nam Á',
                            dataGeoCode: [
                                {
                                    code: 'JKT',
                                    cityName: 'Jakarta',
                                    countryName: 'Indonesia',
                                    countryCode: 'ID'
                                },
                                {
                                    code: 'BKK',
                                    cityName: 'Băng Cốc',
                                    countryName: 'Thái Lan',
                                    countryCode: 'TH'
                                },
                                {
                                    code: 'DPS',
                                    cityName: 'Bali Denpasar',
                                    countryName: 'Indonesia',
                                    countryCode: 'ID'
                                },
                                {
                                    code: 'KUL',
                                    cityName: 'Kuala Lumpur',
                                    countryName: 'Malaysia',
                                    countryCode: 'MY'
                                },
                                {
                                    code: 'MNL',
                                    cityName: 'Manila',
                                    countryName: 'Philippines',
                                    countryCode: 'PH'
                                },
                                {
                                    code: 'SIN',
                                    cityName: 'Singapore',
                                    countryName: 'Singapore',
                                    countryCode: 'SG'
                                },
                                {
                                    code: 'RGN',
                                    cityName: 'Yangon',
                                    countryName: 'Myanmar',
                                    countryCode: 'MM'
                                }
                            ]
                        },
                        {
                            title: 'Đông Bắc Á',
                            dataGeoCode: [
                                {
                                    code: 'BJS',
                                    cityName: 'Bắc Kinh',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'PVG',
                                    cityName: 'Thượng Hải',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'CAN',
                                    cityName: 'Quảng Châu',
                                    countryName: 'Trung Quốc',
                                    countryCode: 'CN'
                                },
                                {
                                    code: 'HKG',
                                    cityName: 'Hồng Kông',
                                    countryName: 'Hồng Kông',
                                    countryCode: 'HK'
                                },
                                {
                                    code: 'NRT',
                                    cityName: 'Tokyo',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'HND',
                                    cityName: 'Tokyo',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'NGO',
                                    cityName: 'Nagoya',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'FUK',
                                    cityName: 'Fukuoka',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'OSA',
                                    cityName: 'Osaka',
                                    countryName: 'Nhật Bản',
                                    countryCode: 'JP'
                                },
                                {
                                    code: 'ICN',
                                    cityName: 'Seoul',
                                    countryName: 'Hàn quốc',
                                    countryCode: 'KR'
                                },
                                {
                                    code: 'PUS',
                                    cityName: 'Pusan',
                                    countryName: 'Hàn quốc',
                                    countryCode: 'KR'
                                }
                            ]
                        },
                        {
                            title: 'Tây Á',
                            dataGeoCode: [
                                {
                                    code: 'BOM',
                                    cityName: 'Mumbai',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'DEL',
                                    cityName: 'Đê-li',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'KTM',
                                    cityName: 'Kathmandu',
                                    countryName: 'Nepal',
                                    countryCode: 'NP'
                                },
                                {
                                    code: 'DAC',
                                    cityName: 'Dhaka',
                                    countryName: 'Băng la đét',
                                    countryCode: 'BD'
                                },
                                {
                                    code: 'CMB',
                                    cityName: 'Colombo',
                                    countryName: 'Sri Lanka',
                                    countryCode: 'LK'
                                },
                                {
                                    code: 'CCU',
                                    cityName: 'Kolkata',
                                    countryName: 'Ấn độ',
                                    countryCode: 'IN'
                                },
                                {
                                    code: 'IST',
                                    cityName: 'Istanbul',
                                    countryName: 'Thổ nhĩ kỳ',
                                    countryCode: 'TR'
                                },
                                {
                                    code: 'DXB',
                                    cityName: 'Dubai',
                                    countryName: 'Ả rập thống nhất',
                                    countryCode: 'AE'
                                }
                            ]
                        },
                    ],
                    dataGeoCode: [
                    ]
                },
                {
                    title: 'Châu Âu',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'CDG',
                            cityName: 'Paris',
                            countryName: 'Pháp',
                            countryCode: 'FR',
                            fontWeight: false,
                        },
                        {
                            code: 'LON',
                            cityName: 'Luân Đôn',
                            countryName: 'Anh quốc',
                            countryCode: 'GB',
                            fontWeight: false,
                        },
                        {
                            code: 'MAN',
                            cityName: 'Manchester',
                            countryName: 'Anh quốc',
                            countryCode: 'GB',
                            fontWeight: false,
                        },
                        {
                            code: 'TXL',
                            cityName: 'Berlin',
                            countryName: 'Đức',
                            countryCode: 'DE',
                            fontWeight: false,
                        },
                        {
                            code: 'FRA',
                            cityName: 'Frankfurt',
                            countryName: 'Đức',
                            countryCode: 'DE',
                            fontWeight: false,
                        },
                        {
                            code: 'AMS',
                            cityName: 'Amsterdam',
                            countryName: 'Hà Lan',
                            countryCode: 'NL',
                            fontWeight: false,
                        },
                        {
                            code: 'MAD',
                            cityName: 'Madrid',
                            countryName: 'Tây Ban Nha',
                            countryCode: 'ES',
                            fontWeight: false,
                        },
                        {
                            code: 'MOW',
                            cityName: 'Mát-xờ-cơ-va',
                            countryName: 'Nga',
                            countryCode: 'RU',
                            fontWeight: false,
                        },
                        {
                            code: 'GVA',
                            cityName: 'Geneva',
                            countryName: 'Thụy Sỹ',
                            countryCode: 'CH',
                            fontWeight: false,
                        },
                        {
                            code: 'PRG',
                            cityName: 'Praha',
                            countryName: 'Cộng hòa Séc',
                            countryCode: 'RU',
                            fontWeight: false,
                        },
                        {
                            code: 'ROM',
                            cityName: 'Rome',
                            countryName: 'Ý',
                            countryCode: 'IT',
                            fontWeight: false,
                        },
                        {
                            code: 'VIE',
                            cityName: 'Viên',
                            countryName: 'Áo',
                            countryCode: 'AT',
                            fontWeight: false,
                        },
                        {
                            code: 'CPH',
                            cityName: 'Cô-pen-ha-gen',
                            countryName: 'Đan mạch',
                            countryCode: 'DK',
                            fontWeight: false,
                        },
                    ]
                },
                {
                    title: 'Hoa kỳ - Canada',
                    subData: [],
                    dataGeoCode: [
                        {
                            code: 'NYC',
                            cityName: 'New York',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'JFK',
                            cityName: 'New York',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'WAS',
                            cityName: 'Washington',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'LAX',
                            cityName: 'Los Angeles',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'SFO',
                            cityName: 'San Francisco',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'LAX',
                            cityName: 'Los Angeles',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'ALT',
                            cityName: 'Atlanta',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'BOS',
                            cityName: 'Boston',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'CHI',
                            cityName: 'Chicago',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'DFW',
                            cityName: 'Dallas',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'DEN',
                            cityName: 'Denver',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'HNL',
                            cityName: 'Honolulu',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'MIA',
                            cityName: 'Miami',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'MSP',
                            cityName: 'Minneapolis',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'PHL',
                            cityName: 'Philadelphia',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'PDX',
                            cityName: 'Portland (Oregon)',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'SEA',
                            cityName: 'Seattle',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'STL',
                            cityName: 'St Louis',
                            countryName: 'Hoa kỳ',
                            countryCode: 'US',
                            fontWeight: false,
                        },
                        {
                            code: 'YVR',
                            cityName: 'Vancouver',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YYZ',
                            cityName: 'Toronto',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YOW',
                            cityName: 'Ottawa',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                        {
                            code: 'YMQ',
                            cityName: 'Montreal',
                            countryName: 'Canada',
                            countryCode: 'CA',
                            fontWeight: false,
                        },
                    ]
                },
                {
                    title: 'Châu Úc - Châu Phi',
                    subData: [
                        {
                            title: 'Châu Úc',
                            dataGeoCode: [
                                {
                                    code: 'MEL',
                                    cityName: 'Men-bơn',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'SYD',
                                    cityName: 'Sydney',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'ADL',
                                    cityName: 'Adelaide',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'BNE',
                                    cityName: 'Brisbane',
                                    countryName: 'Úc',
                                    countryCode: 'AU'
                                },
                                {
                                    code: 'Auckland',
                                    cityName: 'Brisbane',
                                    countryName: 'Niu di lân',
                                    countryCode: 'NZ'
                                },
                                {
                                    code: 'WLG',
                                    cityName: 'Wellington',
                                    countryName: 'Niu di lân',
                                    countryCode: 'NZ'
                                },
                            ]
                        },
                        {
                            title: 'Châu Phi',
                            dataGeoCode: [
                                {
                                    code: 'NBO',
                                    cityName: 'Nairobi',
                                    countryName: 'Kenya',
                                    countryCode: 'KE'
                                },
                                {
                                    code: 'MPM',
                                    cityName: 'Maputo',
                                    countryName: 'Mozambique',
                                    countryCode: 'MZ'
                                },
                                {
                                    code: 'LAD',
                                    cityName: 'Luanda',
                                    countryName: 'Ăng gô la',
                                    countryCode: 'AO'
                                },
                                {
                                    code: 'JNB',
                                    cityName: 'Johannesburg',
                                    countryName: 'Nam Phi',
                                    countryCode: 'ZA'
                                },
                                {
                                    code: 'CPT',
                                    cityName: 'Cape Town',
                                    countryName: 'Nam Phi',
                                    countryCode: 'ZA'
                                },
                                {
                                    code: 'DAR',
                                    cityName: 'Dar Es Salaam',
                                    countryName: 'Tanzania',
                                    countryCode: 'TZ'
                                },
                            ]
                        },
                    ],
                    dataGeoCode: []
                }
            ]
        },
    ]

    constructor() {
        try {
            var rs = this.dataPoints.filter(function (item) {
                return item.key == 'vi';
            });

            // DTC_SearchGeo = rs[0].datas[0].dataGeoCode;
            rs[0].datas.forEach(e => {
                this.DTC_SearchGeo = this.DTC_SearchGeo.concat(e.dataGeoCode);
            })
            console.log('concat---', this.DTC_SearchGeo);
            
        } catch (error) {
            // DTC_SearchGeo = DTC.Geocode[0].datas;
        }
    }
    /**
     * return name of point, exp: HN -> Ha Noi
     * @param id is code of point
     */
    getPointName(id) {
        let point = this.DTC_SearchGeo.filter(function (item) {
            return item.code == id;
        })
        console.log('POINT: ', point);
        return point[0].cityName;
    }

    // /**
    //  * return name of point, exp: HN -> Ha Noi
    //  * @param id is code of point
    //  */
    // getPointName(id) {
    //     let point = this.DTC_SearchGeo.filter(function (item) {
    //         return item.code == id;
    //     })
    //     console.log('POINT: ', point);
    //     return point[0].cityName;
    // }

} 