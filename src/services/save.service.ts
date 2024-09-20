import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@configs/firebase.config";
import { ISaveItem } from "@/interfaces/save.interface";

class SaveService {
  async fetchSaves(uid: string) {
    try {
      const q = query(collection(db, "saves"), where("uid", "==", uid));
      const saveDocs = await getDocs(q);
      const saves = saveDocs.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      return saves;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  }

  async saveItem(data: ISaveItem) {
    try {
      const response = await addDoc(collection(db, "saves"), data);
      return response;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  }

  async unSaveItem(docId: string) {
    try {
      await deleteDoc(doc(db, "saves", docId));
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  }
}

export const saveService = new SaveService();
export default saveService;
