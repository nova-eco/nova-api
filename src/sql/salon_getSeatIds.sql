SELECT c.id AS id
FROM seats AS c
INNER JOIN chairs AS ch ON c.id = ch.seatId
INNER JOIN salons AS s ON ch.salonId = s.id
WHERE s.id = ?
