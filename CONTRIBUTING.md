# Bidrag til Respona

Tak fordi du vil forbedre Respona.

## Kom godt i gang

1. Fork repoet og opret en gren fra `main`.
2. Hold hver pull request fokuseret på én ændring.
3. Kør `npm run check` fra projektroden før du åbner pull requesten.
4. Tilføj eller opdatér dokumentation, når en ændring påvirker opsætning eller
   adfærd.

## Sikkerhed og data

- Commit aldrig `.env`, `.dev.vars`, API-nøgler, adgangstokens eller private
  certifikater. Brug de eksisterende `.example`-filer som skabeloner.
- Brug kun syntetiske eller anonymiserede data i issues, pull requests og
  test-fixtures. Del aldrig telefonnumre, ordrer, kundeoplysninger eller
  opkaldsoptagelser.
- Rapportér sårbarheder privat efter [SECURITY.md](SECURITY.md) i stedet for i
  et offentligt issue.

## Kodeprincipper

Bevar tenant-isolation og RLS i databaseændringer. Voice-integrationen skal
fortsat kunne køre i stub-mode uden betalte nøgler.
