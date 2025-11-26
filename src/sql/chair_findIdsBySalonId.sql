SELECT c.id AS id
FROM chairs AS c
INNER JOIN salons AS s ON c.salonId = s.id
WHERE s.id = ?