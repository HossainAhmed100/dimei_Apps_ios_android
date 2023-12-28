import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FirebaseConfig";


export const uplaodPdfFirebase = (pdfUriBlob, pdfName , isPdfUploadCompleted) => {
    if (!pdfUriBlob) return;
    const sotrageRef = ref(storage, `ownerShipTransferInvoice/${pdfName}`);
    const uploadTask = uploadBytesResumable(sotrageRef, pdfUriBlob);

    uploadTask.on(
        "state_changed", null ,
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                isPdfUploadCompleted(true)
                return downloadURL
            });

        }
    );

}