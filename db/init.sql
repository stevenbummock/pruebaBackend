-- create database if not exists
DO $$BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database
        WHERE datname = 'animales'
    ) THEN
        CREATE DATABASE animales;
    END IF;
END$$;
