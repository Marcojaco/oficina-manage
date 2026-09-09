-- ==========================================================
-- OFICINE MANAGE — Migrations
-- ==========================================================
-- Rodar cada bloco manualmente, em ordem, em qualquer ambiente
-- novo (dev, produção, máquina de outro mecânico testando).
--
-- Este arquivo é HISTÓRICO. Não apagar migrations antigas
-- depois de aplicadas — só adicionar novas embaixo.
-- ==========================================================


-- ----------------------------------------------------------
-- 001 - Estrutura inicial (referência - já aplicada)
-- ----------------------------------------------------------
-- Tabelas usuarios, clientes e carros já existem em produção.
-- Criação original não documentada aqui por já estar aplicada
-- antes da adoção deste arquivo de controle.


-- ----------------------------------------------------------
-- 002 - Soft delete em clientes
-- Data: 2026-09-08
-- Motivo: DELETE /clientes/:id passou a ser soft delete
--         para preservar histórico e evitar registros órfãos
--         em carros.cliente_id (sem FK ainda implementada).
-- ----------------------------------------------------------
ALTER TABLE clientes
ADD COLUMN ativo TINYINT(1) NOT NULL DEFAULT 1;

-- ----------------------------------------------------------
-- 003 - Soft delete em carros
-- Data: 2026-09-08
-- Motivo: módulo de veículos implementado com o mesmo padrão
--         de soft delete usado em clientes.
-- ----------------------------------------------------------
ALTER TABLE carros
ADD COLUMN ativo TINYINT(1) NOT NULL DEFAULT 1;