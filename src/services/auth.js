
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db, serverTimestamp } from "@/firebase";

/**
 * Garantiza que exista un documento básico de perfil para el usuario.
 * No pisa campos existentes críticos gracias a merge=true.
 * @param {import('firebase/auth').User} user
 * @returns {Promise<Record<string, any>>}
 */
async function ensureUsuarioDoc(user) {
  const ref = doc(db, "usuarios", user.uid);
  const base = {
    nombre: user.displayName || "",
    email: user.email || "",
    rol: "usuario",
    // si ya existía, no pisamos nada crítico gracias a merge
    creadoEn: serverTimestamp(),
  };
  await setDoc(ref, base, { merge: true });
  const finalSnap = await getDoc(ref);
  return finalSnap.data();
}

/**
 * Crea una cuenta de usuario mediante email y contraseña.
 * @param {{ email: string, password: string, nombre?: string }} params
 * @returns {Promise<import('firebase/auth').User>}
 */
export async function register({ email, password, nombre, tosVersion, tosAcceptedAt }) {
  if (!email || !password) throw new Error("Email y contraseña requeridos");
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (nombre) await updateProfile(user, { displayName: nombre });
  await ensureUsuarioDoc(user);
  // Guarda consentimiento de TOS si viene
  if (tosVersion || tosAcceptedAt) {
    const ref = doc(db, "usuarios", user.uid);
    await setDoc(
      ref,
      { tosVersion: tosVersion || "1.0", tosAcceptedAt: tosAcceptedAt || serverTimestamp() },
      { merge: true }
    );
  }
  // Enviar verificación de email
  try {
    await sendEmailVerification(user);
  } catch (e) {
    // Ignoramos el error de envío de email de verificación, el usuario puede reintentar luego
    void e;
  }
  return user;
}

/**
 * Inicia sesión con email y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function login(email, password) {
  if (!email || !password) throw new Error("Email y contraseña requeridos");
  return signInWithEmailAndPassword(auth, email, password);
}


/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>}
 */
export function logout() {
  return signOut(auth);
}

/**
 * Observa cambios de autenticación y entrega un perfil mínimo { uid, ...perfil } o null.
 * @param {(payload: {uid: string} & Record<string, any> | null) => void} callback
 * @returns {import('firebase/auth').Unsubscribe}
 */
export function watchAuth(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }
    const perfil = await ensureUsuarioDoc(user);
    callback({ uid: user.uid, emailVerified: !!user.emailVerified, ...perfil });
  });
}

/**
 * Reenvía el email de verificación al usuario actual.
 * @returns {Promise<void>}
 */
export async function resendVerification() {
  const current = auth.currentUser;
  if (!current) throw new Error("No hay usuario autenticado");
  await sendEmailVerification(current);
}
