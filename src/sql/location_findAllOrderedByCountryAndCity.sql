SELECT DISTINCT
  l.id                                AS        id                ,
  l.addressLineOne                    AS        addressLineOne    ,
  l.addressLineTwo                    AS        addressLineTwo    ,
  gc.id                               AS        geoCityId         ,
  l.postcode                          AS        postcode

FROM locations                        AS l
INNER JOIN geoCities                  AS gc     ON l.geoCityId = gc.id
INNER JOIN geoCountries               AS gn     ON gc.geoCountryId = gn.id

ORDER BY gn.threeLetterCode ASC, gc.name ASC