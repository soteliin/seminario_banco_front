CREATE SCHEMA IF NOT EXISTS segundop;

CREATE TABLE
    segundop.tc_tipo_prestamo (
        id_tipo_prestamo SERIAL PRIMARY KEY,
        tipo_prestamo VARCHAR(50) NOT NULL
    );

INSERT INTO
    segundop.tc_tipo_prestamo (tipo_prestamo)
VALUES
    ('Préstamo basado en sueldo'),
    ('Préstamo por monto fijo de la casa');

CREATE TABLE
    segundop.tc_amortizacion (
        id_amortizacion SERIAL PRIMARY KEY,
        prestamista VARCHAR(15) NOT NULL,
        tasa_interes DECIMAL(4, 2) NOT NULL CHECK (tasa_interes >= 0),
        enganche DECIMAL(4, 2) NOT NULL CHECK (enganche >= 0)
    );

INSERT INTO
    segundop.tc_amortizacion (prestamista, tasa_interes, enganche)
VALUES
    ('BBVA', 13.6, 17.5),
    ('HSBC', 12.8, 18.2),
    ('Infonavit', 9.0, 9.4);

CREATE TABLE
    segundop.tc_plazo (
        id_plazo SERIAL PRIMARY KEY,
        plazo INT NOT NULL,
        id_amortizacion INT NOT NULL,
        CONSTRAINT fk_amortizacion FOREIGN KEY (id_amortizacion) REFERENCES segundop.tc_amortizacion (id_amortizacion) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    segundop.tc_plazo (plazo, id_amortizacion)
VALUES
    (10, 1),
    (15, 1),
    (20, 1),
    (10, 2),
    (20, 2),
    (10, 3),
    (15, 3);

CREATE TABLE
    segundop.tr_cliente (
        id_cliente SERIAL,
        nombre_completo VARCHAR(100) NOT NULL,
        rfc VARCHAR(13) NOT NULL UNIQUE,
        edad INT NOT NULL CHECK (edad >= 18),
        fecha_alta DATE NOT NULL DEFAULT CURRENT_DATE,
        telefono VARCHAR(15) NOT NULL,
        correo VARCHAR(100) NOT NULL UNIQUE PRIMARY KEY,
        contrasena VARCHAR(20) NOT NULL,
        sueldo DECIMAL(15, 2) CHECK (sueldo >= 0)
    );

CREATE TABLE
    segundop.tr_cotizacion_sueldo (
        id_prestamo_sueldo SERIAL PRIMARY KEY,
        monto_prestamo DECIMAL(15, 3) NOT NULL CHECK (monto_prestamo >= 0),
        id_tipo_prestamo INT NOT NULL,
        id_amortizacion INT NOT NULL,
        correo_cliente VARCHAR(100) NOT NULL,
        CONSTRAINT fk_tipo_prestamo FOREIGN KEY (id_tipo_prestamo) REFERENCES segundop.tc_tipo_prestamo (id_tipo_prestamo) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT fk_amortizacion FOREIGN KEY (id_amortizacion) REFERENCES segundop.tc_amortizacion (id_amortizacion) ON UPDATE CASCADE ON DELETE CASCADE,
        --CONSTRAINT chk_monto_prestamo CHECK (monto_prestamo < sueldo_cliente * 0.4),
        CONSTRAINT fk_cliente FOREIGN KEY (correo_cliente) REFERENCES segundop.tr_cliente (correo) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE segundop.tr_casa (
    id_casa SERIAL PRIMARY KEY,
    nombre_casa VARCHAR(50) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    costo DECIMAL(15, 2) NOT NULL CHECK (costo >= 0)
);

INSERT INTO segundop.tr_casa (nombre_casa, direccion, costo)
VALUES
('Casa en la Playa', '123 Calle Mar, Playa Azul, Quintana Roo', 25000000.00),
('Casa de Campo', '456 Camino Rural, Valle Verde, Jalisco', 18000000.00),
('Penthouse Urbano', '789 Avenida Central, Ciudad de México, CDMX', 35000000.00),
('Residencia Lujosa', '1010 Boulevard de las Estrellas, Monterrey, Nuevo León', 50000000.00),
('Casa Familiar', '1111 Calle Amistad, Puebla, Puebla', 15000000.00),
('Villa Colonial', '1212 Plaza Antigua, Mérida, Yucatán', 22000000.00),
('Cabaña en el Bosque', '1313 Sendero del Roble, Valle de Bravo, Estado de México', 17500000.00),
('Departamento Moderno', '1414 Avenida Reforma, Guadalajara, Jalisco', 20000000.00),
('Hacienda Tradicional', '1515 Camino Real, San Miguel de Allende, Guanajuato', 40000000.00),
('Loft en la Ciudad', '1616 Calle Independencia, Querétaro, Querétaro', 19000000.00);
