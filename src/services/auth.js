
import { auth, db, serverTimestamp } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

async function ensureUsuarioDoc(user) {
  const ref = doc(db, "usuarios", user.uid);
  // eslint-disable-next-line no-unused-vars
  const snap = await getDoc(ref);
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

export async function register({ email, password, nombre }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (nombre) await updateProfile(user, { displayName: nombre });
  await ensureUsuarioDoc(user);
  return user;
}

export async function login(email, password) {
  // Mejor no loguear la contraseña. Si quieres dejar el log, muestra solo el email:
  console.log("Datos del login (email):", email);
  if (!email || !password) throw new Error("Email y contraseña requeridos");
  return signInWithEmailAndPassword(auth, email, password);
}


export function logout() {
  return signOut(auth);
}

export function watchAuth(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return callback(null);
    const perfil = await ensureUsuarioDoc(user);
    callback({ uid: user.uid, ...perfil });
  });
}
