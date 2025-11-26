SELECT wc.id              AS id

FROM  workplaceChairs     AS wc
INNER JOIN workplaces     AS wp           ON wc.workplaceId = wp.id

WHERE wp.id = ?