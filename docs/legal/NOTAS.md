# NOTAS LEGALES (ES)

Este documento resume los puntos implementados para cumplimiento orientativo con RGPD (UE 2016/679), LOPDGDD (Ley Orgánica 3/2018) y LSSI-CE (34/2002).

## Cobertura y medidas
- Registro con verificación de email (autenticación reforzada).
- Bloqueo de acceso a rutas protegidas hasta verificación.
- Páginas legales: Términos (`/terminos`), Privacidad (`/privacidad`), Cookies (`/cookies`).
- Consentimiento explícito en registro; guardado de `tosAcceptedAt` y `tosVersion` en `usuarios/{uid}`.
- Reglas de Firestore exigen `email_verified` para lectura/escritura en datos personales (`usuarios`, `resultados`).
- Banner de estado para cuentas no verificadas (UX accesible con aria-live).

## PLACEHOLDERS A RELLENAR
- Responsable: Nombre/Razón Social
- NIF
- Dirección completa
- Email de contacto (y DPO si aplica)
- Versión de documentos legales (ej. v1.0)

## Advertencia
Este contenido es informativo y debe revisarse por asesoría legal. No constituye asesoramiento jurídico.