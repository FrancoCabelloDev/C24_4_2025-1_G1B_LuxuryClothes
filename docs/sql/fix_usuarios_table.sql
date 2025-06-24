RENAME TABLE usuarios TO user;

ALTER TABLE user
    ADD COLUMN celular VARCHAR(30) AFTER contraseña,
    ADD COLUMN direccion VARCHAR(255) AFTER celular,
    ADD COLUMN dni VARCHAR(30) AFTER direccion;
