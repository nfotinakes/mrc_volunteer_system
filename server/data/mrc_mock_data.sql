INSERT INTO `mrc_volunteer`.`volunteer` (`first_name`, `last_name`, `email`, `phone`, `zipcode`, `status`, `input_date`, `licensure`, `license_num`, `license_exp`)
VALUES 
('Tom', 'Jones', 'tjones@gmail.com', '(805) 555-9645', '93465', '1', '2022-01-17', 'MD', 'MD6745', '2025-08-15'),
('Susan', 'Phillips', 'sphillips@gmail.com', '(805) 555-4522', '93401', '1', '2022-10-15', 'RN', 'RN7445', '2024-01-01'),
('Brendan', 'Murphy', 'bmurphy@gmail.com', '(805) 555-5225', '93465', '1', '2022-01-15', 'DO', 'DO8554', '2028-01-18'),
('George', 'Logan', 'glogan@gmail.com', '(805) 555-1244', '93442', '1', '2022-07-10', 'EMT', 'E59945', '2026-05-28'),
('Lea', 'Dunn', 'leadunn@gmail.com', '(805) 555-6671', '93446', '0', '2022-11-15', 'NP', 'NP8821', '2027-11-05'),
('Amy', 'Dawson', 'adawson45@gmail.com', '(805) 555-7736', '93422', '1', '2023-02-04', 'LBN', 'L14653', '2029-03-12'),
('Molly', 'Olson', 'mololson@gmail.com', '(805) 555-6623', '93401', '1', '2022-03-12', 'CNA', 'CN3225', '2027-12-20'),
('Lester', 'Sharp', 'lsharp@gmail.com', '(805) 555-4733', '93401', '1', '2022-06-10', 'PharmD', 'P88546', '2030-01-01'),
('Daniel', 'Vasquez', 'danvasquez@gmail.com', '(805) 555-8898', '93446', '1', '2023-05-10', 'DO', 'DO8554', '2028-01-18'),
('Maya', 'Howard', 'mhoward@gmail.com', '(805) 555-8635', '93428', '0', '2022-08-22', 'PA', 'PA', '2030-07-10'),
('Eddie', 'Curry', 'edcurry@gmail.com', '(805) 555-1189', '93401', '1', '2022-01-12', 'MD', 'MD7741', '2028-04-15'),
('Milan', 'Paul', 'mpaul88@gmail.com', '(805) 555-4545', '93465', '1', '2023-06-19', 'EMT-P', 'EP6636', '2029-08-02'),
('Patrick', 'Gilbert', 'patgilbert@yahoo.com', '(805) 555-6252', '93420', '1', '2023-02-03', 'PS', 'PS9665', '2029-10-15'),
('Eryn', 'Miller', 'erynmill33@gmail.com', '(805) 555-3365', '93401', '1', '2022-06-06', 'MD', 'MD3533', '2025-05-22'),
('Heidi', 'Chase', 'hchase@yahoo.com', '(805) 555-1124', '93422', '1', '2022-09-03', 'CNA', 'CN8554', '2026-11-14'),
('Simon', 'Todd', 'stodd78@gmail.com', '(805) 555-6474', '93401', '1', '2022-02-16', 'PharmD', 'P63112', '2030-02-05'),
('Anna', 'Young', 'ayoung@outlook.com', '(805) 555-5001', '93408', '1', '2022-10-10', 'DN', 'DN2277', '2025-10-15'),
('Cecilia', 'Hoover', 'cecehoover@yahoo.com', '(805) 555-3661', '93401', '1', '2022-01-15', 'RN', 'RN1022', '2026-07-28'),
('Stuart', 'Ross', 'sross112@gmail.com', '(805) 555-1024', '93465', '1', '2022-09-12', 'EMT', 'E71102', '2030-04-12'),
('Chris', 'Smith', 'csmith_09@gmail.com', '(805) 555-8541', '93422', '0', '2022-01-01', 'PS', 'PS6601', '2024-01-01'),
('Lewis', 'Armstrong', 'lewarmstrong@outlook.com', '(805) 555-1065', '93401', '1', '2022-09-15', 'MD', 'MD1044', '2029-08-25'),
('Robert', 'Holmes', 'robholmes@gmail.com', '(805) 555-4001', '93465', '1', '2023-02-15', 'DVM', 'DV20401', '2029-10-20'),
('Adriana', 'Cook', 'adrianacook@yahoo.com', '(805) 555-6704', '93403', '0', '2022-02-15', 'RN', 'RN34442', '2024-01-15'),
('Carl', 'Chandler', 'chandler29@gmail.com', '(805) 555-7046', '93401', '1', '2022-03-30', 'MD', 'MD30225', '2026-10-11'),
('Nicole', 'Richmond', 'nicrichond@outlook.com', '(805) 555-9941', '93422', '1', '2022-08-30', 'PA', 'PA635501', '2029-05-19');


INSERT INTO `mrc_volunteer`.`site` (`site_name`, `city`, `zipcode`, `address`, `note`) 
VALUES 
('Generic', '', '', '', ''),
('SLO Veterans Hall', 'San Luis Obispo', '93401', '52 Main St', ''),
('Paso Robles Fairgrounds', 'Paso Robles', '93446', '3465 South St', ''),
('Cal Poly Rec Center', 'San Luis Obispo', '93401', '88 Birch Rd', ''),
('AG Rec Center', 'Arroyo Grande', '93421', '9877 1st St', 'No Security'),
('Pavillion', 'Atascadero', '93422', '133 Cypress Ln', 'Key needed for bathrooms'),
('Templeton High School', 'Templeton', '93465', '66 Windy Rd', 'Need Passes'),
('Ludwick Community Center', 'San Luis Obispo', '93401', '9865 South Palmer St', ''),
('Morro Bay Recreation & Parks', 'Morro Bay', '93442', '22 Nebraska Ave', 'Limited Parking'),
('Nipomo Community Center', 'Nipomo', '93444', '78 Wild Horse Ln', '');

INSERT INTO `mrc_volunteer`.`log` (`volunteer_id`, `site_id`, `date`, `hours`, `role`, `note`) 
VALUES 
('7', '2', '2023-02-17', '4', 'Swabber', ''),
('3', '7', '2023-04-15', '6', 'Site Lead', ''),
('11', '3', '2023-02-01', '8', 'Admin', ''),
('15', '5', '2023-06-01', '6', 'Assistant', ''),
('18', '8', '2023-01-20', '4', 'Med Eval', ''),
('7', '2', '2023-02-18', '6', 'Swabber', ''),
('11', '3', '2023-02-17', '4', 'Site Lead', ''),
('4', '1', '2023-05-10', '6', 'Greeter', ''),
('6', '6', '2023-07-01', '8', 'Observation', ''),
('7', '2', '2023-02-19', '4', 'Swabber', ''),
('7', '2', '2023-02-20', '6', 'Swabber', ''),
('11', '3', '2023-04-01', '8', 'Admin', ''),
('3', '7', '2023-04-17', '6', 'Site Lead', ''),
('7', '2', '2023-02-23', '6', 'Swabber', ''),
('16', '4', '2023-05-17', '4', 'Swabber', ''),
('8', '9', '2023-04-19', '4', 'Admin', ''),
('7', '2', '2023-02-24', '4', 'Swabber', '');

INSERT INTO `mrc_volunteer`.`event` (`id`, `title`, `start`, `end`, `note`)
VALUES
('Mission Plaza2023-08-16T10:00:00-07:00', 'Mission Plaza', '2023-08-16T10:00:00-07:00', '2023-08-T13:00:00-07:00', 'Need 3 admin, 2 security'),
('PR Fairground2023-08-22', 'PR Fairground', '2023-08-22', '2023-08-23', 'Need 10 volunteers - Swab and Admin'),
('SLO Parks & Rec2023-08-23', 'SLO Parks & Rec', '2023-08-23', '2023-08-24', 'Need 5 swabbers');





