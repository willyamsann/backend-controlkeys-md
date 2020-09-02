CREATE TABLE `tab_user` (
  `cod_usuario` int(10) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `empresa` varchar(100) DEFAULT NULL,
  `telefone` varchar(100) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `tipo_usuario` varchar(10) NOT NULL,
  `fcm_token` varchar(200) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `CPF` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`cod_usuario`),
  UNIQUE KEY `CPF` (`CPF`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1

CREATE TABLE `estoquegeral` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `FILIAL` varchar(2) DEFAULT NULL,
  `EMPREENDIMENTO` varchar(33) DEFAULT NULL,
  `TORRE` varchar(7) DEFAULT NULL,
  `TIPOLOGIA` varchar(11) DEFAULT NULL,
  `APTO` varchar(13) DEFAULT NULL,
  `ÁREA PRIV.` varchar(6) DEFAULT NULL,
  `TIPO` varchar(13) DEFAULT NULL,
  `STATUS` varchar(50) DEFAULT NULL,
  `DATA_VENDA` date DEFAULT NULL,
  `ultima_manutecao` int(11) DEFAULT NULL,
  `proxima_manutecao` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1203 DEFAULT CHARSET=utf8mb4

CREATE TABLE `chaves` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `CPF` varchar(30) DEFAULT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `telefone` varchar(80) DEFAULT NULL,
  `empresa` varchar(120) DEFAULT NULL,
  `empreendimento` varchar(120) DEFAULT NULL,
  `apartamento` varchar(120) DEFAULT NULL,
  `data` varchar(120) DEFAULT NULL,
  `data_vistoria` date DEFAULT NULL,
  `p1` varchar(80) DEFAULT NULL,
  `p2` varchar(120) DEFAULT NULL,
  `p3` varchar(120) DEFAULT NULL,
  `p4` varchar(120) DEFAULT NULL,
  `p5` varchar(120) DEFAULT NULL,
  `p6` varchar(120) DEFAULT NULL,
  `p7` varchar(120) DEFAULT NULL,
  `p8` varchar(120) DEFAULT NULL,
  `p9` varchar(120) DEFAULT NULL,
  `resposanvel_chave` varchar(100) DEFAULT NULL,
  `local` varchar(150) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `status` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=latin1