export class CategoryModel {
    id: number;
    name: string;
    description: string;
    imagepath: string;
    icon: string;
}
// CREATE TABLE `category` (
//     `id` int NOT NULL AUTO_INCREMENT,
//     `name` varchar(200),
//     `description` text(5000),
//     `imagepath` text(1000),
//     `icon` varchar(50),
//      PRIMARY KEY (`id`)
//   )
// ENGINE=InnoDB DEFAULT CHARSET=utf8;