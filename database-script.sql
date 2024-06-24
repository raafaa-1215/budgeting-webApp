-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24-Jun-2024 às 11:10
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projeto_pw`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `budgeting`
--

CREATE TABLE `budgeting` (
  `id` int(11) NOT NULL,
  `liquidIncomeId` int(11) NOT NULL,
  `expenseId` int(11) NOT NULL,
  `amountLeft` decimal(10,2) NOT NULL,
  `dateAdded` varchar(10) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `budgeting`
--

INSERT INTO `budgeting` (`id`, `liquidIncomeId`, `expenseId`, `amountLeft`, `dateAdded`, `userId`) VALUES
(1, 2, 1, 713.00, '2024-06-23', 1),
(2, 3, 2, 857.00, '2024-06-24', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(25) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentDay` varchar(25) NOT NULL,
  `dateAdded` varchar(10) NOT NULL,
  `lastEditDate` varchar(10) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `expenses`
--

INSERT INTO `expenses` (`id`, `name`, `description`, `type`, `amount`, `paymentDay`, `dateAdded`, `lastEditDate`, `userId`) VALUES
(1, 'Renda casa', 'renda da casa em corroios', 'Rent', 800.00, 'Biweekly', '2024-06-23', '2024-06-24', 1),
(2, 'gas luz e agua', 'para a casa a arrendar', 'Utilities', 300.00, 'Last day of the month', '2024-06-24', '2024-06-24', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `income_strings`
--

CREATE TABLE `income_strings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(25) NOT NULL,
  `source` varchar(150) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payday` varchar(25) NOT NULL,
  `dateAdded` varchar(10) NOT NULL,
  `lastEditDate` varchar(10) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `income_strings`
--

INSERT INTO `income_strings` (`id`, `name`, `description`, `type`, `source`, `amount`, `payday`, `dateAdded`, `lastEditDate`, `userId`) VALUES
(12, 'dropshiping relogios', 'loja online dropsiping', 'Portfolio income', 'dropshiping relogios', 300.00, 'Biweekly', '2024-06-23', '2024-06-24', 1),
(13, 'salario ips', 'trabalhar no ips 40 horas por semana', 'Active income', 'salario ips', 1700.00, 'Last day of the month', '2024-06-23', '2024-06-23', 1),
(14, 'Arrendamento de cubico', 'arrendar casa em almada a pessoas', 'Passive income', 'morador do tchubi', 1300.00, 'Last day of the month', '2024-06-24', '2024-06-24', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `liquid_incomes`
--

CREATE TABLE `liquid_incomes` (
  `id` int(11) NOT NULL,
  `incomeId` int(11) NOT NULL,
  `taxId` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `dateAdded` varchar(10) NOT NULL,
  `lastEditDate` varchar(10) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `liquid_incomes`
--

INSERT INTO `liquid_incomes` (`id`, `incomeId`, `taxId`, `amount`, `dateAdded`, `lastEditDate`, `userId`) VALUES
(1, 12, 1, 267.00, '2024-06-23', '2024-06-23', 1),
(2, 13, 1, 1513.00, '2024-06-23', '2024-06-23', 1),
(3, 14, 1, 1157.00, '2024-06-24', '2024-06-24', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `taxes`
--

CREATE TABLE `taxes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `percentage` decimal(10,2) NOT NULL,
  `method` varchar(10) NOT NULL,
  `dateAdded` varchar(10) NOT NULL,
  `lastEditDate` varchar(10) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `taxes`
--

INSERT INTO `taxes` (`id`, `name`, `description`, `percentage`, `method`, `dateAdded`, `lastEditDate`, `userId`) VALUES
(1, 'IVA', 'venda de produtos', 11.00, 'Stacking', '2024-06-23', '2024-06-23', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `joinDate` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `joinDate`) VALUES
(1, 'rafa', 'rafatrabalhos.10@gmail.com', '123', '2024-06-21'),
(5, 'bruna', 'bruna@gmail.com', '123', '2024-06-22'),
(9, 'ruben', 'ruben@gmail.com', '123', '2024-06-23'),
(11, 'luis', 'luis@gmail.com', '123', '2024-06-24');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `budgeting`
--
ALTER TABLE `budgeting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `budgeting_ibfk_1` (`userId`),
  ADD KEY `budgeting_ibfk_2` (`liquidIncomeId`),
  ADD KEY `budgeting_ibfk_3` (`expenseId`);

--
-- Índices para tabela `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_ibfk_1` (`userId`);

--
-- Índices para tabela `income_strings`
--
ALTER TABLE `income_strings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `income_strings_ibfk_1` (`userId`);

--
-- Índices para tabela `liquid_incomes`
--
ALTER TABLE `liquid_incomes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liquid_incomes_ibfk_1` (`userId`),
  ADD KEY `liquid_incomes_ibfk_2` (`incomeId`),
  ADD KEY `liquid_incomes_ibfk_3` (`taxId`);

--
-- Índices para tabela `taxes`
--
ALTER TABLE `taxes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taxes_ibfk_1` (`userId`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `budgeting`
--
ALTER TABLE `budgeting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `income_strings`
--
ALTER TABLE `income_strings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `liquid_incomes`
--
ALTER TABLE `liquid_incomes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `taxes`
--
ALTER TABLE `taxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `budgeting`
--
ALTER TABLE `budgeting`
  ADD CONSTRAINT `budgeting_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `budgeting_ibfk_2` FOREIGN KEY (`liquidIncomeId`) REFERENCES `liquid_incomes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `budgeting_ibfk_3` FOREIGN KEY (`expenseId`) REFERENCES `expenses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `income_strings`
--
ALTER TABLE `income_strings`
  ADD CONSTRAINT `income_strings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `liquid_incomes`
--
ALTER TABLE `liquid_incomes`
  ADD CONSTRAINT `liquid_incomes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liquid_incomes_ibfk_2` FOREIGN KEY (`incomeId`) REFERENCES `income_strings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liquid_incomes_ibfk_3` FOREIGN KEY (`taxId`) REFERENCES `taxes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `taxes`
--
ALTER TABLE `taxes`
  ADD CONSTRAINT `taxes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
