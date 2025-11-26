SELECT a.*
FROM appointments AS a
INNER JOIN appointmentLeads AS al ON a.id = al.appointmentId
WHERE a.bookingId = ? AND al.staffId = ?
LIMIT 1