import { db, serverTimestamp } from "@/firebase";
import {
  collection, doc, getDocs, addDoc, query, where, orderBy, getDoc
} from "firebase/firestore";

export async function listarAutoevaluaciones() {
  const snap = await getDocs(collection(db, "autoevaluaciones"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function obtenerAutoevaluacion(slug) {
  const snap = await getDoc(doc(db, "autoevaluaciones", slug));
  return { id: slug, ...snap.data() };
}

export async function guardarResultado({ usuarioId, autoevaluacionSlug, respuestas, puntuacion }) {
  return addDoc(collection(db, "resultados"), {
    usuarioId, autoevaluacionSlug, respuestas, puntuacion, creadoEn: serverTimestamp(),
  });
}

export async function listarResultadosPorUsuario(usuarioId) {
  const q = query(
    collection(db, "resultados"),
    where("usuarioId", "==", usuarioId),
    orderBy("creadoEn", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function obtenerResultadoPorId(id) {
  const ref = doc(db, "resultados", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function guardarMensajeContacto({ nombre, email, motivo, mensaje }) {
  return addDoc(collection(db, 'contacto'), {
    nombre,
    email,
    motivo,
    mensaje,
    creadoEn: serverTimestamp(),
  });
}

// Requiere configurar la extensión Firebase: Trigger Email
// - Configura el remitente (from) como 4tucode@gmail.com en la extensión
// - Opcional: proveedor Gmail/SMTP o SendGrid
export async function enviarCorreoContacto({ nombre, email, motivo, mensaje }) {
  const subject = `[MiAutoZen] Nuevo mensaje de contacto · ${motivo || 'Consulta'}`;
  const appOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const logoUrl = appOrigin ? `${appOrigin}/fav.svg` : 'https://dummyimage.com/64x64/7c3aed/ffffff.png&text=MZ';
  const brandName = 'MiAutoZen';

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; background:#f8fafc; padding:24px; color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="vertical-align:middle;">
                <img src="${logoUrl}" alt="${brandName}" width="40" height="40" style="border-radius:8px;display:inline-block;vertical-align:middle;border:1px solid #e5e7eb;"/>
                <span style="display:inline-block;margin-left:10px;font-weight:700;color:#111827;font-size:16px;vertical-align:middle;">${brandName}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px 6px 24px;">
          <h1 style="margin:0 0 8px 0;font-size:20px;line-height:28px;color:#111827;">Nuevo mensaje de contacto</h1>
          <p style="margin:0;color:#6b7280;font-size:14px;">Has recibido un mensaje desde el formulario de contacto de <strong>${brandName}</strong>.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 24px;">
          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px;">
            <p style="margin:0 0 6px 0;font-weight:600;color:#111827;">Nombre</p>
            <p style="margin:0 0 12px 0;color:#374151;">${nombre || '(sin nombre)'}</p>
            <p style="margin:0 0 6px 0;font-weight:600;color:#111827;">Correo</p>
            <p style="margin:0 0 12px 0;color:#374151;">${email || '(sin correo)'}</p>
            <p style="margin:0 0 6px 0;font-weight:600;color:#111827;">Motivo</p>
            <p style="margin:0 0 12px 0;color:#374151;">${motivo || 'Consulta'}</p>
            <p style="margin:0 0 6px 0;font-weight:600;color:#111827;">Mensaje</p>
            <p style="margin:0;color:#374151;white-space:pre-wrap;">${(mensaje || '').replace(/</g,'&lt;')}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 24px 24px 24px;color:#9ca3af;font-size:12px;">Puedes responder directamente a este correo para contactar con la persona.</td>
      </tr>
    </table>
  </div>`;
  const text = `[MiAutoZen] Nuevo mensaje de contacto\n\nNombre: ${nombre}\nCorreo: ${email}\nMotivo: ${motivo}\n\nMensaje:\n${mensaje}`;

  // La extensión usará el remitente configurado (from = 4tucode@gmail.com)
  // Aquí definimos el destinatario principal
  const mailDoc = {
    to: ['4tucode@gmail.com'],
    replyTo: email,
    message: { subject, html, text },
  };

  return addDoc(collection(db, 'mail'), mailDoc);
}