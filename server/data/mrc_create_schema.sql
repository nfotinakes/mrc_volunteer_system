-- Use this to create the database for MRC Volunteer System

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mrc_volunteer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mrc_volunteer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mrc_volunteer` DEFAULT CHARACTER SET utf8 ;
USE `mrc_volunteer` ;

-- -----------------------------------------------------
-- Table `mrc_volunteer`.`volunteer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mrc_volunteer`.`volunteer` (
  `volunteer_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NULL,
  `status` INT NULL,
  `input_date` DATETIME NULL,
  `licensure` VARCHAR(45) NULL,
  `license_num` VARCHAR(45) NULL,
  `license_exp` DATETIME NULL,
  PRIMARY KEY (`volunteer_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mrc_volunteer`.`site`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mrc_volunteer`.`site` (
  `site_id` INT NOT NULL AUTO_INCREMENT,
  `site_name` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  `address` VARCHAR(100) NULL,
  `note` VARCHAR(45) NULL,
  PRIMARY KEY (`site_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mrc_volunteer`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mrc_volunteer`.`log` (
  `log_id` INT NOT NULL AUTO_INCREMENT,
  `volunteer_id` INT NOT NULL,
  `site_id` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `hours` INT NOT NULL,
  `role` VARCHAR(45) NULL,
  `note` VARCHAR(45) NULL,
  INDEX `fk_volunteer_has_site_site1_idx` (`site_id` ASC) VISIBLE,
  INDEX `fk_volunteer_has_site_volunteer_idx` (`volunteer_id` ASC) VISIBLE,
  PRIMARY KEY (`log_id`),
  CONSTRAINT `fk_volunteer_has_site_volunteer`
    FOREIGN KEY (`volunteer_id`)
    REFERENCES `mrc_volunteer`.`volunteer` (`volunteer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_volunteer_has_site_site1`
    FOREIGN KEY (`site_id`)
    REFERENCES `mrc_volunteer`.`site` (`site_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mrc_volunteer`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mrc_volunteer`.`event` (
  `id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `start` VARCHAR(255) NULL,
  `end` VARCHAR(255) NULL,
  `note` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
