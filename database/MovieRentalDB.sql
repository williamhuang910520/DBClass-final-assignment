-- --------------------------------------------------------
-- 主機:                           127.0.0.1
-- 伺服器版本:                        11.2.2-MariaDB-1:11.2.2+maria~ubu2204 - mariadb.org binary distribution
-- 伺服器作業系統:                      debian-linux-gnu
-- HeidiSQL 版本:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 傾印 MovieRentalDB 的資料庫結構
CREATE DATABASE IF NOT EXISTS `MovieRentalDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `MovieRentalDB`;

-- 傾印  資料表 MovieRentalDB.Customers 結構
CREATE TABLE IF NOT EXISTS `Customers` (
  `CustomerID` char(50) NOT NULL DEFAULT uuid(),
  `LoginName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `PasswordHash` varchar(200) NOT NULL,
  `PasswordSalt` varchar(50) NOT NULL DEFAULT '',
  `NickName` varchar(30) NOT NULL,
  `MembershipLevel` varchar(20) DEFAULT 'copper',
  `About` varchar(255) DEFAULT '',
  `Avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CustomerID`) USING BTREE,
  UNIQUE KEY `UNIQUE KEY` (`LoginName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在傾印表格  MovieRentalDB.Customers 的資料：~4 rows (近似值)
INSERT IGNORE INTO `Customers` (`CustomerID`, `LoginName`, `PasswordHash`, `PasswordSalt`, `NickName`, `MembershipLevel`, `About`, `Avatar`) VALUES
	('0014f871-af10-11ee-a4cd-0242ac120002', 'B10917013', '$2b$12$ZoIxGeb3Cc21cQgAz211wu6MpOg6gwGdmdNHfVIPoO0fp76JR0Z2u', '$2b$12$ZoIxGeb3Cc21cQgAz211wu', 'B10917013', 'copper', '哈哈可憐學生', NULL),
	('0699df65-a1e9-11ee-a139-0242ac140002', 'tooruche520', '$2b$12$pVbAu6U9MLsvILOh970tPORGoeUdLR.cxEPlNEGGlikt7McMAkDgS', '$2b$12$pVbAu6U9MLsvILOh970tPO', 'Tooruche0520', 'diamond', 'This is my account. HIHI u', 'https://pbs.twimg.com/profile_images/1738905616108908544/2t1Z1AAm_400x400.jpg'),
	('63587741-a260-11ee-8d92-0242ac140002', 'hanchi_photato', '$2b$12$fYxsbGOi4yCjPIN0OlecOeb1n04Hx5mfFDtwaS/cOhLUfBw56LCOq', '$2b$12$fYxsbGOi4yCjPIN0OlecOe', 'Hanchi', 'copper', '我是憨吉，我是一顆番薯', 'https://yt3.googleusercontent.com/M8n9pCuCYMbWFENasXrUdD8TbtXVfyyyGowvrHF4982kDFq1MYepg3BokwfMjzyePDe1_amu=s176-c-k-c0x00ffffff-no-rj');

-- 傾印  資料表 MovieRentalDB.Movies 結構
CREATE TABLE IF NOT EXISTS `Movies` (
  `MovieID` char(50) NOT NULL DEFAULT uuid(),
  `Title` varchar(255) NOT NULL,
  `Genre` varchar(50) DEFAULT NULL,
  `Actor` varchar(100) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `RentalPrice` int(5) DEFAULT NULL,
  `CoverUrl` varchar(200) DEFAULT NULL,
  `Discription` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MovieID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在傾印表格  MovieRentalDB.Movies 的資料：~6 rows (近似值)
INSERT IGNORE INTO `Movies` (`MovieID`, `Title`, `Genre`, `Actor`, `ReleaseDate`, `RentalPrice`, `CoverUrl`, `Discription`) VALUES
	('1ee80e5c-aa55-11ee-b781-0242ac140002', 'A.I.創世者', '科幻動作驚悚', '蓋瑞斯·愛德華', '2023-09-29', 500, 'https://upload.wikimedia.org/wikipedia/zh/8/8e/The_Creator_2023_Poster.jpg', '劇情敘述一位驍勇善戰的士兵，殷切期盼與因戰亂而分離已久的失蹤妻子團圓，並展開潛入A.I.陣地的致命任務，以摧毀勢在殲滅人類並終結戰爭的「A.I.創世者」！'),
	('36105f5c-a297-11ee-a660-0242ac140002', '水行俠 失落王國', '超級英雄', '溫子仁', '2023-12-22', 330, 'https://upload.wikimedia.org/wikipedia/zh/d/d4/Aquaman_and_the_Lost_Kingdom_Poster.jpg', '先前未能打敗水行俠的黑蝠鱝不計代價只求徹底擊敗水行俠，而這次黑蝠鱝掌握能釋放古老邪惡力量的遠古神器黑色三叉戟，變得比以往更加強大。為了對抗黑蝠鱝，水行俠必須向弟弟歐姆求助，兩人成為意想不到的盟友；兄弟倆必須克服己見，以保衛王國和全世界免於毀滅。'),
	('377a5a3b-a297-11ee-a660-0242ac140002', '旺卡', '歌舞奇幻', '保羅·金', '2023-12-08', 190, 'https://upload.wikimedia.org/wikipedia/zh/1/15/Wonka_Poster.jpg', '《柏靈頓》電影系列的編導保羅金，聯手《哈利波特》製片大衛海曼，合力打造出《旺卡》。\r\n\r\n融合令人陶醉的魔法與音樂、混亂與情感，並以動人的真情和幽默的方式述說，呈現吸引人、生動又富創造力的大銀幕奇觀。'),
	('41ec0958-ae04-11ee-8e82-0242ac140002', '樹懶殺三小', '喜劇', '馬修古德休', '2023-08-30', 500, 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSD10qT3_ImVDP9KXoirWDDO08noYLToa4i6sVL-sLgCAm1IMNA', '你從未見過的可愛嗜血狂魔，史上最Kuso的慢半拍殺手。就是你想的那樣荒謬到非進戲院不可，爛番茄權威網站影評指數見紅，觀眾爆米花指數高分狂推。'),
	('be2b8789-ab09-11ee-b3b7-0242ac140002', '壞蛋聯盟', '搶劫喜劇', '皮埃爾·佩里費爾', '2022-03-18', 499, 'https://upload.wikimedia.org/wikipedia/zh/0/00/The_Bad_Guys_poster.jpg', '一群動物犯罪高手組成的壞蛋聯盟，企圖設計一場到目前為止最具挑戰性的大騙局－成為模範公民。'),
	('ffc881b8-aa58-11ee-b781-0242ac140002', '星願', '動畫奇幻歌舞', '克里斯·巴克', '2023-11-08', 500, 'https://upload.wikimedia.org/wikipedia/zh/5/53/Wish_2023_Poster.jpg', '《星願》是一部2023年美國動畫奇幻歌舞片，講述17歲的少女艾霞在羅莎王國向著一顆星星許願，因而展開了冒險。');

-- 傾印  資料表 MovieRentalDB.Rentals 結構
CREATE TABLE IF NOT EXISTS `Rentals` (
  `RentalID` char(50) NOT NULL DEFAULT uuid(),
  `CustomerID` char(50) NOT NULL,
  `MovieID` char(50) NOT NULL,
  `RentalDate` date NOT NULL,
  `ReturnDate` date NOT NULL,
  `RentalStatus` char(15) NOT NULL,
  PRIMARY KEY (`RentalID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `FK_Rentals_Movies` (`MovieID`),
  CONSTRAINT `FK_Rentals_Movies` FOREIGN KEY (`MovieID`) REFERENCES `Movies` (`MovieID`),
  CONSTRAINT `Rentals_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customers` (`CustomerID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 正在傾印表格  MovieRentalDB.Rentals 的資料：~7 rows (近似值)
INSERT IGNORE INTO `Rentals` (`RentalID`, `CustomerID`, `MovieID`, `RentalDate`, `ReturnDate`, `RentalStatus`) VALUES
	('22c63ce1-aee6-11ee-a4cd-0242ac120002', '63587741-a260-11ee-8d92-0242ac140002', 'be2b8789-ab09-11ee-b3b7-0242ac140002', '2024-01-10', '2024-01-17', 'Borrowing'),
	('2f808663-aa03-11ee-b781-0242ac140002', '0699df65-a1e9-11ee-a139-0242ac140002', '36105f5c-a297-11ee-a660-0242ac140002', '2024-02-03', '2024-03-10', 'Canceled'),
	('5173c742-aec7-11ee-a4cd-0242ac120002', '0699df65-a1e9-11ee-a139-0242ac140002', '1ee80e5c-aa55-11ee-b781-0242ac140002', '2024-01-10', '2024-01-10', 'Canceled'),
	('c580bf67-aa04-11ee-b781-0242ac140002', '0699df65-a1e9-11ee-a139-0242ac140002', '377a5a3b-a297-11ee-a660-0242ac140002', '2023-11-03', '2025-03-15', 'Borrowing'),
	('c6e1d24d-aee5-11ee-a4cd-0242ac120002', '0699df65-a1e9-11ee-a139-0242ac140002', '1ee80e5c-aa55-11ee-b781-0242ac140002', '2024-01-10', '2024-01-17', 'Borrowing'),
	('ed76ec13-aa02-11ee-b781-0242ac140002', '63587741-a260-11ee-8d92-0242ac140002', '36105f5c-a297-11ee-a660-0242ac140002', '2024-01-03', '2024-01-03', 'Borrowing'),
	('f43fa09b-aec6-11ee-a4cd-0242ac120002', '0699df65-a1e9-11ee-a139-0242ac140002', '1ee80e5c-aa55-11ee-b781-0242ac140002', '2024-01-10', '2024-01-17', 'Canceled');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
